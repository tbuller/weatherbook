const mongoose = require("mongoose");

const PokeSchema = new mongoose.Schema({
  pokedAt: {type: Date, default: Date.now},
  pokerId: { type: String, required: true },
  pokeeId: { type: String, required: true }
})

const Poke = mongoose.model("Poke", PokeSchema);

module.exports = Poke;