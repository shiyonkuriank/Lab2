const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../Kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
    console.log("in editcity route");
      kafka.make_request('editUserCity', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
    
    
      res.status(200).json({data});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
        
      }
    });
  });

  module.exports = router;