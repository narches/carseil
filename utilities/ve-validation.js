const utilities = require(".")
const mgtModel = require("../models/mgt-model.js")
const {body, validationResult } = require("express-validator")
const validate = {}


//Registration Data Validation Rules
validate.additionRules = () => {
    return [
        
      //Name is required and must be string
      body("classification_name")
      .trim()
      .escape() 
      .notEmpty() 
      .withMessage("Classification Name is required"),

        //Name is required and must be string
        body("inv_make") 
        .trim() 
        .escape() 
        .notEmpty() 
        .isLength({min: 3})
        .withMessage("Vehicle Make is required"),

        //Last Name is required and must be string
        body("inv_model") 
        .trim() 
        .escape() 
        .notEmpty() 
        .isLength({min: 3})
        .withMessage("Vehicle Model is required"),

            // valid email is required and cannot already exist in the database
        body("inv_description")
        .trim()
        .escape() 
        .notEmpty() 
        .isLength({min: 3})
        .withMessage("Vehicle Description is required"),
        // refer to validator.js docs
        body("inv_price")
        .trim()
        .escape() 
        .notEmpty() 
        .withMessage("Price is required"),
        // refer to validator.js docs
        body("inv_year")
        .trim()
        .escape() 
        .notEmpty() 
        .isLength({min: 4})
        .withMessage("Year is required"),
        // refer to validator.js docs
        body("inv_miles")
        .trim()
        .escape() 
        .notEmpty() 
        .withMessage("Miles is required"),
        // refer to validator.js docs
        body("inv_color")
        .trim()
        .escape() 
        .notEmpty() 
        .withMessage("Vehicle color is required"),

    ]

}
/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkAddData = async (req, res, next) => {
  console.log(req.body)
    const {classification_name, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color,} = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("mgt/adve", {
        errors,
        title: "Add New Vehicle",
        nav,
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
      })
      return
    }
    next()
}
  

module.exports = validate

   