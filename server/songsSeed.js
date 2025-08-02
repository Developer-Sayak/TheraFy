const mongoose = require("mongoose");
const Song = require("./models/songModel");

mongoose.connect("mongodb+srv://sayakpradhan456:sayakpradhan456@cluster0.mbk14op.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const songs = [
  {
    title: "Ocean Dreams",
    artist: "AquaFlow",
    album: "Zen Collection",
    audioUrl: "https://example.com/ocean.mp3",
    coverImage: "https://example.com/ocean.jpg",
    genre: "Chill",
  },
  {
    title: "Sky High",
    artist: "FlyBeat",
    album: "Altitude",
    audioUrl: "https://example.com/sky.mp3",
    coverImage: "https://example.com/sky.jpg",
    genre: "Pop",
  }
];

Song.insertMany(songs)
  .then(() => {
    console.log("Sample songs added");
    mongoose.disconnect();
  });
