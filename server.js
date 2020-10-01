// server requirements
const express = require("express");
const fs = require("fs");
// created express instance
const app = express();
// establishing PORT
var PORT = process.env.PORT || 8080;
// middleware to handle express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// server listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  