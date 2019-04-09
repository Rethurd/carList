import React, { Component } from 'react';
import '../styles/styles.scss';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import CarOffer from './CarOffer';
import Header from './Header';
import Content from './Content';
// when sorting jut invert instead of sorting everything so it's faster? - 
// not doing it because cant get sorted data from api

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

  //fetch has problems with CORS
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
    .catch((error)=>{
      console.log(error);
    })
  }


  fetchCarHotOffers = () =>{
    axios({
      method:'post',
      url:'https://stock.ssangyong.pl/api/getHotoffers/',
      // CORS
      // data:{
      //   model:'Tivoli,Korando',
      //   'sort[hot_price]': "asc"
      // }
    })
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
    }).catch((error)=>{
      console.log(error);
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
      selectedCarModels = selectedCarModels.filter((model)=>(model!==e.target.value))
    }else{
      selectedCarModels.push(e.target.value);
    }
    this.setState(()=>({selectedCarModels}));
  }
  render() {
    let offers = [];
    let models = [];
    if(this.state.loading===false){
      offers = this.state.selectedCarOffers.map((offer)=>{
        //check if model checked and create components
        if(this.state.selectedCarModels.length===0){
          return <CarOffer key={offer.id} offer={offer}/>
        }else if(this.state.selectedCarModels.includes(offer.params.model)){
          return <CarOffer key={offer.id} offer={offer}/>
        }
        return null;
      });
      models = this.state.carModels.map((model)=>
        <Form.Check 
          key={model}
          label={model}
          value={model}
          onChange={this.handleChangeFilteredModels}
          className="models__single-model"
        />)

    }
    
    return (
      this.state.loading ? 
      <div>Loading...</div> :
     <div>
      <Header 
        sortCarsByPrice={this.state.sortCarsByPrice}
        handleChangeSortToAscending={this.handleChangeSortToAscending}
        handleChangeSortToDescending={this.handleChangeSortToDescending}
        />
      <Content 
        models={models}
        offers={offers}
      />
     </div> 
    );
  }
}

export default App;
