import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from './Nav';

function Menu(){
 const[data,setdata]=useState([]);
    
  useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/dishes",
    {id:localStorage.getItem('id')}).then((response)=>{
      setdata(response.data.dishes);
      
    });
        
  },[]);     

    return(
        <div className="menu" style={{color: "seagreen", height:"100%"}}>
            <Nav/>
            <Container>
                
            <Row>
            <div className="dishes" >
               <h2 style={{fontStyle:"itlaic", color: "seagreen"}}>Our Special Menu...</h2>
               <div className="grid-container">
                   {data.map(function(d,idx){
                    
                       return (
                       <><div className="grid-item">
                        <p style={{fontSize:"larger"},{color:'seagreen'}} key={idx}><h4>{d.Dish}</h4></p>
                        <p key={idx}><img className="imageFood" src={d.Pic}  alt="img" /></p>
                       <p key={idx}>Category: {d.Category}</p>
                       <p key={idx}>{d.Price}$</p>
                       <p key={idx}>Main Ingredient: {d.Ingredient}</p></div></>
                       )
                   })}
               </div>
               
            </div>
            </Row>
            
            </Container>
        </div>
    );
}

export default Menu;