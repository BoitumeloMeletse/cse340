/* *********************************
 * Account routes
 * ********************************/

const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/index")
const regValidate = require("../utilities/account-validation")

/* *********************************
 * Deliver Account Management View
 * ********************************/
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

/* *********************************
 * Deliver Login View
 * ********************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* *********************************
 * Process the login request
 * ********************************/
router.post("/login",
    regValidate.loginRules(),    // Remove handleErrors from here
    regValidate.checkLoginData,  // Remove handleErrors from here
    utilities.handleErrors(accountController.accountLogin)  // Keep only on controller
)

/* *********************************
 * Deliver Registration View
 * ********************************/
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/* *********************************
 * Process Registration
 * ********************************/
router.post(
  "/register",
  regValidate.registrationRules(), // Remove handleErrors
  regValidate.checkRegData,        // Remove handleErrors
  utilities.handleErrors(accountController.registerAccount), // Keep only on controller
)

/* *********************************
 * Deliver Update Account View
 * ********************************/
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdateAccount))

/* *********************************
 * Process Update Account
 * ********************************/
router.post(
  "/update",
  regValidate.updateAccountRules(), // Remove handleErrors
  regValidate.checkUpdateData,      // Remove handleErrors
  utilities.handleErrors(accountController.updateAccount), // Keep only on controller
)

/* *********************************
 * Process Update Password
 * ********************************/
router.post(
  "/update-password",
  regValidate.updatePasswordRules(), // Remove handleErrors
  regValidate.checkPasswordData,     // Remove handleErrors
  utilities.handleErrors(accountController.updatePassword), // Keep only on controller
)

/* *********************************
 * Process logout request
 * ********************************/
router.get("/logout", utilities.handleErrors(accountController.logoutAccount))

module.exports = router