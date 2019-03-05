const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  name: { type: String, required: true },
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
  wargearPts: { type: Number },
  race: { type: String },
  unitType: { type: String },
  wargearOptions: { type: String },
  date: { type: Date, default: Date.now }
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
