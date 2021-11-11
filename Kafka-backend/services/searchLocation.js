"use strict";

const Rest= require("../Models/RestModel");

const handle_request = async (msg, callback) => {
    const res = {};
    console.log(msg.loc);
    Rest.find({ Location: msg.Location }, (error, rests) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(rests){
              console.log(rests);
                console.log('fetched Details');
                res.status = 200; res.data = rests;
                callback(null, res);
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