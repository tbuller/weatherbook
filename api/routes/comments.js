const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/", CommentsController.Create);
router.get("/", CommentsController.List);
router.patch("/", CommentsController.Like);
router.patch("/unlike", CommentsController.Unlike);

module.exports = router;