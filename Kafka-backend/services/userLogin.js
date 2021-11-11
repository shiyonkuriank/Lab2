"use strict";

const Users= require("../Models/UserModel");
const bcrypt = require('bcrypt');

const handle_request = async (msg, callback) => {
    console.log("Inside login");
    const res = {};

    Users.findOne({ Email: msg.email }, (error, data) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else {
            console.log(msg.Pwd);
            if (data === null || data.length === 0
                || !bcrypt.compareSync(msg.Pwd, data.Pwd)) {
              console.log('Invalid Credentials');
              res.status = 400; res.data = "Invalid login credentials";
              callback(null, res);
            } else {
                console.log('login successful');
                res.status = 200; res.data = data;
                callback(null, res);
              }
            }
    
    });
}

exports.handle_request = handle_request;