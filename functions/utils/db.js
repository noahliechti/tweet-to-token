const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");

mongoose
  .connect(MONGO_URL, {
    // keepAlive: true, TODO:
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection is successful."))
  .catch(console.error);

module.exports = mongoose.connection;
