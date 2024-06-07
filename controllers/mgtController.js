
const mgtModel = require("../models/mgt-model");
const utilities = require("../utilities")



/* ****************************************
*  Deliver Management view
* *************************************** */
async function buildMgt(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./mgt/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver Add New Class view
* *************************************** */
async function buildAdclass(req, res, next) {
  let nav = await utilities.getNav()
  res.render("mgt/adclass", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}


/* ****************************************
*  Deliver Add New Vehicle View
* *************************************** */
async function buildAdve(req, res, next) {
  let nav = await utilities.getNav()
  res.render("mgt/adve", {
    title: "Add New Vehicle",
    nav,
    errors: null,
  })
}

// Process Registration Unit 4, Process Activity
async function addVehicle(req, res) {
  let nav = await utilities.getNav();
  const {
    classification_name,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;

  const regResult = await mgtModel.addVehicle(
    classification_name,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  )

  if (regResult) {
    req.flash("notice", "New Vehicle Created!")
  } else {
    req.flash("notice", 'Sorry, there was an error processing the addition of a new vehicle.')
    res.status(500).render("mgt/adve", {
      title: "Add New Vehicle",
      nav: nav,
      errors: null,
    });
  }
} 
module.exports = {buildMgt, buildAdclass, buildAdve, addVehicle}
