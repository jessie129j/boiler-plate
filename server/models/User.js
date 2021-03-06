const mongoose=require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require("moment");
var config=require('../config/config.js')

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:String,
    tokenExp:Number
});

userSchema.pre('save',function(next){
    var user=this;
    if(user.isModified('password')){ //비밀번호가 바뀔때만 암호화
        bcrypt.genSalt(config.saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword=function(plainPassword,cb){
    var user=this;
    bcrypt.compare(plainPassword,user.password,function(err,isMatch){
        if(err) return cb(err)
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken=function(next){
    var user=this;
    var token=jwt.sign(user._id.toHexString(),config.token_key);
    var oneHour=moment().add(1,'hour').valueOf();

    user.tokenExp=oneHour;
    user.token=token;
    user.save(function(err,user){
        if(err) return next(err);
        next(null,user);
    })
}

userSchema.statics.findByToken=function(token,next){
    var user=this;
    jwt.verify(token,config.token_key,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return next(err);
            next(null,user);
        })
    })
}

const User=mongoose.model('User',userSchema);
module.exports={User};
