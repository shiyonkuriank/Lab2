import React,{useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {logout} from '../../features/user';



function Nav(){

    const dispatch=useDispatch();
    let user=localStorage.getItem('name');
    const history=useHistory();

    const disp=()=>{
        dispatch(logout());
    }

    function logOut(){
        localStorage.clear();
        disp();
        window.open('../UserSign','_self');
    }

    return(
        <div className="Nav">
            
            <div className="leftside">
                
                <div className="links">
                <Link to={"/User"} className="a" style={{color:"seagreen"}}>UberEats</Link>
                <Link to={"/UserProfile"} className="a">Profile</Link>
                <Link to={"/EditUserProfile"} className="a">Edit Profile</Link>
                
                <Link to={"/Favourites"} className="a">Favourites</Link>
                 <button>Open</button>
            </div>
            </div>
            <div className="rightside">
                <div className="links">
                <Link to={"/PastOrders"} className="a">Past Orders</Link>
            <Link to={"../UserSign"} className="a" onClick={logOut}>Log Out</Link>
            </div>
            </div>

        </div>
    );
}
export default Nav;