const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');
const songRoutes = require("./routes/songRoutes");
const fetch = require("node-fetch");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://sayakpradhan456:sayakpradhan456@cluster0.mbk14op.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// DB Connection
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("DB Error:", err));

// Routes

app.get("/api/top-tracks", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/chart/0/tracks");
    const data = await response.json();
    // console.log("data==",data)

    const transformed = data.data.map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.artist?.name,
      album: track.album?.title,
      image: track.album?.cover_medium,
      preview_url: track.preview,
      duration: track.duration,
    }));

    res.json(transformed);
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

app.get('/api/genius/search', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
      },
    });

    const hits = response.data.response.hits.map((hit) => {
      const song = hit.result;
      return {
        id: song.id,
        title: song.title,
        artist: song.primary_artist.name,
        albumArt: song.song_art_image_thumbnail_url,
        lyricsUrl: song.url,
      };
    });

    res.json(hits);
  } catch (error) {
    console.error('Error fetching Genius data:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Genius' });
  }
});



// Start Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
