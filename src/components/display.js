import React, { Component } from 'react'
import Content from './content.js'

 class display extends Component {
     state ={
         
         ifsc:[],
         bank_id:[],
         branch:[],
         address:[],
         city:[],
         district:[],
         state:[],
         bank_name:[]

         

}
 State2=this.state;


handle= async (e) => {
    e.preventDefault();
    let citySearch= e.target.value;
    

    const api_call = await fetch (`https://vast-shore-74260.herokuapp.com/banks?city=${citySearch}`);
    const data_json=await api_call.json();
   // console.log(this.state.ifsc[3]);
    
    this.setState(this.State2);

     if (data_json.length===0)
     {
         return <h1>No Data Found, Check Your Research</h1>
     }
     else 
     {
         let i;
        for (i=0; i < data_json.length; i++)
        {

         this.setState({
            
           
             ifsc:[...this.state.ifsc, data_json[i].ifsc],
             bank_id:[...this.state.bank_id, data_json[i].bank_id],
             branch:[...this.state.branch, data_json[i].branch],
             address:[...this.state.address, data_json[i].address],
             city:[...this.state.city, data_json[i].city],
             district:[...this.state.district, data_json[i].district],
             state:[...this.state.state, data_json[i].state],
             bank_name:[...this.state.bank_name, data_json[i].bank_name]
            })

    }
    console.log(this.state);

}



}
submit=(e) => {
    e.preventDefault();
}

    render() {
        let ifsc= this.state.ifsc.map((value, index)=> {
          return (
              <Content ifsc={value} index={index}/>
          )
            })
        

        let bank_id= this.state.bank_id.map((value, index)=> {
          return (
              <Content bank_id={value} index={index}/>
          )
            })
        

         let bank_name= this.state.bank_name.map((value, index)=> {
           return <Content bank_name={value} index={index}/>
         })
         
         let state= this.state.state.map((value, index)=> {
           return <Content state={value} index={index}/>
         })
         

         let district= this.state.district.map((value, index)=> {
            return <Content district={value} index={index}/>
         })
         

         let address= this.state.address.map((value, index)=> {
           return <Content address={value} index={index}/>
         })
         

         let branch = this.state.branch.map((value, index)=> {
            return <Content branch={value} index={index}/>
         })
         
         let city =this.state.city.map((value, index)=> {
          return <Content city={value} index={index}/>
         })
         
        
        return (
            <React.Fragment>
            <div>
            <form onChange={this.handle} onSubmit={this.submit}>
            <div id="dimensions" className="form-group container mt-4"> 
            <input type="text" className="form-control btn-outline-warning" name="search" placeholder="Search"/>
            <small className="form-text text-muted">Type in for Search</small>
            </div>
            </form>
            </div>

<table className="container">
            <Content ifsc={ifsc}
            bank_id={bank_id}
            branch={branch}
            address={address}
            city={city}
            district={district}
            state={state}
            bank_name={bank_name}/>

            </table>

            </React.Fragment>
        )
    }
}

export default display;
