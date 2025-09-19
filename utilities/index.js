const invModel = require("../models/inventory-model")
// const jwt = require("jsonwebtoken")
// require("dotenv").config()
const Util = {}

// /* ************************
//  * Constructs the nav HTML unordered list
//  ************************** */
// Util.getNav = async function (req, res, next) {
//   let data = await invModel.getClassifications()
//   let list = "<ul>"
//   list += '<li><a href="/" title="Home page">Home</a></li>'
//   data.rows.forEach((row) => {
//     list += "<li>"
//     list +=
//       '<a href="/inv/type/' +
//       row.classification_id +
//       '" title="See our inventory of ' +
//       row.classification_name +
//       ' vehicles">' +
//       row.classification_name +
//       "</a>"
//     list += "</li>"
//   })
//   list += "</ul>"
//   return list
// }

// /* **************************************
// * Build the classification view HTML
// * ************************************ */
// Util.buildClassificationGrid = async function(data){
//   let grid
//   if(data.length > 0){
//     grid = '<ul id="inv-display">'
//     data.forEach(vehicle => { 
//       grid += '<li>'
//       grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
//       + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
//       + 'details"><img src="' + vehicle.inv_thumbnail 
//       +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
//       +' on CSE Motors" /></a>'
//       grid += '<div class="namePrice">'
//       grid += '<hr />'
//       grid += '<h2>'
//       grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
//       + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
//       + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
//       grid += '</h2>'
//       grid += '<span>$' 
//       + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
//       grid += '</div>'
//       grid += '</li>'
//     })
//     grid += '</ul>'
//   } else { 
//     grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
//   }
//   return grid
// }

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async (req, res, next) => {
  try {
    const data = await invModel.getClassifications()
    let list = "<ul>"
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
        "</a>"
      list += "</li>"
    })
    list += "</ul>"
    return list
  } catch (error) {
    console.error("getNav error:", error)
    throw error
  }
}

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async (data) => {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach((vehicle) => {
      grid += "<li>"
      grid +=
        '<a href="/inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += "<hr />"
      grid += "<h2>"
      grid +=
        '<a href="/inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>"
      grid += "</h2>"
      grid += "<span>$" + new Intl.NumberFormat("en-US").format(vehicle.inv_price) + "</span>"
      grid += "</div>"
      grid += "</li>"
    })
    grid += "</ul>"
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ***************************
 *  Build vehicle detail HTML (Task 1)
 * ************************** */
Util.buildVehicleDetailHTML = (vehicle) => {
  return `
    <div class="vehicle-detail-container">
      <div class="vehicle-image-section">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-detail-image">
      </div>
      <div class="vehicle-info-section">
        <div class="vehicle-header">
          <h1 class="vehicle-title">${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
          <div class="vehicle-price">$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</div>
        </div>
        
        <div class="vehicle-specs">
          <div class="spec-row">
            <span class="spec-label">Year:</span>
            <span class="spec-value">${vehicle.inv_year}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Make:</span>
            <span class="spec-value">${vehicle.inv_make}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Model:</span>
            <span class="spec-value">${vehicle.inv_model}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Mileage:</span>
            <span class="spec-value">${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Color:</span>
            <span class="spec-value">${vehicle.inv_color}</span>
          </div>
        </div>
        
        <div class="vehicle-description">
          <h3>Vehicle Description</h3>
          <p>${vehicle.inv_description}</p>
        </div>
        
        <div class="vehicle-actions">
          <button class="btn-contact">Contact Dealer</button>
          <button class="btn-finance">Get Financing</button>
        </div>
      </div>
    </div>
  `
}


module.exports = Util
