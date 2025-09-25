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

// Route to get inventory JSON (requires Employee/Admin access)
router.get(
  "/getInventory/:classification_id",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.getInventoryJSON)
)

// Route to build edit inventory view (requires Employee/Admin access)
router.get(
  "/edit/:inv_id",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.editInventory)
)

// Route to build inventory management view (requires Employee/Admin access)
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.manageInventory)
)

// Route to add classification view (requires Employee/Admin access)
router.get(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.addClassification)
)

// Route to add classification post (requires Employee/Admin access)
router.post(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.addVehicleByClassificationName)
)

// Route to build add vehicle view (requires Employee/Admin access)
router.get(
  "/add-vehicle",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.addInventory)
)

// Route to add vehicle post (requires Employee/Admin access)
router.post(
  "/add-vehicle",
  utilities.checkLogin,
  utilities.checkAccountType,
  invValidate.inventoryRules(),     // ✅ plain validator
  invValidate.checkInventoryData,   // ✅ plain validator
  utilities.handleErrors(invController.addNewInventoryVehicle) // ✅ wrap only controller
)

// Route to process inventory update (requires Employee/Admin access)
router.post(
  "/update/",
  utilities.checkLogin,
  utilities.checkAccountType,
  invValidate.newInventoryRules(),  // ✅ plain validator
  invValidate.checkUpdateData,      // ✅ plain validator
  utilities.handleErrors(invController.updateInventory) // ✅ wrap only controller
)

// Route to build delete confirmation view (requires Employee/Admin access)
router.get(
  "/delete/:inv_id",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteView)
)

// Route to process inventory deletion (requires Employee/Admin access)
router.post(
  "/delete/",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invController.deleteInventory)
)

module.exports = router
