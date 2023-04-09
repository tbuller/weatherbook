const express = require("express");
const router = express.Router();

const PokesController = require("../controllers/pokes");

router.post("/", PokesController.Poke);
router.get("/", PokesController.List);

module.exports = router;