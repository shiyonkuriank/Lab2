"use strict";

const Orders= require("../Models/OrdersModel");

const handle_request= async(msg, callback)=>{
    console.log("inside order summary");

    const res = {};

            var newOrder= new Orders({
                RestName:msg.name,
                UserName:msg.customer,
                UserId:msg.userId,
                RestId:msg.restId,
                Dishes:msg.dishes,
                Price:msg.price,
                Address:msg.address,
                DeliveryType:msg.type,
                OrderStatus:msg.status,
                SpecialInstruction:msg.instruction,
                Date:msg.date,
                Time:msg.time
              });


              newOrder.save ((error,data)=>{
              console.log("registered");
              if(error){
                console.log('Cannot insert details into db');
               res.status = 400; res.data = "Cannot insert user details into db";
                callback(null, error);
              }else{
                console.log('Inserted sucessfully');
                res.status = 200; 
                res.data = data;
                callback(null, res);
              }
            });
          }
        

    

exports.handle_request = handle_request;
