import React, { Component } from 'react';
import '../styles/styles.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      carModels:[]
    }
  }

  
  componentDidMount(){
    this.fetchCarModels();
  }
  fetchCarModels = () =>{
    fetch("https://stock.ssangyong.pl/api/getHotModels/")
    .then((res)=>res.json())
    .then((data)=>{
      const carModels=[];
      data.forEach(modelObject => {
        carModels.push(modelObject.model);
      });
      this.setState(()=>({carModels}));
    })
  }

  render() {
    return (
     <div >
      Test
     </div>
    );
  }
}

export default App;
