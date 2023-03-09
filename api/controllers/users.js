const { response } = require("express");
const User = require("../models/user");

const UsersController = {
  Create: async (req, res, next) => {
    const { email, password, username } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "email already in use" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "username already in use" });
    }
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(401).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", user: user });
      }
    })
  },
  List: (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", users: users });
      }
    })
  }
}

module.exports = UsersController;