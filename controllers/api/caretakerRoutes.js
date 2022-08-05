const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {Caretaker,Pig} = require('../../models');

router.get("/",(req,res)=>{
    Caretaker.findAll({
        include:[Pig]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/",(req,res)=>{
    Caretaker.create({
        email:req.body.email,
        password:req.body.password,
        city:req.body.city,
        lat:req.body.lat,
        lng:req.body.lng,
        numPigs:req.body.numPigs
    }).then(data=>{
        req.session.userId=data.id;
        req.session.isFarmer=false;
        req.session.loggedIn=true;
        res.json(data)

    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//TODO: add login route when sessions exist

router.post("/login",(req,res)=>{
    Caretaker.findOne({
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
        req.session.isFarmer=false;
        req.session.loggedIn=true;
        res.json(foundUser);
    })
})

module.exports = router;