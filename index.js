var express = require("express");
var cors = require("cors");
require("dotenv").config();

const multer = require("multer");
const upload = multer().single("upfile");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post("/api/fileanalyse", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    }

    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    return res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
