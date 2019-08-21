import React, { Component } from 'react'
import LocalStorage from './localStorage'
import ls from 'local-storage'


  class content extends Component {
     state ={
        favBanks:[]
     }
    
componentDidMount() {
   this.setState({favBanks:ls.get('favBanks') || []})
}

   isFavBank = (ifsc, favList) => {
      if (!favList) return false
      for (let i = 0; i < favList.length; i++) {
          if (ifsc === favList[i].ifsc) return true
      }
      return false
  }

  handleClick=(e)=> {
      e.preventDefault();
     const ifsc= e.target.id;

     //getting from local storage
     let favBanksLocal = JSON.parse(LocalStorage.getItem('favBanks'));
      const match_banks= this.props.bankDetails ? this.props.bankDetails.filter(banks => ifsc===banks.ifsc):[]
      if (match_banks.length > 0)
      {
         if (favBanksLocal)
         {
            if (!favBanksLocal.some (bank => bank.ifsc===ifsc ))
            {
               favBanksLocal.push(match_banks[0])
            }
            else 
            {
               let index = favBanksLocal.findIndex(bank => bank.ifsc === ifsc) 
               if (index > -1) {
                   favBanksLocal.splice(index, 1)
            }

         }
      }
      
      else 
      {
        favBanksLocal=match_banks;
      }
      
      this.setState({favBanks:favBanksLocal});
      const jsonBanksString=JSON.stringify(favBanksLocal);
      localStorage.setItem('favBanks',jsonBanksString);
  
   console.log(this.state.favBanks);
   }
  }
     
   render () {
   
     //console.log(props.city);
     return (
            <React.Fragment>
           <div className="container row flex">
            
            
            {

               this.props.favbit===1 && this.props.bit2===0 ? 
               this.state.favBanks.map(bank => {
                   return <div key = {bank.ifsc} className="box">
                     <div className="div1"><i className="fas fa-star btn btn-outline-warning"></i></div>
                     <div className="div2">{bank.bank_name}</div>
                     <div className="div3">{bank.ifsc}</div>
                     <div className="div4">{bank.branch}</div>
                 </div>
               })
                :


                this.props.bit2===1 ?
               this.props.loading ?
                <h2>Loading...</h2> :
                this.props.filteredData.length===0 ? <h3>No search results....</h3> :

                this.props.filteredData.map(bank => {
                  if(this.isFavBank(bank.ifsc, this.state.favBanks)) {
                     return <div key = {bank.ifsc} className=" box">
                     <div className="div1"><i className="fas fa-star btn btn-outline-warning" onClick={this.handleClick} id={bank.ifsc}></i></div>
                     <div className="div2">{bank.bank_name}</div>
                     <div className="div3">{bank.ifsc}</div>
                     <div className="div4">{bank.branch}</div>
                 </div>
                  }
                  else 
                  {
                     return <div key = {bank.ifsc} className=" box">
                     <div className="div1"><i className="far fa-star btn btn-outline-warning" onClick={this.handleClick} id={bank.ifsc}></i></div>
                     <div className="div2">{bank.bank_name}</div>
                     <div className="div3">{bank.ifsc}</div>
                     <div className="div4">{bank.branch}</div>
                 </div>
                  }
               })
                   :
                   this.props.loading ?
                   <h2>loading...</h2> : 

               this.props.bankDetails.map(bank => {
                  if(this.isFavBank(bank.ifsc, this.state.favBanks)) {
                     return <div key = {bank.ifsc} className=" box">
                     <div className="div1"><i className="fas fa-star btn btn-outline-warning" onClick={this.handleClick} id={bank.ifsc}></i></div>
                     <div className="div2">{bank.bank_name}</div>
                     <div className="div3 ">{bank.ifsc}</div>
                     <div className="div4">{bank.branch}</div>
                 </div>
                  }
                  else 
                  {
                     return <div key = {bank.ifsc} className=" box">
                     <div className="div1"><i className="far fa-star btn btn-outline-warning" onClick={this.handleClick} id={bank.ifsc}></i></div>
                     <div className="div2">{bank.bank_name}</div>
                     <div className="div3">{bank.ifsc}</div>
                     <div className="div4">{bank.branch}</div>
                 </div>
                  }
               })
            }
            </div>
            
            </React.Fragment>
        )
         }
      }
      
export default content
      