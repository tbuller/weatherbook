const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.List);
router.post("/", UsersController.Create);
router.patch("/", UsersController.Modify);
router.patch("/request", UsersController.Request);
router.patch("/acceptrequest", UsersController.AcceptRequest);

module.exports = router;