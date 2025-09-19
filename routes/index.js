// routes/index.js
const express = require("express")
const baseController = require("../controllers/baseController")
const router = express.Router()

// Index route
router.get("/", baseController.buildHome)

module.exports = router