const purchaseModel = require("../models/purchase-model")

async function buyVehicle(req, res) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  try {
    await purchaseModel.addPurchase(account_id, inv_id)
    req.flash("notice", "Purchase successful! Thank you for your order.")
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    console.error("buyVehicle error", error)
    req.flash("notice", "Could not complete purchase.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

async function viewPurchases(req, res) {
  const { inv_id } = req.params
  const nav = await require("../utilities/").getNav()

  try {
    const purchases = await purchaseModel.getPurchasesByVehicle(inv_id)
    res.render("inventory/purchases", {
      title: "Vehicle Purchases",
      nav,
      purchases,
    })
  } catch (error) {
    console.error("viewPurchases error", error)
    req.flash("notice", "Could not load purchases.")
    res.redirect("/inv/")
  }
}

module.exports = { buyVehicle, viewPurchases }
