const Comment = require("../models/comment");

const CommentsController = {
  Create: (req, res, next) => {
    const comment = new Comment(req.body);
    comment.save((err) => {
      if (err) {
        res.status(401).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK" })
      }
    })
  },
  List: (req, res ,next) => {
    Comment.find({}, (err, comments) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", comments: comments });
      }
    })
  }
}

module.exports = CommentsController;