"use strict";

const Dishes= require("../Models/DishModel");

const handle_request = async (msg, callback) => {
    const res = {};
    Dishes.findOne({ Dish: msg.name,}, (error, dishes) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(dishes){
             
            Dishes.updateOne(
                    {
                        Dish: msg.name
                    },
                   {
                    $set:{
                        Dish: msg.newname
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
                  if(dishes=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;