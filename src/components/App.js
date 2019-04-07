import React, { Component } from 'react';
import '../styles/styles.scss';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import CarOffer from './CarOffer';
// when sorting jut invert instead of sorting everything its faster
// if selectedCarModels empty, show all
// sortowanie: cena \/ i cena /\

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      carModels:[],
      carOffers:[],
      selectedCarModels:[],
      selectedCarOffers:[], 
      sortCarsByPrice:'desc',
      loading:true
    }
  }

  
  componentDidMount(){
    this.fetchCarHotModels();
   
  }
  //fetch has problems with Cross Origin Resource Sharing
  //using axios instead

  fetchCarHotModels = () =>{
    axios.get("https://stock.ssangyong.pl/api/getHotModels/")
    .then((res)=>res.data)
    .then((data)=>{
      const carModels=[];
      data.forEach(modelObject => {
        carModels.push(modelObject.model);
      });
      this.setState(()=>({carModels}),()=>{
        this.fetchCarHotOffers();
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }


  fetchCarHotOffers = () =>{
    axios.post("https://stock.ssangyong.pl/api/getHotoffers/")
    .then((res)=>res.data)
    .then((offers)=>{
      const carOffers=[];
      for (let index = 0; index < offers.length; index++) {
        if(this.state.carModels.includes(offers[index].params.model)){
          carOffers.push(offers[index]);
        }
      }
      carOffers.sort(this.sortCarsDescending);
      this.setState(()=>({carOffers,selectedCarOffers:carOffers,loading:false}));
    })
    
  }
  sortCarsAscending = (a,b) => parseInt(a.params.price.hot_price.replace('&nbsp;',''))-parseInt(b.params.price.hot_price.replace('&nbsp;',''));
  sortCarsDescending = (a,b) => -(parseInt(a.params.price.hot_price.replace('&nbsp;',''))-parseInt(b.params.price.hot_price.replace('&nbsp;','')));
  handleChangeSortToAscending = () =>{
    const selectedCarOffers = this.state.selectedCarOffers.sort(this.sortCarsAscending);
    this.setState(()=>({selectedCarOffers,sortCarsByPrice:'asc'}));
  }
  handleChangeSortToDescending = () =>{
    const selectedCarOffers = this.state.selectedCarOffers.sort(this.sortCarsDescending);
    this.setState(()=>({selectedCarOffers,sortCarsByPrice:'desc'}));
  }
  handleChangeFilteredModels = (e)=>{
    let selectedCarModels = this.state.selectedCarModels;
    if(selectedCarModels.includes(e.target.value)){
      selectedCarModels = selectedCarModels.filter((model)=>(model!=e.target.value))
    }else{
      selectedCarModels.push(e.target.value);
    }
    this.setState(()=>({selectedCarModels}));
  }
  render() {
    let test=[];
    let models = [];
    if(this.state.loading===false){
      test = this.state.selectedCarOffers.map((offer)=>{
        //check if model checked and create components
        if(this.state.selectedCarModels.length==0){
          return <CarOffer offer={offer}/>
        }else if(this.state.selectedCarModels.includes(offer.params.model)){
          return <CarOffer offer={offer}/>
        }
      });
      models = this.state.carModels.map((model)=>
        <Form.Check 
          label={model}
          value={model}
          onChange={this.handleChangeFilteredModels}
        />)

    }
    
    return (
      this.state.loading ? 
      <div>Loading...</div> :
     <div>
      <div>
        <span>SORTUJ: </span>
        <span>
        <Dropdown className="sort-select">
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            {this.state.sortCarsByPrice==="asc" ? 
            <span>CENA <i class="fas fa-caret-up"></i></span> : 
            <span>CENA <i class="fas fa-caret-down"></i></span>}
          </Dropdown.Toggle>

          <Dropdown.Menu >
            <Dropdown.Item onClick={this.handleChangeSortToAscending} ><span>CENA <i class="fas fa-caret-up"></i></span></Dropdown.Item>
            <Dropdown.Item onClick={this.handleChangeSortToDescending} ><span>CENA <i class="fas fa-caret-down"></i></span></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>;
        </span>
      </div>
      <div>
      {models}
      </div>
      {test}
     </div>
      
    );
  }
}

export default App;
