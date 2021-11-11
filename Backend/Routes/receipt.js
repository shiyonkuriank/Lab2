const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{
      kafka.make_request('receipt', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let receipt=[];
        for(let i=0;i<data.data.length;i++){
            let orderDetails={
            _id:data.data[i]._id,
            RestName:data.data[i].RestName,
            Dishes:data.data[i].Dishes,
            Price:data.data[i].Price,
            Address:data.data[i].Address,
            DeliveryType:data.data[i].DeliveryType,
            OrderStatus:data.data[i].OrderStatus,
            SpecialInstruction:data.data[i].SpecialInstruction,
            Date:data.data[i].Date,
            Time:data.data[i].Time,
                           } 
                           receipt.push(orderDetails);           
                }
               
              
          res.status(200).json({receipt });
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch user details");
        
      }
    });
  });

  module.exports = router;