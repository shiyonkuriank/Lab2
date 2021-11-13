const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../Kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
      kafka.make_request('userOrderFilter', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let orderFilter=[];
        for(let i=0;i<data.data.length;i++){
            let orderDetails={
                _id:data.data[i]._id,
                RestName:data.data[i].RestName,
                OrderStatus:data.data[i].OrderStatus,

                    } 
                    orderFilter.push(orderDetails);           
                }
                
              
          res.status(200).json({ orderFilter});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("No Results Found");
        
      }
    });
  });

  module.exports = router;