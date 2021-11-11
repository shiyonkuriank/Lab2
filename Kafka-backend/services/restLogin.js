"use strict";

const Rest= require("../Models/RestModel");
const bcrypt = require('bcrypt');

const handle_request = async (msg, callback) => {
    console.log("Inside login");
    const res = {};
    Rest.findOne({ Email: msg.email }, (error, data) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else {
            console.log(msg.pwd);
            if (data === null || data.length === 0
                || !bcrypt.compareSync(msg.pwd, data.Pwd)) {
              console.log('Invalid Credentials');
              res.status = 400; res.data = "Invalid login credentials";
              callback(null, res);
            }  else {
                console.log('login successful');
                res.status = 200; res.data = data;
                callback(null, res);
              }
            }
    
    });
}

exports.handle_request = handle_request;