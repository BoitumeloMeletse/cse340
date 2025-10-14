const express = require("express")
const router = new express.Router()
const purchaseController = require("../controllers/purchaseController")
const utilities = require("../utilities/")

// Buy (client must be logged in)
router.post(
  "/buy",
  utilities.checkLogin,
  utilities.handleErrors(purchaseController.buyVehicle)
)

// View purchases (Admin/Employee only)
router.get(
  "/view/:inv_id",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(purchaseController.viewPurchases)
)

module.exports = router
