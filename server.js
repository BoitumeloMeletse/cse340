/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const app = express()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)
app.use(require("./routes/index"))

// Index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

// Inventory routes
app.use("/inv", inventoryRoute)

/* ***********************
 * Global Error Handling Middleware (Task 2)
 *************************/
app.use(async (err, req, res, next) => {
  console.error("Error occurred:", err.stack)

  let nav = ""
  try {
    nav = await utilities.getNav()
  } catch (navError) {
    console.error("Error getting navigation:", navError)
    nav = "<ul><li><a href='/'>Home</a></li></ul>"
  }

  const status = err.status || 500
  const message = err.message || "Something went wrong. Please try again later."

  res.status(status).render("errors/error", {
    title: `Error ${status}`,
    nav: nav,
    message: message,
    status: status,
    layout: "./layouts/layout",
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT 
const host = process.env.HOST 

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
