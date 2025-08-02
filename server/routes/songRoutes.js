// server/routes/songRoutes.js
const express = require("express");
const router = express.Router();
const Song = require("../models/songModel");

router.get("/", async (req, res) => {
  console.log("GET /songs called"); // check if route is hit

  try {
    const songs = await Song.find();
    console.log("Songs fetched:", songs); // check if songs are returned
    res.json(songs);
  } catch (err) {
    console.error("❌ Error fetching songs:", err.message); // print exact error
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
