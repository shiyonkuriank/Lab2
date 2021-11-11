"use strict";

const Rest= require("../Models/RestModel");

const handle_request = async (msg, callback) => {
    const res = {};
    Rest.findOne({ _id: msg._id }, (error, rest) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(rest){
                console.log('fetched Details');
                res.status = 200; res.data = rest;
                callback(null, res);
              }
              else{
                  if(rest=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;