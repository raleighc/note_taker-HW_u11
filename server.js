// server requirements
const express = require("express");
const path = require("path");
const fs = require("fs");
// created express instance
const app = express();
const db = require("./db/db.json");
// establishing PORT
var PORT = process.env.PORT || 8080;
// middleware to handle express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// HTML Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});



// server listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
