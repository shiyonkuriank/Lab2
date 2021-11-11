import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from './UserNav';

function Favourites(){

    const[fav,setFav]=useState([]);

    useEffect(()=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://localhost:3001/fav",
        {id:localStorage.getItem('id')}).then((response)=>{
          setFav(response.data.favs);
         
        });
    
    },[]);

    return(
        <>
        <Nav/>
        <div className="favourites" style={{height:"100vh", color:"seagreen"}}>
        <p><h4>Favourites</h4></p>
        
        


        {fav.map(function (d, idx) {

            return (
                <div className="mapView">
                    <p className="list" ><Link to={"/OrderNow"} 
                    onClick={()=>{localStorage.setItem('restName',d.RestName)}}
                    class="a" style={{color:"forestgreen"}}><h4>{d.RestName}</h4></Link></p>
                    <p>City: {d.Location}</p>
                 
                    
                </div>
            );
        })}
        
        </div>
        </>
    )
}

export default Favourites;