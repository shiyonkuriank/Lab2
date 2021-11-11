"use strict";

const Dishes= require("../Models/DishModel");

const handle_request = async (msg, callback) => {
    const res = {};
    
    Dishes.find({ Dish: msg.dish }, (error, dishes) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(dishes){
             
                console.log('fetched Details');
                res.status = 200; res.data = dishes;
                callback(null, res);
              }
              else{
                  if(dishes=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;