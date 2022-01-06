require("dotenv").config();
const fs = require("fs");
const path = require("path");
const serverless = require("serverless-http");
const express = require("express");

const PORT = process.env.PORT || 3000;
const HOST = "localhost";

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

if (process.env.NODE_ENV === "DEV") {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${HOST}:${PORT}`);
  });
} else {
  module.exports.handler = serverless(app);
}
