const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async (req, res, next) => {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    if (!data || data.length === 0) {
      const error = new Error("No vehicles found for this classification")
      error.status = 404
      throw error
    }

    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build inventory detail view (Task 1)
 * ************************** */
invCont.buildByInventoryId = async (req, res, next) => {
  try {
    const invId = req.params.invId
    const data = await invModel.getInventoryById(invId)

    if (!data || data.length === 0) {
      const error = new Error("Vehicle not found")
      error.status = 404
      throw error
    }

    const vehicle = data[0]
    const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle)
    const nav = await utilities.getNav()

    res.render("./inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicleHTML,
      vehicle,
    })
  } catch (error) {
    next(error)
  }
}

/* ****************************************
 *  Deliver management view
 * *************************************** */
invCont.manageInventory = async (req, res, next) => {
  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationSelect,
    errors: null,
  })
}

/* ****************************************
 *  Deliver add-classification view
 * *************************************** */
invCont.addClassification = async (req, res, next) => {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Vehicle Management",
    nav,
    errors: null,
  })
}

/* ****************************************
 *  Deliver registration for car view
 * *************************************** */
invCont.addInventory = async (req, res, next) => {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-vehicle", {
    title: "Add vehicle",
    nav,
    classificationList,
    errors: null,
  })
}

/* ****************************************
 *  Process Registration for car view
 * *************************************** */
invCont.addNewInventoryVehicle = async (req, res, next) => {
  const nav = await utilities.getNav()
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
  } = req.body
  try {
    const data = await invModel.addNewInventoryVehicle(
      classification_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
    )
    if (data) {
      req.flash("notice", `New ${inv_make} vehicle was successfully added.`)
      res.redirect("/inv/")
    } else {
      throw new Error("Error adding a new vehicle")
    }
  } catch (error) {
    console.error("Error adding a new inventory vehicle", error)
    const classificationList = await utilities.buildClassificationList()
    res.status(500).render("inventory/add-vehicle", {
      title: "Add Vehicle",
      nav,
      classificationList,
      errors: [{ msg: "Failed to add vehicle. Please try again." }],
    })
  }
}

invCont.addVehicleByClassificationName = async (req, res, next) => {
  const nav = await utilities.getNav()
  const { classification_name } = req.body
  try {
    const data = await invModel.addVehicleByClassificationName(classification_name)
    if (data) {
      req.flash("notice", `New ${classification_name} classification was successfully added.`)
      res.redirect("/inv/")
    } else {
      throw new Error("Error adding a new classification")
    }
  } catch (error) {
    console.error("Error adding a new classification", error)
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: "Failed to add classification. Please try again." }],
    })
  }
}

/* ****************************************
 *  Return Inventory by Classification As JSON
 * *************************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = Number.parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0]) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ****************************************
 *  Build edit inventory view
 * *************************************** */
invCont.editInventory = async (req, res, next) => {
  const inv_id = Number.parseInt(req.params.inv_id)
  const nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData[0].classification_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id,
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async (req, res, next) => {
  const nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classificationSelect: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    })
  }
}

/* ****************************************
 *  Build delete confirmation view
 * *************************************** */
invCont.deleteView = async (req, res, next) => {
  const inv_id = Number.parseInt(req.params.inv_id)
  const nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_price: itemData[0].inv_price,
  })
}

/* ***************************
 *  Delete inventory item
 * ************************** */
invCont.deleteInventory = async (req, res, next) => {
  const inv_id = Number.parseInt(req.body.inv_id)

  const deleteResult = await invModel.deleteInventory(inv_id)

  if (deleteResult) {
    req.flash("notice", "The vehicle was successfully deleted.")
    res.redirect("/inv/")
  } else {
    req.flash("notice", "Sorry, the deletion failed.")
    res.redirect("/inv/delete/" + inv_id)
  }
}

module.exports = invCont
