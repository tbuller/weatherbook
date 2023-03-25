const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const UsersController = require("../controllers/users");

router.get("/", UsersController.List);
router.post("/", UsersController.Create);
router.patch("/", UsersController.Modify);
router.patch("/request", UsersController.Request);
router.patch("/acceptrequest", UsersController.AcceptRequest);
router.patch("/uploadphoto", fileUpload(), UsersController.UploadPhoto);

module.exports = router;