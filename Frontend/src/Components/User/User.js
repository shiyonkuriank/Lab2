import React, {useEffect, useState} from 'react';

import Nav from './UserNav';
import './User.css';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '../../features/user';
import Filters from './Filters';
import {Link} from 'react-router-dom';
import { useHistory} from 'react-router';


function User(){
       const history=useHistory();


    const[restNear,setRestNearMe]=useState([]);
    const dispatch=useDispatch();
   

    const name=localStorage.getItem('name');
const email=localStorage.getItem('email');
const phone=localStorage.getItem('phone');
const dob=localStorage.getItem('dob');
const city=localStorage.getItem('city');
const state=localStorage.getItem('state');
const country=localStorage.getItem('country');


const disp=()=>{
    dispatch(login({name:name, email:email,phone:phone,dob:dob,city:city,state:state,country:country}));

}


const addToFavourite=(Rest, Loc)=>{
    alert("Added to Favourites");
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://3.135.17.82:3001/favRest",
    {name:Rest,loc:Loc,id:localStorage.getItem('id')}).then((response)=>{
      console.log("Added to favourite");
     
    });
}

useEffect(()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');

    Axios.post("http://3.135.17.82:3001/restNearMe",
    {city:localStorage.getItem('city')}).then((response)=>{
      setRestNearMe(response.data.restNear);
     
    });
    
},[]);

disp();
    return(
                
        <div className="landing" style={{height:"100%", background:"white"}}>
           <Nav/> 
          <Filters/>
           <p><h4 style={{color: "seagreen"}}>Restaurants near me</h4></p>
           <div className="grid-container">
           {
           
           restNear.map(function (d, idx) {
               if(restNear[idx].Location==localStorage.getItem('city')){

return (
    <div className="grid-item">
        <p className="list" ><Link to={"/OrderNow"} 
        onClick={()=>{localStorage.setItem('rest_id',d._id);
        localStorage.setItem('restName',d.Name);}}
        class="a" style={{color:"forestgreen"}}><h4>{d.Name}</h4></Link></p>
        <img className="imageFood" src={d.Pic} alt="img" />
        <p>City: {d.Location}</p>
        <p>Open Hours: {d.Time}</p>
        <button className="footerbutton" 
        onClick={()=>{addToFavourite(d.Name, d.Location)}}>Add to favourites</button>
        
    </div>
);
}})}


</div>
            <p><h4 style={{color: "seagreen"}}>All Restaurants</h4></p>
            <div className="grid-container">
            {restNear.map(function (d, idx) {
                if(restNear[idx].Location!=localStorage.getItem('city')){

                return (
                    <div className="grid-item">
                        <p className="list" ><Link to={"/OrderNow"} 
                        onClick={()=>{localStorage.setItem('rest_id',d._id);
                        localStorage.setItem('restName',d.Name);}
                    }
                        class="a" style={{color:"forestgreen"}}><h4>{d.Name}</h4></Link></p>
                        <img className="imageFood" src={d.Pic} alt="img" />
                        <p>City: {d.Location}</p>
                        <p>Open Hours: {d.Time}</p>
                        <button className="footerbutton" 
                        onClick={()=>{addToFavourite(d.Name, d.Location)}}>Add to favourites</button>
                  
                    </div>
                );
            }})}
        </div>
        </div>
        
    );
}

export default User;

