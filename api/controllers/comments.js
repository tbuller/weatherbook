const Comment = require("../models/comment");

const CommentsController = {
  Create: (req, res, next) => {
    const comment = new Comment(req.body);
    comment.save((err) => {
      if (err) {
        res.status(401).json({ message: "server error", req: req.body });
      } else {
        res.status(200).json({ message: "OK", comment: comment })
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
  },
  Like: (req, res, next) => {
    const { likerId, commentId } = req.body
    Comment.findOneAndUpdate({ _id: commentId, likes: { $nin: [likerId] } }, { $addToSet: { likes: likerId } }, { new: true }, (err, comment) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", comment: comment });
      }
    })
  },
  Unlike: (req, res, next) => {
    const { likerId, commentId } = req.body;
    Comment.findOneAndUpdate({ _id: commentId }, { $pull: { likes: likerId } }, { new: true }, (err, comment) => {
      if (err) {
        res.status(400).json({ messahe: "error" });
      } else {
        res.status(200).json({ message: "OK", comment: comment });
      }
    })
  }
}

module.exports = CommentsController;