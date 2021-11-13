const express = require('express');
const kafka = require('../Kafka/client');
const {restCheckAuth}=require('../Utils/restPassport');
const { restAuth } = require("../Utils/restPassport");
restAuth();


const router = express.Router();

router.post('/',restCheckAuth, (req, res)=>{
      kafka.make_request('addDish', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
                  
    
      res.status(200).json({ data});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch rest details");
        
      }
    });
  });

  module.exports = router;