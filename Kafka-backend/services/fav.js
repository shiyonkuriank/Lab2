"use strict";

const Fav= require("../Models/FavRestModel");

const handle_request= async(msg, callback)=>{
    console.log(msg);
    const res = {};
         Fav.findOne ({UserId:msg.id, RestName: msg.name }, (error, fav)=>{
        if(error){
          res.writeHead(400, {
            'content-type': 'text/plain',
          });
             console.log('mongo error');
             console.log(error);
              callback(error, null);
        }
    else{ 
      if(fav){
        console.log('fav already added');
        res.status = 400; res.data = "fav already added";
        callback(null, fav);
        } else{
                var newFav= new Fav({
                RestName:msg.name,
                UserId:msg.id,
                Location:msg.loc,

                
              });


            newFav.save ((error,data)=>{
              console.log("fav added");
              if(error){
                console.log('Cannot inserts into db');
               res.status = 400; res.data = "Cannot insert into db";
                callback(null, error);
              }else{
                console.log('Inserted sucessfully');
                res.status = 200; 
                res.data = data;
                callback(null, res);
              }
            });
          }
    }
        });
      }
 

exports.handle_request = handle_request;
