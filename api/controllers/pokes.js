const Poke = require("../models/poke");

const PokesController = {
  List: (req, res, next) => {
    Poke.find({}, (err, pokes) => {
      if (err) {
        res.status(400).json({ message: "server error" });
        console.log(req.body);
      } else {
        res.status(200).json({ message: "OK", pokes: pokes });
      }
    })
  },
  Poke: (req, res, next) => {
    const poke = new Poke(req.body);
    poke.save((err) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
        res.status(200).json({ message: "OK", poke: poke });
      }
    })
  }
}

module.exports = PokesController;