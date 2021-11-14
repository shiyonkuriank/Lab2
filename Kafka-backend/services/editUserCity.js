"use strict";

const User= require("../Models/UserModel");

const handle_request = async (msg, callback) => {
    const res = {};
    User.findOne({ _id: msg._id }, (error, user) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(user){
              console.log("edit user : ", user)
                User.updateOne(
                    {
                        _id:msg._id
                    },
                   {
                    $set:{
                        City:msg.newCity
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