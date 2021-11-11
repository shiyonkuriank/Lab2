"use strict";

const Orders= require("../Models/OrdersModel");

const handle_request = async (msg, callback) => {
    const res = {};
    console.log(msg.loc);
    Orders.find({RestId:msg.id, OrderStatus: msg.status }, (error, orders) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(orders){
              
                console.log('fetched Details');
                res.status = 200; res.data = orders;
                callback(null, res);
              }
              else{
                  if(orders=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;