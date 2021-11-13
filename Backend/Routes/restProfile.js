const express = require('express');
const kafka = require('../kafka/client');
const {restCheckAuth}=require('../Utils/restPassport');
const { restAuth } = require("../Utils/restPassport");
restAuth();


const router = express.Router();

router.post('/',restCheckAuth, (req, res)=>{
      kafka.make_request('restProfile', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        const payload = {
            
            Name: data.data.Name,
            Email: data.data.Email,
            Phone:data.data.Phone,
            Description:data.data.Description,
            DeliveryType: data.data.DeliveryType,
            Time: data.data.Time,
            FoodType: data.data.FoodType,
            Location:data.data.Location,
            Pic:data.data.Pic,
          };
              
    
      res.status(200).json({ payload});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch rest details");
        
      }
    });
  });

  module.exports = router;