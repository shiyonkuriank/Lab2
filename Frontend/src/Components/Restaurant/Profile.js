import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import Nav from './Nav';
import {useDispatch} from 'react-redux';
import {restlogin} from '../../features/rest';


function Profile(){


    const dispatch=useDispatch();    
const[data,setdata]=useState([]);
console.log(data);

const name=localStorage.getItem('name');
const email=localStorage.getItem('email');
const phone=localStorage.getItem('phone');
const city=localStorage.getItem('city');


const disp=()=>{
    dispatch(restlogin({name:name, email:email,
        phone:phone,city:city}));
}

useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/profile",
{_id:localStorage.getItem('id')}).then((response)=>{
  setdata(response.data.payload);
console.log(response.data.payload);

});

},[]);



disp();

    return(

        <div classname="Profile" style={{ color: "seagreen" }}>
         <Nav/>
         
        <h1>Hello {localStorage.getItem('name')}!</h1>
        <img className="imageRest" src={data.Pic}  alt="img" />
       

 <p>Email: {data.Email}</p>
 <p>{data.Description}</p>
 <p>Delivery Type: {data.DeliveryType}</p>
 <p>Open Hours: {data.Time}</p>
 <p>Food Category: {data.FoodType}</p>
 <p>Contact Us: {data.Phone}</p>
 <p>Location: {data.Location}</p>
        
            
        </div>
    );
}
export default Profile;