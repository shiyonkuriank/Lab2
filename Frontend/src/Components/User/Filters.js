import React,{useState} from 'react';
import Axios from 'axios';
import { useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import Nav from './UserNav';

function Filters(){

    const[foodType, setFoodType]=useState("");
    const[deliveryType, setDeliveryType]=useState("");
    const[foodTypeRest,setRestFoodType]=useState([]);
    const[deliveryTypeRest,setRestDeliveryType]=useState([]);
    const[dish, setDishName]=useState("");
    const[loc, setLoc]=useState("");
    const[dishResult,setdishSearch]=useState([]);
    const[locMessage,setLocMessage]=useState("");
    const[locResult,setLocSearch]=useState([]);
    //const history=useHistory();

    const restFoodType=()=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://localhost:3001/restFoodType",
{foodType:foodType}).then((response)=>{
  setRestFoodType(response.data.filterFood);

    });
}

const restDeliveryType=()=>{
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/restDeliveryType",
{deliveryType:deliveryType}).then((response)=>{
setRestDeliveryType(response.data.filterDType);

});
}

const addToFavourite=(Rest, Loc)=>{
    alert("Added to Favourites");
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/favRest",
    {name:Rest,loc:Loc,id:localStorage.getItem('id')}).then((response)=>{
      console.log("Added to favourite");
     
    });
}

const dishSearch=()=>{
    console.log("dish search called");
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/dishSearch",
    {dish:dish}).then((response)=>{
       setdishSearch(response.data.searchDish);
                 }
     
    );
}

const locSearch=()=>{
    console.log("loc: "+loc);
    Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    Axios.post("http://localhost:3001/locSearch",
    {Location:loc}).then((response)=>{
        if(response.data.message){
                 
           setLocMessage(response.data.message);
                 }else{
                     setLocSearch(response.data.searchRest);
                 }
                }
    );
            }


    return(
        <div className="filters" style={{background:"white"}}>
            
            <div className="grid-container">
            <div className="grid-item">
            <input type="text" className="searchbar" placeholder="Search for your favourite Dishes"
           onChange={(e)=>{
            setDishName(e.target.value); }}
           ></input>
           <button  className="dishSearch" onClick={()=>{dishSearch()}}>Search</button>
           <div className="grid-container">
           {dishResult.map(function(d,idx){
                    
                    return (
                    <><div className="grid-item">
                        <p>The dish is found at:</p>
                     <p className="list" ><Link to={"/OrderNow"} 
                        onClick={()=>{localStorage.setItem('restName',d.RestName);
                        localStorage.setItem('rest_id',d._id);}}
                        class="a" style={{color:"forestgreen"}}><h4>{d.RestName}</h4></Link></p>
                    
                     </div>
                     </>
                    )
           
                })} 
           </div>
           </div>

           <div className="grid-item">

           <input type="text" className="searchbar" placeholder="Search for your nearest locations"
           onChange={(e)=>{
            setLoc(e.target.value); }}
           ></input>
           <button  className="dishSearch" onClick={()=>{locSearch()}}>Search</button>
           <h3>{locMessage}</h3>
           <div className="grid-container">
           {locResult.map(function(d,idx){
                    
                    return (
                    <><div className="grid-item">
                     <p className="list" ><Link to={"/OrderNow"} 
                        onClick={()=>{localStorage.setItem('restName',d.RestName);
                        localStorage.setItem('rest_id',d._id);}}
                        class="a" style={{color:"forestgreen"}}><h4>{d.RestName}</h4></Link></p>
                     
                     <p key={idx} >City: {d.Location}</p>
                            <p key={idx} >Category: {d.FoodType}</p>
                            <p key={idx}>Open Hours: {d.Time}</p>
                            <button className="footerbutton" 
                        onClick={()=>{addToFavourite(d.RestName, d.Location)}}>Add to favourites</button>
                     </div>
                     </>
                    )
                })} 
           </div>
           </div>


           </div>
            <div className="typeOfFood">
<select type="text" className="foodType"  onChange={(e)=>{
                    setFoodType(e.target.value); }}>
    <option >Select Food category</option>
    <option value="Vegan">Vegan</option>
	<option value="Veg">Veg</option>
    <option value="NonVeg">Non-Veg</option>
</select>
<button className="button" onClick={restFoodType}>Filter</button>
<div className="grid-container">


                {foodTypeRest.map(function (d, idx) {

                    return (
                        <div className="grid-item">
                            <p className="pst" ><Link to="/OrderNow"
                            onClick={()=>{localStorage.setItem('restName',d.Name);
                            localStorage.setItem('rest_id',d._id);}}
                            class="a" style={{color:"forestgreen"}}><h4>{d.Name}</h4></Link></p>
                            
                            <p >City: {d.Location}</p>
                            <p >Category: {d.FoodType}</p>
                            <p>Open Hours: {d.Time}</p>
                            <button className="footerbutton" 
                        onClick={()=>{addToFavourite(d.Restname, d.Loc)}}>Add to favourites</button>
                            
                        </div>
                    );
                })}</div>
            </div>

            <div className="modeOfDelivery">
<select type="text" className="delivery"  onChange={(e)=>{
                    setDeliveryType(e.target.value); }}>
    <option >Select Delivery Option</option>
    <option value="Delivery">Delivery</option>
	<option value="Take Out">Pick Up</option>
    
</select>
<button className="button" onClick={restDeliveryType}>Filter</button>
<div className="grid-container">


                {deliveryTypeRest.map(function (d, idx) {

                    return (
                        <div className="grid-item">
                            <p className="pst" ><Link to={"/OrderNow"}
                            onClick={()=>{localStorage.setItem('restName',d.Name);
                            localStorage.setItem('rest_id',d._id);}}
                            class="a" style={{color:"forestgreen"}}><h4>{d.Name}</h4></Link></p>
                            
                            <p >City: {d.Location}</p>
                            <p >Category: {d.FoodType}</p>
                            <p >Delivery: {d.DeliveryType}</p>
                            <p>Open Hours: {d.Time}</p>
                            <button className="footerbutton" 
                        onClick={()=>{addToFavourite(d.Restname, d.Loc)}}>Add to favourites</button>
                            
                        </div>
                    );
                })}</div>

            </div>

        </div>
    );
}

export default Filters;