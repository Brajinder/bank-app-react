import React from 'react'



  const content=(props)=> {
     //console.log(props.city);
        return (
            <React.Fragment>
           
           
           
            <tr id="abc" className="row">

            <td id="bank_id" className="col text-center border">{props.bank_id}</td>
            <td id="bank" className="col border">{props.bank_name}</td>
            <td id="bank" className="col border">{props.ifsc}</td>
            <td id="bank" className="col border">{props.city}</td>
            <td id="bank" className="col border">{props.state}</td>
            <td id="bank" className="col border">{props.district}</td>
            </tr>
           
            
            
            
           
           
           
              

            
          
            
          </React.Fragment>
        )
}
export default content