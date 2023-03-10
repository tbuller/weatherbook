const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.post("/", PostsController.Create);
router.get("/", PostsController.List);

module.exports = router;