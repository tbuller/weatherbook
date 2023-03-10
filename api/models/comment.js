const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentedAt: {type: Date, default: Date.now},
  commenterId: {type: String, required: true},
  postId: {type: String, required: true},
  comment: {type: String, required: true},
  likes: {type: Array, required: false}
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;