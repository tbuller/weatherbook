const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  starterId: { type: String, required: true },
  responderId: { type: String, required: true },
  messages: { type: Array, required: false }
})

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;