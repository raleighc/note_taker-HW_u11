// server requirements
const express = require("express");
const path = require("path");
const fs = require("fs");
// created express instance
const app = express();
const dbArray = require("./db/db.json");
// establishing PORT
var PORT = process.env.PORT || 8080;
// middleware to handle express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "Failed retrieving notes.",
      });
    }
    res.json({
      error: false,
      data: JSON.parse(data),
      message: "Retrieved notes.",
    });
  });
});

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
