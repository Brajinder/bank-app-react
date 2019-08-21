import React, { Component } from 'react'
import debounce from 'lodash.debounce'

 class paginate extends Component {

state= {
    itemsPerPage:5,
    currentPage:0
}
paginate = () => {
    const indexOfLastItem = (action.payload.currentPage + 1) * action.payload.itemsPerPage
    const indexOfFirstItem = indexOfLastItem - action.payload.itemsPerPage
    const list = this.props.filteredData.slice(indexOfFirstItem, indexOfLastItem)

}

debounce=debounce(() => {
    this.paginate(this.state.currentPage, this.state.itemsPerPage);
},500)

handleChange=(e) => {
    const {num} =e.target;
    if (Number(num) > 0)
    {
        this.setState({ itemsPerPage:Number(num) },() => 
            this.debounce())
    }

}


    render() {
console.log(thi);        
        return (
            <React.Fragment>
            <div className="">
            <div className = "row container">
                <div className="col">
                    <input 
                        className="form-control"
                        name="itemPerPage"
                       // value = {this.state.itemsPerPage}
                        placeholder = "Enter the number of items you want to see"
                        onChange = {this.handleChange}
                    />
                </div>
                </div>
                </div>
            
            
            
            
            </React.Fragment>
        )
    }
}

export default paginate
