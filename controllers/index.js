const express = require('express');
const router = express.Router();
const frontEndRoutes = require("./frontend")
const apiRoutes = require("./api")

router.use(frontEndRoutes)
router.use("/api",apiRoutes)
router.get("/sessiondata",(req,res)=>{
    res.json(req.session)
})
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})
module.exports = router;