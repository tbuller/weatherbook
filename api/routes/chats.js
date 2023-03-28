const express = require("express");
const router = express.Router();

const ChatsController = require("../controllers/chats");

router.post("/", ChatsController.Create);
router.get("/", ChatsController.List);

module.exports = router;