// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
// const utilities = require("../utilities/index")
// const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to deliver inventory item details (public access)
router.get("/detail/:invId", invController.buildByInventoryId)


module.exports = router;