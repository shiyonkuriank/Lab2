const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const { restAuth } = require("../Utils/restPassport");
const kafka = require('../Kafka/client');

restAuth();

const router = express.Router();

router.post('/',(req, res)=>{
    console.log("Inside login");
    kafka.make_request('restlogin', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
      }else if (data.status === 200) {
        const payload = {
            _id: data.data._id,
            Type:"Rest",
            Name: data.data.Name,
            Email: data.data.Email,
            Phone:data.data.Phone,
            Location:data.data.Location,
          };
          console.log('successfully logged in',payload);
     
       
      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000,
      });

      const fullToken = `JWT ${token}`;
        console.log(fullToken); 
      res.status(200).json({ fullToken, payload});
     
      }else {
        console.log('Invalid Credentials');
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end('Invalid Credentials');
        
      }
    });
  });

  module.exports = router;