"use strict";

const Fav= require("../Models/FavRestModel");

const handle_request = async (msg, callback) => {
    const res = {};
    Fav.find({UserId: msg.id},(error, favs) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(favs){
                console.log('fetched Details');
                res.status = 200; res.data = favs;
                callback(null, res);
              }
              else{
                  if(favs=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;