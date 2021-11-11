"use strict";

const User= require("../Models/UserModel");

const handle_request = async (msg, callback) => {
    const res = {};
    User.findOne({ _id: msg._id }, (error, user) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(user){
                console.log('fetched Details');
                res.status = 200; res.data = user;
                callback(null, res);
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