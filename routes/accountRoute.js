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
router.post(
    "/login",
    regValidate.loginRules(),      // ✅
    regValidate.checkLoginData,    // ✅ leave as is
    utilities.handleErrors(accountController.accountLogin), // ✅ wrap only the controller
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
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount),
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
  regValidate.updateAccountRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount),
)

/* *********************************
 * Process Update Password
 * ********************************/
router.post(
  "/update-password",
  regValidate.updatePasswordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword),
)

/* *********************************
 * Process logout request
 * ********************************/
router.get("/logout", utilities.handleErrors(accountController.logoutAccount))

module.exports = router
