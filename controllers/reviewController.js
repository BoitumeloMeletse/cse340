const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

/* Add a new review */
async function addReview(req, res) {
  const { review_text, inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  try {
    if (!review_text || review_text.length < 5) {
      req.flash("notice", "Review must be at least 5 characters.")
      return res.redirect(`/inv/detail/${inv_id}`)
    }

    await reviewModel.addReview(review_text, inv_id, account_id)
    req.flash("notice", "Review added successfully.")
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    console.error("addReview error", error)
    req.flash("notice", "Sorry, your review could not be added.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

/* Delete a review */
async function deleteReview(req, res) {
  const { review_id, inv_id } = req.body
  try {
    await reviewModel.deleteReview(review_id)
    req.flash("notice", "Review deleted.")
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    console.error("deleteReview error", error)
    req.flash("notice", "Could not delete review.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

module.exports = { addReview, deleteReview }
