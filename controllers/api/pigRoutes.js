const express = require('express');
const router = express.Router();
const {Caretaker,Farmer,Pig,Tag} = require('../../models');

router.get("/",(req,res)=>{
    Pig.findAll({
        include:[Farmer,Caretaker,Tag]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/",(req,res)=>{
    Pig.create({
      name:req.body.name,
      dob:req.body.dob,
      description:req.body.description,
      FarmerId:req.body.FarmerId
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//just for adopt and return
router.put("/:id",(req,res)=>{
    Pig.update({
        CaretakerId:req.body.CaretakerId,
        isRaised:req.body.isRaised,
        farmerPickupRequested:req.body.CaretakerIdfarmerPickupRequested,
        caretakerPickupRequested:req.body.CaretakerIdcaretakerPickupRequested
    },{
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.delete("/:id",(req,res)=>{
    Pig.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/:pigId/tags/:tagId",(req,res)=>{
    Pig.findByPk(req.params.pigId).then(data=>{
        data.addTag(req.params.tagId).then(()=>{
            res.json(data)
        }).catch(err=>{
            console.log(err);
            res.status(400).json({msg:"cant add this tag"})
        })
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})
router.delete("/:pigId/tags/:tagId",(req,res)=>{
    Pig.findByPk(req.params.pigId).then(data=>{
        data.removeTag(req.params.tagId).then(()=>{
            res.json(data)
        }).catch(err=>{
            console.log(err);
            res.status(400).json({msg:"cant remove this tag"})
        })
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//TODO: add login route when sessions exist

module.exports = router;