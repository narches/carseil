const invModel = require("../models/inventory-model");
const utilities = require("../utilities/index");

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
}

// Build Detail View
invCont.getVehicleDetails = async function (req, res, next) {
  const vehicle_id = req.params.id
  const data = await invModel.getVehicleDetails(vehicle_id)
  const detail = await utilities.buildVehicleDetailsHTML(data)
  let nav = await utilities.getNav()
  const vehicleName = data.inv_make + '' + data.inv_model
  res.render("./inventory/detail", {
    title: vehicleName + " vehicles",
    nav,
    detail,
  });
}

module.exports = invCont