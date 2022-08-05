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
            pigs:hbsData,
            isLoggedIn:req.session.loggedIn
        })
    })
})

router.get("/pig/:id",(req,res)=>{
    Pig.findByPk(req.params.id,{
        include:[Farmer,Tag,Caretaker]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.isCaretaker = req.session.isFarmer === false
        hbsData.userId=req.session.userId
        console.log(hbsData);
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
        hbsData.isLoggedIn=req.session.loggedIn
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
            hbsData.isLoggedIn=req.session.loggedIn
            hbsData.isFarmer=true
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
            hbsData.isLoggedIn=req.session.loggedIn
            res.render("profile",hbsData)
        })
    }
})

router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect("/profile")
    }
    res.render("loginSignup",{
        isLoggedIn:false
    })
})

module.exports = router;