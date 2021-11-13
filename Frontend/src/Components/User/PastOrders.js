import React, { useEffect, useState } from 'react';
import Nav from './UserNav';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';

function Orders(){

    const[orders,setOrders]=useState([]);
    const[filter,setFilterStatus]=useState("");
    const[result,setResult]=useState([]);
    const [pageNumber,setPageNumber]=useState(0);
    //const [orderPerPage,setOrderPerPage]=useState();
    const [totalPage,setTotalPage]=useState(5);
    const orderPerPage =Math.ceil(orders.length/totalPage);
    const pagesVisited= pageNumber*orderPerPage;
    
    const pageChange=({selected})=>{
        setPageNumber(selected);

    }

    console.log(orders);
    console.log(orders.length);

    const displayOrders= orders.slice(pagesVisited, pagesVisited+orderPerPage)
    .map(function (d, idx) {
        return (
            <div className="grid-item">
                
                <p><h4 >{d.RestName}</h4></p>
                <p>{d.OrderStatus}</p>
                <p><Link to={"/Receipt"} 
                                onClick={()=>{localStorage.setItem('receiptFor',d._id);}}
                                class="a" style={{color:"forestgreen"}}>View Receipt</Link></p>
                        
            </div>
        );
    })

useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://3.135.17.82:3001/viewRestOrder",
    {id:localStorage.getItem('id')}).then((response)=>{
      setOrders(response.data.orders);
     
    });
},[]);


    const filterStatus=()=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://3.135.17.82:3001/statusFilter",
        {id:localStorage.getItem('id'),status:filter}).then((response)=>{
          setResult(response.data.orderFilter);
         
        });
     

    }


    return (
        <><Nav />
        <div className="custOrder" style={{ color: "seagreen", height:"100vh" }}><h3>Past Orders</h3>
        <select type="text" className="filterStatus"  onChange={(e)=>{
                    setFilterStatus(e.target.value); }} style={{width:"40%"}}>
    <option >Filter Status</option>
    <option value="Order Received">Order Received</option>
	<option value="Prepairing">Prepairing</option>
    <option value="On the way">On the way</option>
    <option value="Delivered">Delivered</option>
    <option value="Pick Up Ready">Pick Up Ready</option>
    <option value="Picked Up">Picked Up</option>
    <option value="Cancelled">Cancelled</option>
    
</select>
<button className="button" onClick={()=>{filterStatus()}}>Filter</button>




<div className="grid-container">
         {result.map(function (d, idx) {

return (
    <div className="grid-item">
    <p><h4 >{d.RestName}</h4></p>
    <p>{d.OrderStatus}</p>
    <p><Link to={"/Receipt"} 
                    onClick={()=>{localStorage.setItem('receiptFor',d._id);}}
                    class="a" style={{color:"forestgreen"}}>View Receipt</Link></p>
            
</div>
);
})}

         </div>

         <div>
<select type="number" className="filterStatus"  onChange={(e)=>{
                    setTotalPage(e.target.value); }} style={{width:"40%"}}>
    <option >Select Page Number</option>
    <option value="2">2</option>
	<option value="5">5</option>
    <option value="10">10</option>
    
</select>
</div>
        
         {displayOrders}
         <ReactPaginate
         
         previousLabel={"Previous"}
         nextLabel={"Next"}
         pageCount={totalPage}
         onPageChange={pageChange}
         containerClassName={"paginationButtons"}
         previousLinkClassName={"previousButton"}
         nextLinkClassName={"nextButton"}
         disabledClassName={"disabledButton"}
         activeClassName={"activeButton"}
         />
         
         

        </div>
        </>

    )
}
export default Orders;
