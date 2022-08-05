const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {Farmer,Pig} = require('../../models');

router.get("/",(req,res)=>{
    Farmer.findAll({
        include:[Pig]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/",(req,res)=>{
    Farmer.create({
        email:req.body.email,
        password:req.body.password,
        city:req.body.city,
        lat:req.body.lat,
        lng:req.body.lng
    }).then(data=>{
        req.session.userId=foundUser.id;
        req.session.isFarmer=true;
        req.session.loggedIn=true;
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/login",(req,res)=>{
    Farmer.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid login"})
        }
        if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login"})
        }
        req.session.userId=foundUser.id;
        req.session.isFarmer=true;
        req.session.loggedIn=true;
        res.json(foundUser);
    })
})



module.exports = router;