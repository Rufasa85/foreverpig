const express = require('express');
const router = express.Router();
const {Tag,Pig} = require('../../models');

router.get("/",(req,res)=>{
    Tag.findAll({
        include:[Pig]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/",(req,res)=>{
    Tag.create({
        tag:req.body.tag
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//TODO: add login route when sessions exist

module.exports = router;