const express = require('express');
const router = express.Router();
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
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//TODO: add login route when sessions exist

module.exports = router;