const Post = require("../models/post");

const PostsController = {
  Create: (req, res, next) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        res.status(401).json({ message: "server error", err: err });
      } else {
        res.status(200).json({ message: "OK", post: post });
      }
    })
  },
  List: (req, res, next) => {
    Post.find({}, (err, posts) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", posts: posts });
      }
    })
  }
}

module.exports = PostsController;