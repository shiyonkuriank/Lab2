const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const { auth } = require("../Utils/passport");
const kafka = require('../kafka/client');

auth();

const router = express.Router();


router.post('/',(req, res)=>{
  
    kafka.make_request('post_user',req.body, function(err,data){
      console.log('in Sign Up USer');
      
      if (err){
        
          console.log("Inside userRegiter err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else if(data.status===200){
          console.log("Inside else");
          console.log('successfully registered');
          const payload = {
            _id: data.data._id,
            Type:"User",
            UserName: data.data.UserName,
            Email: data.data.Email,
            Phone:data.data.Phone,
            DOB:data.data.DOB,
            City:data.data.City,
            State:data.data.State,
            Country:data.data.Country,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          const fullToken = `JWT ${token}`;
          
          res.status(200).json({ fullToken, payload });
             
          }else {
            console.log('Invalid data');
            
            res.end('Invalid data');
          }
      
  });
  
  });
  module.exports = router;