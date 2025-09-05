// routes/index.js
const express = require("express")
const router = express.Router()

// Home page route
router.get("/", (req, res) => {
    res.render("index", { 
      title: "Home",
      nav: "<ul><li><a href='/'>Home</a></li><li><a href='/about'>About</a></li></ul>"
    })
  })
module.exports = router