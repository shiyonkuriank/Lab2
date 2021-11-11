"use strict";

const Dish= require("../Models/DishModel");

const handle_request= async(msg, callback)=>{
    console.log(msg);
    const res = {};
         Dish.findOne ({Dish:msg.name, Rest_id: msg.id }, (error, dish)=>{
        if(error){
          res.writeHead(400, {
            'content-type': 'text/plain',
          });
             console.log('mongo error');
             console.log(error);
              callback(error, null);
        }
    else{ 
      if(dish){
        console.log('dish already added');
        res.status = 400; res.data = "dish already added";
        callback(null, user);
        } else{
                var newDish= new Dish({
                Rest_id:msg.id,
                Dish:msg.name,
                Price:msg.price,
                Category:msg.cat,
                Ingredient:msg.ing,
                Type:msg.type,
                
              });


            newDish.save ((error,data)=>{
              console.log("dish added");
              if(error){
                console.log('Cannot insert dish details into db');
               res.status = 400; res.data = "Cannot insert dish details into db";
                callback(null, error);
              }else{
                console.log('Inserted sucessfully');
                res.status = 200; 
                res.data = data;
                callback(null, res);
              }
            });
          }
    }
        });
      }
 

exports.handle_request = handle_request;
