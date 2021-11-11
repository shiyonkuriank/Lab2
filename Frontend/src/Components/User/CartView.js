import React, {useState,useEffect} from 'react';
import Axios from 'axios';
import './cart.css';
import {} from 'react-dom'
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { useHistory} from 'react-router';



function NewCart({closeModel}){

    const history=useHistory();
    const cartItem=JSON.parse(localStorage.getItem('dishes'));
    const[cart,setCart]=useState(cartItem);
  
let total=0;
cartItem.forEach(myFunction);
function myFunction(item){
    total+=item.Cost;
}
const[totalCost,setTotal]=useState(total);

const increment=(index)=>{
    
    cart[index]={...cart[index],quantity:cart[index].quantity+1};
    cart[index]={...cart[index],Cost:cart[index].Cost+cartItem[index].Cost};
setCart(cart);
    setTotal(totalCost+cartItem[index].Cost);

    console.log(cart);
}

const decrement=(index)=>{
    cart[index]={...cart[index],quantity:cart[index].quantity-1};
    cart[index]={...cart[index],Cost:cart[index].Cost-cartItem[index].Cost};
    //setIncMessage(cartItem[index].Dish+": Quantity: "+cartItem[index].quantity);
    setTotal(totalCost-cartItem[index].Cost);
    setCart(cart);
    console.log(cart);
   
}

const removeItem=(index,price)=>{
cart.splice(index,1);
console.log(cart);
setTotal(totalCost-price);
setCart(cart);
//setDelMessage(cartItem[index].Dish+" Removed");
}


  
return(
    <>
    
    <div className="modalBackground">
    

        <div className="modalContainer">
            
       
            <div classname="title"><h1 style={ { color: 'darkcyan' }}>View the Cart Items</h1> </div>
               
            <div className="body">
                
            <Container>
    <Row>
        <Col md={12}>
                {cart.map(function (d, idx) {
                   

return (
    <>
        <p key={idx} style={ { color: 'Orange' }}>{d.Dish}, Price: {d.Cost}$  Quantity: {d.quantity} <button className="button"
        onClick={()=>{decrement(idx)}}>-</button>
        <button className="button" onClick={()=>{increment(idx)}}>+</button>
        <button className="button" onClick={()=>{removeItem(idx,d.Cost)}}>Remove Item</button>
        </p> 
        
                
        </>
               
);
})}


               
                </Col>

            </Row>

        </Container>
        </div>
        <div className="footer">
            
            
                    <button className="footerbutton" style={{width:"40%"}} onClick={()=>{
                         localStorage.setItem('dishes',JSON.stringify(cart));
                    history.push("/NewCart");

                    }}>Proceed To CheckOut</button>
                    
                </div> 

        
        </div>
    </div>
   
    </>
)
}

export default NewCart;