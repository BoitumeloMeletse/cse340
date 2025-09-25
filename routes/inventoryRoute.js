// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification (public access)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Route to deliver inventory item details (public access)
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInventoryId)
)

// TEMPORARY: Remove login requirements for testing
// Route to get inventory JSON
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)

// Route to build edit inventory view
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventory)
)

// Route to build inventory management view
router.get(
  "/",
  utilities.handleErrors(invController.manageInventory) // Remove checkLogin and checkAccountType temporarily
)

// Route to add classification view
router.get(
  "/add-classification",
  utilities.handleErrors(invController.addClassification)
)

// Route to add classification post
router.post(
  "/add-classification",
  utilities.handleErrors(invController.addVehicleByClassificationName)
)

// Route to build add vehicle view
router.get(
  "/add-vehicle",
  utilities.handleErrors(invController.addInventory)
)

// Route to add vehicle post
router.post(
  "/add-vehicle",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addNewInventoryVehicle)
)

// Route to process inventory update
router.post(
  "/update/",
  invValidate.newInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Route to build delete confirmation view
router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.deleteView)
)

// Route to process inventory deletion
router.post(
  "/delete/",
  utilities.handleErrors(invController.deleteInventory)
)

module.exports = router