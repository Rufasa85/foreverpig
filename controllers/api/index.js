const express = require('express');
const router = express.Router();
const caretakerRoutes = require("./caretakerRoutes")
const farmerRoutes = require("./farmerRoutes")
const pigRoutes = require("./pigRoutes")
const tagRoutes = require("./tagRoutes")

router.use("/caretakers",caretakerRoutes)
router.use("/farmers",farmerRoutes)
router.use("/pigs",pigRoutes)
router.use("/tags",tagRoutes)

module.exports = router;