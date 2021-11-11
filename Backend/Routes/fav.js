const express = require('express');
const kafka = require('../kafka/client');
const {checkAuth}=require('../Utils/passport')


const router = express.Router();

router.post('/',checkAuth, (req, res)=>{
      kafka.make_request('fav', req.body, function(err, data){
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