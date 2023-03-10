const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postedAt: {type: Date, default: Date.now},
  posterId: {type: String, required: true},
  thoughts: {type: String, required: true},
  city: {type: String, required: true},
  time: {type: String, required: true},
  rain: {type: Number, required: false},
  temperature: {type: Number, required: false},
  precipitation: {type: Number, required: false},
  windspeed: {type: Number, required: false},
  radiation: {type: Number, required: false},
  cloudcover: {type: Number, required: false},
  reaction: {type: Array, required: false}
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;