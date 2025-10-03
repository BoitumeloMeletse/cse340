/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false, // recommended to set false
  saveUninitialized: false, // recommended
  name: 'sessionId',
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
  }
}));

// Middleware to log expiration
app.use((req, res, next) => {
  if (req.session) {
    const expireDate = new Date(Date.now() + req.session.cookie.maxAge);
    console.log("Session will expire at:", expireDate);
  }
  next();
});


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

// Populate res.locals.loggedin and res.locals.accountData on every request
app.use((req, res, next) => {
  if (req.session && req.session.account) {
    res.locals.loggedin = true
    res.locals.accountData = req.session.account
  } else {
    res.locals.loggedin = false
  }
  next()
})


// ✅ Second: Cookies or JWT Middleware
app.use(utilities.checkJWTToken)

// Debug middleware
app.use((req, res, next) => {
  console.log('=== REQUEST DEBUG ===');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log("SESSION AFTER LOGIN:", req.session)
  app.use((req, res, next) => {
    console.log("SESSION AT REQUEST:", req.session)
    next()
  })
  

  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  console.log('=====================');
  next();
});

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

// Account routes 
//app.use("/account", accountRoute)
app.use("/account", require("./routes/accountRoute"))

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
