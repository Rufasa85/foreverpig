const express = require('express');
const router = express.Router();
const {Pig,Tag,Farmer} = require('../models');

router.get("/",(req,res)=>{
    Pig.findAll({
        include:[Farmer,Tag]
    }).then(data=>{
        res.json(data);
    })
})

module.exports = router;