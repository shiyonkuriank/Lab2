"use strict";

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const {secret}=require('./config');
const Rest=require("../Models/RestModel");
const User=require("../Models/UserModel");

// Setup work and export for the JWT passport strategy
function restAuth() {
    console.log(secret);
  const opts = {
      
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const _id = jwt_payload._id;
      console.log("Inside restpassport: "+_id);
      console.log("Type: "+jwt_payload.Type);
      if(jwt_payload.Type==="Rest"){
      Rest.findById(_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }else{
      User.findById(_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }
    })
  ,

  
    
  );
}

exports.restAuth = restAuth;
exports.restCheckAuth = passport.authenticate("jwt", { session: false });