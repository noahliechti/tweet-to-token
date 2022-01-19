require("dotenv").config();
const mongoose = require("mongoose");
const globals = require("./globals");

let connection = null;

if (process.env.NODE_ENV === "development") {
  connection = mongoose
    .connect(globals.devMongoURL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Local DB connection is successful."))
    .catch(console.error);
} else {
  connection = mongoose
    .connect(globals.prodMongoURL, { keepAlive: true, useNewUrlParser: true })
    .then(() => console.log("Live DB connection is successful."))
    .catch(console.error);
}

module.exports = mongoose.connection;
