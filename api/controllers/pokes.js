const Poke = require("../models/poke");

const PokesController = {
  List: (req, res, next) => {
    Poke.find({}, (err, pokes) => {
      if (err) {
        res.status(400).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", pokes: pokes });
      }
    })
  }
}

module.exports = PokesController;