const Chat = require("../models/chat");

const ChatsController = {
  Create: (req, res, next) => {
    const chat = new Chat(req.body);
    chat.save((err, chat) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", chat: chat });
      }
    })
  },
  List: (req, res, next) => {
    Chat.find({}, (err, chats) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", chats: chats });
      }
    })
  },
  SendMessage: (req, res, next) => {
    const { chatId, senderId, messageContent } = req.body;
    const timestamp = Date.now();
    Chat.findOneAndUpdate({ _id: chatId }, { $push: { messages: { senderId, messageContent, timestamp } } }, { new: true, useFindAndModify: false }, (err, chat) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", chat: chat });
      }
    })
  }
}

module.exports = ChatsController;