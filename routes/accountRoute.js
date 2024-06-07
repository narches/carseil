// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")
const utilities = require("../utilities")


// Deliver Login View
router.get("/login", utilities.handleErrors(accountController.buildLogin))


// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

//Deliver SignUp View
router.get("/signup", utilities.handleErrors(accountController.buildRegister))


// Process the registration data
router.post(
    "/signup",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Deliver Account Login View
router.get("/accmgt", utilities.handleErrors(accountController.accountLogin))

// Process the Account Login View
router.post(
  "/accmgt",
  (req, res) => {
    res.status(200).send("You're Logged in")
  }
)

module.exports = router;