const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const { restAuth } = require("../Utils/restPassport");
const kafka = require('../kafka/client');

restAuth();

const router = express.Router();

router.post('/',(req, res)=>{
  
    kafka.make_request('post_rest',req.body, function(err,data){
      console.log('in Sign Up rest');
      
      if (err){
        
          console.log("Inside restRegiter err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else if(data.status===200){
        const payload = {
          _id: data.data._id,
          Type:"Rest",
          RestName: data.data.Name,
          Email: data.data.Email,
          Phone:data.data.Phone,
          Location:data.data.Location,
         
        };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          const fullToken = `JWT ${token}`;
          console.log("fulltoken: "+fullToken);
          res.status(200).json({ fullToken, payload });
             
             
          }else {
            console.log('Invalid data');
            
            res.end('Invalid data');
          }
      
  });
  });

  module.exports = router;