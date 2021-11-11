"use strict";

const Users= require("../Models/UserModel");
const bcrypt=require("bcrypt");

const handle_request= async(msg, callback)=>{
   
    console.log("Inside user signup");
    console.log(msg);
    const res = {};

   
       Users.findOne ({Email:msg.email}, (error, user)=>{
        if(error){
          res.writeHead(400, {
            'content-type': 'text/plain',
          });
             console.log('mongo error');
             console.log(error);
              callback(error, null);
        }
    else{ 
      if(user){
        console.log('user already has account');
        res.status = 400; res.data = "user already has account";
        callback(null, user);
        } else{
          console.log("inside hash");
          const saltRounds = 10;
          bcrypt.hash(msg.pwd, saltRounds, (hasherr, hash) => {
            if (hasherr) {
              console.log('cannot hash');
              res.status = 400; res.data = "Cannot hash password";
              callback(null, res);
            }else{
            var newUser= new Users({
                UserName:msg.name,
                NickName:msg.name,
                Email:msg.email,
                Pwd:hash,
                Phone:msg.phone,
                DOB:msg.dob,
                City:msg.city,
                State:msg.state,
                Country:msg.country
              });


            newUser.save ((error,data)=>{
              console.log("registered");
              if(error){
                console.log('Cannot insert user details into db');
               res.status = 400; res.data = "Cannot insert user details into db";
                callback(null, error);
              }else{
                console.log('Inserted sucessfully');
                res.status = 200; 
                res.data = data;
                callback(null, res);
              }
            });
          }
        
        });
      }
    }
   });
};
    

exports.handle_request = handle_request;
