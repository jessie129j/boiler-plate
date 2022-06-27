const express = require('express');
const router = express.Router();

const { User } = require("../models/User");
const {auth}=require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/register", (req, res) => {
  const user = new User(req.body);
  User.findOne({ email: req.body.email }, (err, _user) => {
    if (err) return res.json({
      success: false, 
      message: err
    });
    if (_user) return res.json({
      success: false,
      message: "User already exists with such email"
    });
    user.save((err, doc) => {
      if (err) return res.json({
        success: false, 
        message: err
      });
      res.status(200).send({
        success: true,
        userId:user._id
      });
    })
  })
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.json({
          success: false, 
          message:err
      });
      if (!user) return res.json({
          success: false,
          message: "No user exists with such email"
      });
      user.comparePassword(req.body.password,(err,isMatch)=>{
          if(err) return res.json({
              success: false, err
          });
          if(!isMatch)
          return res.json({
              success: false,
              message: "Password is wrong"
          });
          user.generateToken((err,user)=>{
            if(err) return res.json({
                success: false, err
            });
            
            res.cookie("w_authExp",user.tokenExp);
            res.cookie("w_auth",user.token).status(200).json({
                success:true,
                userId:user._id,
                userName:user.name
            })
        })
      });
  })
});

router.get("/logout", auth,(req, res) => {
  User.findOneAndUpdate({ _id: req.user._id },
      { token: "", tokenExp: "" }, (err, doc) => {
          if (err) return res.json({
              success: false, 
              message: err
          });
      })
  res.status(200).send({
      success: true
  });
});

module.exports = router;