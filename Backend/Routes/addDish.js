const express = require('express');
const kafka = require('../Kafka/client');
const {checkAuth}=require('../Utils/restPassport');



const router = express.Router();

router.post('/',checkAuth, (req, res)=>{
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