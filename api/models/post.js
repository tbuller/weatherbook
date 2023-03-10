const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  posterId: {type: String, required: true}
})