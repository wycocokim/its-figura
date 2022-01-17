const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  phone: Number,
  booking_date: Date,
  status: String,
  // time: Date,
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
