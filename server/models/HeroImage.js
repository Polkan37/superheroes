const mongoose = require("mongoose");

const heroImageSchema = new mongoose.Schema({
  link: String,
  hero_id: mongoose.Schema.Types.ObjectId,
});

const HeroImage = mongoose.model("HeroImage", heroImageSchema);

module.exports = {
  HeroImage,
};
