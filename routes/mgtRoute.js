
// Needed Resources 
const express = require("express")
const router = new express.Router()
const mgtController = require("../controllers/mgtController")
const regValidate = require("../utilities/ve-validation")
const utilities = require("../utilities")


router.get("/management", utilities.handleErrors(mgtController.buildMgt))

// Route to handle requests for displaying details of a specific vehicle
router.get('/mgt/adve', async (req, res) => {
  try {
    const adve = await utilities.buildClassificationList();
    console.log('Generated form HTML:', adve);
    res.render('adve', { forme });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Deliver Add Classification View
router.get("/adclass", utilities.handleErrors(mgtController.buildAdclass))


// Process the Classification View
router.post(
    "/adclass",
    (req, res) => {
      res.status(200).send('Processing...')
    }
)

//Deliver Add Vehicle View
router.get("/adve", utilities.handleErrors(mgtController.buildAdve))


// Process the registration data
router.post(
    "/adve",
    regValidate.additionRules(),
    regValidate.checkAddData,
    utilities.handleErrors(mgtController.addVehicle)
)




module.exports = router;