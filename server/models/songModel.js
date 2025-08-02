// models/songModel.js
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audioUrl: { type: String, required: true },
  coverImage: { type: String, required: true }
});

module.exports = mongoose.model("Song", songSchema);
