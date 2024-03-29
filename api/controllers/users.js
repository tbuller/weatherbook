const { response } = require("express");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

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
  },
  Modify: (req, res, next) => {
    const { from, aboutMe, userId } = req.body;
    updateUser = {};
    if (from) {
      updateUser.from = from;
    }
    if (aboutMe) {
      updateUser.aboutMe = aboutMe;
    }
    User.findOneAndUpdate({ _id: userId }, updateUser, { new: true }, (err, user) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        User.find({}, (err, users) => {
          if (err) {
            res.status(400).json({ message: "server error" });
          } else {
            res.status(200).json({ message: "OK", user: user, users: users });
          }
        })
      }
    })
  },
  Request: (req, res, next) => {
    const { requesterId, requestedId } = req.body;
    User.findOneAndUpdate({ _id: requestedId }, { $addToSet: { requests: requesterId } }, { new: true, useFindAndModify: false }, (err, user) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        User.find({}, (err, users) => {
          if (err) {
            res.status(400).json({ message: "server error" });
          } else {
            res.status(200).json({ message: "OK", user: user, users: users });
          }
        })
      }
    })
  },
  AcceptRequest: (req, res, next) => {
    const { requesterId, requestedId } = req.body;
    User.findOneAndUpdate({ _id: requestedId }, { $addToSet: { friends: requesterId } }, { new: true, useFindAndModify: false }, (err, requestedUser) => {
      if (err) {
        return res.status(400).json({ message: "server error" });
      }
      User.findOneAndUpdate({ _id: requesterId }, { $addToSet: { friends: requestedId }}, { new: true, useFindAndModify: false }, (err, requesterUser) => {
        if (err) {
          return res.status(400).json({ message: "server error" });
        }
        User.find({}, (err, users) => {
          if (err) {
            res.status(400).json({ message: "server error" });
          } else {
            res.status(200).json({ message: "OK", users: users, requestedUser: requestedUser, requesterUser: requesterUser });
          }
        })
      })}) 
    },
  UploadPhoto: (req, res, next) => {
    const { userId, photo } = req.body;
    User.findByIdAndUpdate({ _id: userId }, { photo: photo }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        User.find({}, (err, users) => {
          if (err) {
            res.status(400).json({ message: "OK" });
          } else {
            res.status(200).json({ message: "OK", user: user, users: users });
          }
        })
      }
    })
  }
}

module.exports = UsersController;