const { response } = require("express");
const User = require("../models/user");

const UsersController = {
  Create: (req, res, next) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(401).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", user: user });
      }
    })
  }
}

module.exports = UsersController;