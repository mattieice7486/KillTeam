const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  name: { type: String, required: true },
  unitType: { type: String },
  race: { type: String },
  equipment: String,
  move: { type: Number },
  ws: { type: Number },
  bs: { type: Number },
  str: { type: Number },
  tough: { type: Number },
  wounds: { type: Number },
  att: { type: Number },
  ld: { type: Number },
  sv: { type: Number },
  pts: { type: Number },
  selectedOption: { type: String },
  selectedOption2: { type: String },
  date: { type: Date, default: Date.now }
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
