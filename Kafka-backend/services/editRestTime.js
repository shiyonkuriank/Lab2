"use strict";

const Rest= require("../Models/RestModel");

const handle_request = async (msg, callback) => {
    const res = {};
    Rest.findOne({ _id: msg.id,}, (error, rests) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(rests){
             
            Rest.updateOne(
                    {
                        _id: msg.id
                    },
                   {
                    $set:{
                        Time: msg.newTime
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
                  if(rests=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;