const express = require("express");
const router = express.Router();
const { ObjectID } = require("bson");
const jwtManager = require("../jwt/jwtManager");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const hasher = require("bcryptjs");


// !Login
router.post("/login", async (req, res, next)=> {
  const email = req.body.email;
  const password = req.body.password;
  const checkUser = await User.findOne({email:req.body.email})
  if (checkUser){
     User.findOne({ email: email }).then((users) => {
    if (users && hasher.compare(password, users.password)) {
      const data = {};
      data.email = users.email;
      data.fullname = users.fullname;
      data.city=users.city
      data._id = users._id;
      let token = jwtManager.generate(data); 
      res.cookie("accessToken", token);
      res.json({
        result: token,
        status: "success",
        userId: data._id,
        userFullname: data.fullname,
        usercity:data.city

      });
    } else {
      res.json({ status: "invalid user" });
    }
  });
    
  }else{
    res.json({status: "err"})
  }


});

// !SignUp
router.post("/signup",  async (req, res, next)=> {
  const email = req.body.email;
  // const password = req.body.password;
   const checkUser = await User.findOne({email:req.body.email})
   if (checkUser){
     res.json({status: 'email is already exist'})
     
   }else{
      User.findOne({ email: email }).then((users) => {
    if (!users) {
      let newUser = new User({
        _id: new ObjectID(),
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city:req.body.city,
        state:req.body.state,
        zipcode:req.body.zipcode,
        phone:req.body.zipcode,
        active: true,
      
      });
      newUser.save(function (err, user) {
        if (err) return console.error(err);
        res.json({ status: "success" });
      });
    } else {
      res.json({ status: "use different username" });
    }
  });

   }
 
});

module.exports = router;