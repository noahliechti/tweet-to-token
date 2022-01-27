const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  // TODO: what attributes do I need?
  _id: Number,
  name: String,
  screenName: String,
  photo: String,
  verified: Boolean,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
