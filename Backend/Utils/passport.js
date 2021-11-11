"use strict";

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const {secret}=require('./config');
const Users = require('../Models/UserModel');
const Rest=require("../Models/RestModel");


function auth() {
    console.log("Inside passport: "+secret);
  const opts = {
      
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  console.log(opts);
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      console.log(jwt_payload);
      console.log("inside passport use");
      const _id = jwt_payload._id;
      console.log("Inside passport: "+_id);
      Users.findById(_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          console.log(results);
          callback(null, results);
        } else {
          callback(null, false);
        }
      });

    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });