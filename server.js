// server requirements
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
// created express instance
const app = express();
const dbArray = require("./db/db.json");

// establishing PORT
var PORT = process.env.PORT || 8080;

// middleware to handle express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API get Route
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        data: null,
        message: "Failed retrieving notes.",
      });
    }
    res.json(JSON.parse(data));
  });
});

// API post route
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        data: null,
        message: "Failed retrieving notes.",
      });
    }
    const currentNotes = JSON.parse(data);
    req.body.id = uuidv4();
    currentNotes.push(req.body);
    // console.log(currentNotes);
    fs.writeFile("./db/db.json", JSON.stringify(currentNotes), (err) => {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          data: null,
          message: "Failed to save new note.",
        });
      }
      res.json(currentNotes);
    });
  });
});

// API delete route
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        data: null,
        message: "Failed retrieving notes.",
      });
    }
    notesToDelete = JSON.parse(data);
    filteredNotesToDelete = notesToDelete.filter((deleted) => {
      console.log(deleted.id);
      return deleted.id != req.params.id;
    });
    notesAfterDeleteButStringy = JSON.stringify(filteredNotesToDelete);
    fs.writeFile("./db/db.json", notesAfterDeleteButStringy, "utf-8", (err) => {
      if (err) {
        console.log(err);
        return res.json({
          error: true,
          data: null,
          message: "Failed to delete note.",
        });
      }
      notesAfterDeleteButParsed = JSON.parse(notesAfterDeleteButStringy);
      res.json(notesAfterDeleteButParsed);
    });
  });
});

// HTML get Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// server listener
app.listen(PORT, function () {
  console.log(`App listening on PORT:${PORT}`);
});
