import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from './UserNav';
import { useHistory } from 'react-router';
import NewCart from './NewCart';

function OrderNow(){
    const[data,setdata]=useState([]);
    const history=useHistory();
    const[openModel,setOpenModel]=useState(false);
    const[dataRest,setRestdata]=useState([]);
    
 const[cart,setCart]=useState([]);

 const addToCart = (dish,id) => {
   if(localStorage.getItem('currRest')=="")
   {
    localStorage.setItem('currRestId',id);
    localStorage.setItem('currRest',localStorage.getItem('restName'));
    alert("Added to Cart");
    setCart([...cart,dish]);
    //setCost([...cost,dish.Price]);
    console.log(cart);
  
  }else{
     if(localStorage.getItem('currRest')!=localStorage.getItem('restName')){
        
history.push('/Confirmation');
}else{
        alert("Added to Cart");
        setCart([...cart,dish]);
        //setCost([...cost,dish.Price]);
        console.log(cart);
        
     }
   }

  };
    
 useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://3.135.17.82:3001/dishes",
{id:localStorage.getItem('rest_id')}).then((response)=>{
setdata(response.data.dishes);

});

 },[]); 

 useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://3.135.17.82:3001/profile",
{_id:localStorage.getItem('rest_id')}).then((response)=>{
setRestdata(response.data.payload);

});

 },[]);
 
function cartObject(dish,price,quantity){
this.Dish=dish;
this.Cost=price;
this.quantity=quantity;

}


return(
    <div className="menu">
        <Nav/>
        <h1>{dataRest.Name}</h1>
        <img className="imageRest" src={dataRest.Pic}  alt="img" />
       

 <p>Email: {dataRest.Email}</p>
 <p>{dataRest.Description}</p>
 <p>Delivery Type: {dataRest.DeliveryType}</p>
 <p>Open Hours: {dataRest.Time}</p>
 <p>Food Category: {dataRest.FoodType}</p>
 <p>Contact Us: {dataRest.Phone}</p>
 <p>Location: {dataRest.Location}</p>
        
       
        <div className="dishes">
           <h2 style={{fontStyle:"itlaic"}}>Place Your Order</h2>
           <div className="grid-container">
               {data.map(function(d,idx){
                
                   return (
                   <><div className="grid-item">
                           <p style={{ fontSize: "larger" }, { color: 'black' }}><h4>{d.Dish}</h4></p>
                           <p><img className="imageFood" src={d.Pic} alt="img" /></p>
                           <p>Category: {d.Category}</p>
                           <p>{d.Price}$</p>
                           <p>Main Ingredient: {d.Ingredient}</p>
                           
                           <button className="button" 
                            onClick={()=>{
                                var obj=new cartObject(d.Dish,d.Price,1);
                                addToCart(obj,d.Rest_id)}}
                           >Add to cart</button></div></>
                   )
               })}
           </div>
          <button className="footerbutton" onClick={()=>{history.push("/CartView");
          setOpenModel(true);
          localStorage.setItem('dishes',JSON.stringify(cart));
          //localStorage.setItem('cost',JSON.stringify(cost));
           }}>Go to Cart</button> 
         { openModel && <NewCart closeModel={setOpenModel}/>} 
        </div>
      
        
    </div>
);
}

export default OrderNow;