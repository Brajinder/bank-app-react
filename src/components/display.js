import React, { Component } from 'react'
import Content from './content.js'
import debounce from 'lodash.debounce'
import ls from 'local-storage'
import LocalStorage from './localStorage';

 class display extends Component {
     state ={
         favBanks:[],
         bankDetails:[],
        filteredData:[],
        filteredData_dup:[],
        city_form:"",
         filterTerm:"",
         itemsPerPage:"10",
        currentPage:0,
        bit2:0,
        favbit:0,
        loading:false
}
componentDidMount () {
    this.setState({favBanks:ls.get('favBanks')});
}

// renderFavourite=(banks) => {
//     banks.map((bank)=> {
//         return <div key = {bank.ifsc} className="row data-row">
//         <div className="col-xs-auto text-right"><i className="fas fa-star"></i></div>
//         <div className="col">{bank.bank_name}</div>
//         <div className="col">{bank.ifsc}</div>
//         <div className="col">{bank.branch}</div>
//     </div>

//     })

// }

filterData=(data) => {
    const dataLowerCase=data.toLowerCase();
return this.state.bankDetails.filter(item => {
         return Object.keys(item).some(key => 
            typeof item[key]==="string" && item[key].toLowerCase().includes(dataLowerCase))
         })
    }


debounce1= debounce(()=> {
    const dataFilter=this.filterData(this.state.filterTerm);
 this.setState({filteredData:dataFilter,
    filteredData_dup:dataFilter,
loading:false }, () => {
     console.log(this.state.filteredData);
 })
}, 500);

requestData =async (citySearch) => {

    const api_call = await fetch (`https://vast-shore-74260.herokuapp.com/banks?city=${citySearch}`);
    const data_json=await api_call.json();
    
   this.setState({bankDetails:data_json,
    loading:false
                  
})
const jsonBanksData=JSON.stringify(this.state.bankDetails);

LocalStorage.setItem(`${citySearch}`,jsonBanksData); // API Caching
     console.log(this.state);

}
handleChange2=(e) => {
    e.preventDefault();
   
    const {name, value}= e.target;
    this.setState({
        [name]: value
    },  () => {
        if (name==="city_form") {
            this.setState({bit2:0,
                favbit:0,
            loading:true});
            if (this.state.city_form !== "favourite")
            {
                if(LocalStorage.getItem(this.state.city_form)){
                    let storageData=LocalStorage.getItem(this.state.city_form);
                    let data=JSON.parse(storageData);
              this.setState({ bankDetails:data,
            loading:false })
            
                console.log(LocalStorage.getItem(this.state.city_form));
                 }
        else 
            this.requestData(this.state.city_form);
            
            }
            if (this.state.city_form === "favourite")
            this.setState({favbit:1});
          
        
        }
        if (name==="filterTerm")
        {
            this.setState({bit2:1,
                loading:true});
            this.debounce1();
        }
        
    })
    

}
submit=(e) => {
    e.preventDefault();
};

paginate = () => {
    const indexOfLastItem = (this.state.currentPage + 1) * this.state.itemsPerPage
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
    const list = this.state.filteredData_dup.slice(indexOfFirstItem, indexOfLastItem)
this.setState({filteredData:list});
}

debounce2=debounce(() => {
    this.paginate(this.state.currentPage, this.state.itemsPerPage);
},500)

handleChange1=(e) => {
    
    
    const {value} =e.target;
    if (Number(value) > 0)
    {
        this.setState({ itemsPerPage:value },() => 
            this.debounce2())
    }
    else {
        this.setState({itemsPerPage:10}, ()=> {
            this.debounce2()
        })
    }

}


render() {
         
        return (
            <React.Fragment>
            <h1 className="text-center">
            Bank Search App
            </h1>
            <div className="row main">
            
            <form onSubmit={this.submit} className="form-style text-center">

            <div className="col-lg-4 col-sm-2">

            <select name="city_form"
            onChange ={this.handleChange2}
            value={ this.state.city_form }
            placeholder="Search"
            className="form-control btn btn-warning">

            <option value="..." key="0">...</option>/>
            <option value="favourite" key="1">FAVOURITE</option>/>
            <option value="DELHI" key="11">DEHLI</option>/>
            <option value="KOLKATA" key="2">KOLKATA</option>/>
            <option value="MUMBAI" key="3">MUMBAI</option>/>
            <option value="YAMUNANAGAR" key="4">YAMUNANAGAR</option>/>
            <option value="INDORE" key="5">INDORE</option>/>
            </select>
            <small className="form-text text-muted">Type in for Search</small>
            </div>

            <div className="col-lg-4 col-sm-2">
            <input type="text"
            name="filterTerm"
            className="form-control btn btn-warning"
            placeholder="Type In"
            value={this.state.filterTerm}
            onChange={this.handleChange2} />
            <small className="form-text text-muted text-danger">Filter</small>
           </div>
            </form>
            </div>
          
            <div className = "container page">
             
                 <input 
                     className="form-control btn btn-warning"
                     name="itemsPerPage"
                     placeholder="10"
                     onChange = {this.handleChange1}/>
                     <small className="form-text text-muted text-center">Items Per Page</small>

                   </div>
                   
                         
              
                                 
             <Content bankDetails={this.state.bankDetails}
             favBanks={this.state.favBanks}
             filteredData={this.state.filteredData}
             bit2={this.state.bit2} loading={this.state.loading}
             favbit={this.state.favbit}/>


           

             </React.Fragment>
        )
    }
}


export default display;
