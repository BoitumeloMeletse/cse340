
// routes/inventoryRoute.js
// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const invValidate = require("../utilities/inventory-validation")

// Public route: build inventory by classification (site visitors)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Public route: inventory detail (site visitors)
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInventoryId)
)

// Public API: get inventory JSON
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)


// Route to build edit inventory view (Admin/Employee only)
router.get(
  "/edit/:inv_id",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.editInventory)
)

// Route to build inventory management view (Admin/Employee only)
router.get(
  "/",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.manageInventory)
)

// Route to add classification view (Admin/Employee only)
router.get(
  "/add-classification",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.addClassification)
)

// Route to add classification post (Admin/Employee only)
router.post(
  "/add-classification",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.addVehicleByClassificationName)
)

// Route to build add vehicle view (Admin/Employee only)
router.get(
  "/add-vehicle",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.addInventory)
)

// Route to add vehicle post (Admin/Employee only)
router.post(
  "/add-vehicle",
  utilities.checkLogin, 
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addNewInventoryVehicle)
)

// Route to process inventory update (Admin/Employee only)
router.post(
  "/update/",
  utilities.checkLogin, 
  utilities.checkAccountType,
  invValidate.newInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Route to build delete confirmation view (Admin/Employee only)
router.get(
  "/delete/:inv_id",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteView)
)

// Route to process inventory deletion (Admin/Employee only)
router.post(
  "/delete/",
  utilities.checkLogin, 
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteInventory)
)

module.exports = router

