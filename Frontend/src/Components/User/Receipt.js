import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Nav from './UserNav';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

function Receipt(){

    const[receipt,setReceipt]=useState([]);
    const[cancelMesssage,setCancelMessage]=useState("");

    const cancelOrder=(orderStatus,id)=>{
if(orderStatus!=="New Order"){
    setCancelMessage("Order Cannot be cancelled");
}
if(orderStatus==="Cancelled"){
    setCancelMessage("Order already Cancelled");
}
if(orderStatus==="New Order"){
    console.log("cancel called");
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/cancelOrder",
    {id:id}).then((response)=>{
      setCancelMessage("Order Cancelled");
     
    });
}
    }

    useEffect(()=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://localhost:3001/viewReceipt",
        {id:localStorage.getItem('receiptFor')}).then((response)=>{
          setReceipt(response.data.receipt);
         
        });
    },[]);


    return(
        <>
            <div className="modalBackground">
    

    <div className="modalContainer">
        
    <div classname="title"><h1 style={ { color: 'darkcyan' }}>Receipt</h1> </div>
    <div className="body" style={ { color: 'orange' }}>
            <Container>
    <Row>
        <Col md={12}>
            {receipt.map(function (d, idx) {

return (
   
    
        <><p>Dishes Ordered: {d.Dishes}</p>
        <p>Order Status: {d.OrderStatus}</p>
        <p>Address: {d.Address}</p>
        <p>Special Instruction: {d.SpecialInstruction}</p>
        <p>Date: {d.Date}, Time: {d.Time}</p>
        
        <p>Total Amount: {d.Price}$</p>
        <p><button className="button" style={{background:"crimson"}} onClick={()=>{cancelOrder(d.OrderStatus,d._id)}}>Cancel Order</button></p>
        <p><h5 style={{color: "red"}}>{cancelMesssage}</h5></p>
        </>

    );
})}
</Col>
</Row>
</Container>
            </div>
        </div>
        </div></>
    )
}
export default Receipt;