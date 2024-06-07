const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul id='navigate'>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      '</a>'
    list += "</li>"
  });
  
  list += '<li><a href="#"></a></a></li>'
  list += "</ul>"
  return list;
}


/* **************************************
* Build the classification view HTML
* ************************************ */
util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }


  

// DETAIL PAGE

util.buildVehicleDetailsHTML = async function (vehicleData) {
    return `
      <div class="vehicle-details">
        <img src="${vehicleData.inv_image}" alt="${vehicleData.inv_make} ${vehicleData.inv_model}">
        <div class="details">
            <h2>${vehicleData.inv_make} ${vehicleData.inv_model}</h2>
            <p><strong>Year:</strong> ${vehicleData.inv_year}</p>
            <p><strong>Price:</strong> $${new Intl.NumberFormat('en-US').format(vehicleData.inv_price)}</p>
            <p><strong>Mileage:</strong> ${new Intl.NumberFormat('en-US').format(vehicleData.inv_miles)}</p>
            <p><strong>Description:</strong> ${vehicleData.inv_description}</p>
            <!-- Add more details as needed -->
        </div>
      </div>
    `;
};


/* ****************************************
*  Deliver Login view
* *************************************** */
util.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}


/* ****************************************
*  Deliver Management view
* *************************************** */
util.buildMgt = async function (req, res, next) {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./mgt/management", {
      errors,
      title: "Vehicle Management",
      nav,
    })
    return
  }
  next()
}

/* ****************************************
*  Deliver Classification View
* *************************************** */
util.buildAdclass = async function (req, res, next) {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./mgt/adclass", {
      errors,
      title: "Add New Classification",
      nav,
    })
    return
  }
  next()
}

/* ****************************************
*  Deliver Select
* *************************************** */
util.buildClassificationList = async function (classification_id = null) {
try {
  let data = await invModel.getClassifications();
  console.log('Data received from getClassifications:', data);
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
} catch (error) {
  console.error('Error in buildClassificationList:', error);
  throw new Error('Failed to build classification list');
}
};


/* ****************************************
* Middleware to check token validity
**************************************** */
util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = util;
