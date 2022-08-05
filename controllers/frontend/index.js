const express = require('express');
const router = express.Router();
const {Caretaker,Farmer,Pig,Tag} = require('../../models');

router.get("/",(req,res)=>{
    Pig.findAll({
        include:[Farmer,Tag]
    }).then(data=>{
        const hbsData = data.map(modelIns=>modelIns.toJSON())
        console.log(hbsData)
        res.render("home",{
            pigs:hbsData
        })
    })
})

router.get("/pig/:id",(req,res)=>{
    Pig.findByPk(req.params.id,{
        include:[Farmer,Tag]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        res.render("pig",hbsData)
    })
})

router.get("/farmer/:id",(req,res)=>{
    Farmer.findByPk(req.params.id,{
        include:[{
            model:Pig,
            include:[Tag]
        }]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        res.render("farmer",hbsData)
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.loggedIn){
        //TODO: change to login
        res.redirect("/login")
    }
    if(req.session.isFarmer){
        Farmer.findByPk(req.session.userId,{
            include:[{
                model:Pig,
                include:[Tag]
            }]
        }).then(data=>{
            const hbsData = data.toJSON()
            console.log(hbsData)
            res.render("profile",hbsData)
        })
    }else {
        Caretaker.findByPk(req.session.userId,{
            include:[{
                model:Pig,
                include:[Tag]
            }]
        }).then(data=>{
            const hbsData = data.toJSON()
            console.log(hbsData)
            res.render("profile",hbsData)
        })
    }
})

router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect("/profile")
    }
    res.render("loginSignup")
})

module.exports = router;