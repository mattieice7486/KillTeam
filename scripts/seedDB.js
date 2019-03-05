const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Units collection and inserts the units below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/killteam"
);

const unitSeed = [
  {
    weapon: "boltgun",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "bolt pistol",
    range: 24,
	type: "pistol",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "plasma gun",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "grav-gun",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "frag grenades",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "krak grenades",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "flamer",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "missile launcher",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "heavy bolter",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "astartes shotgun",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "sniper rifle",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "bolt rifle",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "auto bolt rifle",
    range: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "bolt carbine",
    modelType: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "heavy bolt pistol",
    modelType: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  },
  {
    weapon: "shock grenades",
    modelType: 24,
	type: "Rapid Fire",
	strength: 4,
	AP: 1,
	damage: 1,
	abilities: "",
  }
];

db.Unit
  .remove({})
  .then(() => db.Unit.collection.insertMany(unitSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
