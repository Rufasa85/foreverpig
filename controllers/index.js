const express = require('express');
const router = express.Router();
const frontEndRoutes = require("./frontend")
const apiRoutes = require("./api")

router.use(frontEndRoutes)
router.use("/api",apiRoutes)

module.exports = router;