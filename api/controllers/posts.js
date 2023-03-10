const Post = require("../models/post");

const PostsController = {
  Create: (req, res, next) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        res.status(401).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", post: post });
      }
    })
  }
}

module.exports = PostsController;