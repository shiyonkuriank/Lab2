const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../Kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
     kafka.make_request('viewRestOrder', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let orders=[];
        for(let i=0;i<data.data.length;i++){
            let orderDetails={
            _id:data.data[i]._id,
            UserName:data.data[i].UserName,
            Dishes:data.data[i].Dishes,
            OrderStatus:data.data[i].OrderStatus,
            DeliveryType:data.data[i].DeliveryType,
            Price:data.data[i].Price,
            
                           } 
                           orders.push(orderDetails);           
                }
               
              
          res.status(200).json({orders });
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
        
      }
    });
  });

  module.exports = router;