const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/index")

// Add a new review (must be logged in)
router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(reviewController.addReview)
)

// Delete review (Admin/Employee only)
router.post(
  "/delete",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(reviewController.deleteReview)
)

module.exports = router
