"use strict";

const Order= require("../Models/OrdersModel");

const handle_request = async (msg, callback) => {
    const res = {};
    Order.findOne({ _id: msg.id,}, (error, order) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(order){
             
            Order.updateOne(
                    {
                        _id:msg.id
                    },
                   {
                    $set:{
                        OrderStatus:"Cancelled"
                    },
                   },
                   (updateErr, updatedData) => {
                    if (updateErr) {
                      err.status = 400; err.data = "cannot update ";
                      console.log('err data', err);
                      callback(null, err);
                    } else {
                      res.status = 200; res.data = updatedData;
                      console.log('updated data', res);
                      callback(null, res);
                    }
                  },
                )
        }
              else{
                  if(user=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;