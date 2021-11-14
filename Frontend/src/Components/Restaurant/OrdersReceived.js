import React, { useEffect, useState } from "react";
import Nav from './Nav';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function OrdersReceived(){

    const[orders,setOrders]=useState([]);
    const[filter,setFilterStatus]=useState("");
    const[result,setResult]=useState([]);
    const[orderStatus, setOrderStatus]=useState("");

    useEffect(()=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://3.135.17.82:3001/viewCustOrder",
        {id:localStorage.getItem('id')}).then((response)=>{
          setOrders(response.data.orders);
         
        });
    },[]);
    
    const filterStatus=()=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://3.135.17.82:3001/orderStatusFilter",
        {id:localStorage.getItem('id'),status:filter}).then((response)=>{
          setResult(response.data.filterOrders);
         
        });
     

    }

    const setStatus=(id)=>{
        Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://3.135.17.82:3001/setOrderStatus",
        {id:id,status:orderStatus}).then((response)=>{
          console.log(response.data.data);
         
        });
    }

return(
    <><Nav /><div className="viewOrder" style={{background:"white"}}>

        <Container>
            <Row>
            <Col md={6}>
                
                    {orders.map(function (d, idx) {
                        if (d.OrderStatus !== "Cancelled") {

                            return (
                                
                                    <>
                                    <div className="mapView">
                                    <p className="list"><Link to={"/Customer"} style={{ color: "seagreen" }}
                                    onClick={() => { localStorage.setItem('customer', d.UserName); } }
                                    class="a"><h4>{d.UserName}</h4></Link></p>Dishes: {d.Dishes}<p>Delivery Type: {d.DeliveryType}</p><p>Total Amount: {d.Price}$</p>
                                    <select type="text" className="orderStatus" onChange={(e) => {
                                        setOrderStatus(e.target.value);
                                    } } style={{ width: "40%" }}>
                                        <option>Update Order Status</option>
                                        <option value="Order Received">Order Received</option>
                                        <option value="Prepairing">Prepairing</option>
                                        <option value="On the way">On the way</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Pick Up Ready">Pick Up Ready</option>
                                        <option value="Picked Up">Picked Up</option>
                                        <option value="Cancelled">Cancelled</option>

                                    </select><button className="button" onClick={() => { setStatus(d._id); } }>Update</button>
                                    </div>
                                    </>


                                
                            );
                        }
                    })}
                
            </Col>
            <Col md={6}>
                <select type="text" className="filterStatus" onChange={(e) => {
                    setFilterStatus(e.target.value);
                } } style={{ width: "40%" }}>
                    <option>Filter Order Status</option>
                    <option value="New Order">New Order</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Delivered">Delivered</option>


                </select>
                <button className="button" onClick={() => { filterStatus(); } }>Filter</button>

                
                    {result.map(function (d, idx) {

                        return (
                            
                                <>
                                <div className="mapView">
                                <p className="list"><Link to={"/Customer"} style={{ color: "seagreen" }}
                                onClick={() => { localStorage.setItem('customer', d.UserName); } }
                                class="a"><h4>{d.UserName}</h4></Link></p><p>Dishes: {d.Dishes}</p><p>status: {d.OrderStatus}</p><p>Total Amount: {d.Price}$</p>
                                </div>
                                </>

                            
                        );
                    })}

                
            </Col>
            </Row>
        </Container>
    </div></>
)
}

export default OrdersReceived;