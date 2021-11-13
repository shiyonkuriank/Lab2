import React,{useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import Nav from './UserNav';
import {useSelector } from "react-redux";
import { current } from '@reduxjs/toolkit';



function UserProfile(){
 
const[data,setdata]=useState([]);

useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/userProfile",
    {_id:localStorage.getItem('id')}).then((response)=>{
      setdata(response.data.payload);
    
    
    });
},[]);



    return(
        <><div classname="Profile" style={{ color: "seagreen" , background: "black", height:"100vh"}}>
            <Nav /> 
            
                <h4>Hello {data.UserName}!</h4>
                <img className="imageFood" src={data.Pic}  alt="img" />
                <p>Email: {data.Email}</p>
                <p>Phone: {data.Phone}</p>
                <p>DOB: {data.DOB}</p>
                <p>City: {data.City}</p>
                <p>State: {data.State}</p>
                <p>Country: {data.Country}</p>

              
                
                
            </div></>
    );
}
export default UserProfile;