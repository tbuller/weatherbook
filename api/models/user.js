const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: {type: String, required: true},
  photo: {type: String, required: false},
  friends: {type: Array, required: false},
  requests: {type: Array, required: false},
  from: {type: String, required: false},
  aboutme: {type: String, required: false}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;