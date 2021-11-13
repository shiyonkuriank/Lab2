const express = require('express');
const {checkAuth}=require('../Utils/passport')
const kafka = require('../Kafka/client');


const router = express.Router();

router.post('/',checkAuth,(req, res)=>{

          kafka.make_request('dishSerach', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let searchDish=[];
        for(let i=0;i<data.data.length;i++){
            let dishDetails={
            _id: data.data[i]._id,
            RestName:data.data[i].RestName,
                    } 
                    searchDish.push(dishDetails);           
                }
               
              
          res.status(200).json({ searchDish});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("No Results Found");
        
      }
    });
  });

  module.exports = router;