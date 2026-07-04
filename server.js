"use strict";

require("dotenv").config();

var express = require("express");
var cors = require("cors");

// require and use "multer"...
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors({ origin: "*" }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (err) {
    res.status(400).json({ error: "No file uploaded" });
  }
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening ...");
});
