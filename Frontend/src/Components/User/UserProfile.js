import React,{useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Axios from 'axios';
import Nav from './UserNav';
import {useSelector } from "react-redux";
import { current } from '@reduxjs/toolkit';



function UserProfile(){


/*const user=useSelector((state)=> state.user.value);

return(
    <div classname="Profile" style={{ color: "black" }}>
    <Nav/>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>DOB: {user.dob}</p>
        <p>City: {user.city}</p>
        <p>State: {user.state}</p>
        <p>Country: {user.country}</p>
    </div>
)*/



  
const[data,setdata]=useState([]);
//const[img,setImg]=useState([]);


useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/userProfile",
    {_id:localStorage.getItem('id')}).then((response)=>{
      setdata(response.data.payload);
    
    
    });
},[]);



/*Axios.post("http://localhost:3001/viewImg",
{id:3}).then((response)=>{
  setImg(response.data);
  
});*/

    return(
        <><div classname="Profile" style={{ color: "seagreen" , background: "black", height:"100vh"}}>
            <Nav /> 
            
                <h4>Hello {data.UserName}!</h4>
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