/*
*   app.js is responsible for building the web server
*/

const EXPRESS = require("express");
const COOKIEPARSER = require("cookie-parser");
const MORGAN = require("morgan");
const PATH = require("path");
const PORT = process.env.PORT || 8080;
const ROUTER = require("./router");

const APP = EXPRESS();
var cors = require("cors");

// Node Environment - can be 'test', 'development' pr 'production'
var nodeEnv = process.env.NODE_ENV;
console.log("NODE_ENV: " + nodeEnv);

// Deployment URL
const DEPLOYURL = "https://mezzuzotproject.com";
var root =
  process.env.NODE_ENV === "production" ? DEPLOYURL : "http://localhost:3000";
console.log(root);

var corsOptions = {
  origin: root,
  methods: "GET,POST,PUT",
  credentials: false,
  allowedHeaders:
    '"Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type,Accept',
};
APP.use(COOKIEPARSER());

if (process.env.NODE_ENV == "test") {
  console.log("running on test config");
  APP.use(
    cors({
      origin: "http://localhost",
      credentials: false,
    })
  );
} else {
  APP.use(cors(corsOptions));
}

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));

//HTTP request logger
APP.use(MORGAN("tiny"));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
}

//Router
APP.use(ROUTER);

APP.listen(PORT, console.log(`Server is starting at ${PORT}`));

module.exports = APP;
