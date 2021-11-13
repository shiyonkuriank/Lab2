import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import './cart.css';
import {} from 'react-dom'
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { useHistory} from 'react-router';



function NewCart({closeModel}){

    //const [cartItem,setCart]=useState([]);

    const [address,setAddress]=useState("");
    const [instruction,setInstructions]=useState("");
    const[dType,setDeliveryType]=useState("");
    const history=useHistory();
    const cartItem=JSON.parse(localStorage.getItem('dishes'));
    //const cost=JSON.parse(localStorage.getItem('cost'));


const checkOut=()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://3.135.17.82:3001/orderSummary",
    {name:localStorage.getItem('restName'),customer:localStorage.getItem('name'),
    userId:localStorage.getItem('id'),restId:localStorage.getItem('rest_id'),
    dishes:Items,price:total,address:address,type:dType,status:"New Order",instruction:instruction,date:date,time:time}).then((response)=>{
    console.log(response);
    });
}

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let total=0;
let Items="";

cartItem.forEach(myFunction);
cartItem.forEach(myFunctionDish);

function myFunction(item){
    total+=item.Cost;
}

function myFunctionDish(item){
    Items+=item.Dish+" "+item.quantity+", ";
   
}
  
return(
    <>
    
    <div className="checkout">
    
        <div className="container">
            
       
            <div classname="title"><h1 style={ { color: 'seagreen' }}>Order Details</h1> </div>
               
            <div className="body">
            <Container>
    <Row>
        <Col md={6}>
        <div className="mapViewOrders">
                {cartItem.map(function (d, idx) {

return (
    <>
    
        <p key={idx} style={ { color: 'seagreen' }}><h4>{d.Dish} X {d.quantity}, Total: {d.Cost}</h4></p> </>
               
);
})}

<h4 style={ { color: 'seagreen' }}>Total Amount:{total}$</h4>   


                


              </div> 
                </Col>

               
        <Col md={6}>
        <div className="mapViewOrders">
            <Row>
            <Col md={4}>  
            
            <label style={ { color: 'seagreen' }}>Enter Your Address:</label>
            </Col>
            
            
            <textarea style={{width: "200px", height:"35px"}} onChange={(e) => {
                                setAddress(e.target.value);
                            } } required placeholder="Required Field"></textarea>
                            <label style={ { color: 'seagreen' }} >Special Instructions:</label>
                            <textarea  onChange={(e) => {
                                setInstructions(e.target.value);
                            } } required ></textarea>
            
            
            <select type="text" className="delivery" style={{marginTop:"20px"}} onChange={(e)=>{
                    setDeliveryType(e.target.value); }}>
    <option >Select Delivery Type</option>
    <option value="Delivery">Delivery</option>
	<option value="Take Out">Pick Up</option>
    
</select>

            </Row>
            </div>
        </Col>
        </Row>
        </Container>
        </div>
        <div className="footer">
                    <button className="footerbutton" style={{marginTop:"20px"}} onClick={()=>{checkOut();
                    history.push("/User");
                    alert("Order Placed Successfully");
                    localStorage.setItem('currRest',"");
                    }}>Check Out</button>
                    
                </div> 

        
        </div>
    </div>
   
    </>
)
}

export default NewCart;