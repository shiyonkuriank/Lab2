"use strict";

const order= require("../Models/OrdersModel");

const handle_request = async (msg, callback) => {
    const res = {};
    order.find({RestId: msg.id},(error, order) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(order){
                console.log('fetched Details');
                res.status = 200; res.data = order;
                callback(null, res);
              }
              else{
                  if(order=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;