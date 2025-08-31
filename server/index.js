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

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "https://myspotifyapp.loca.lt/callback";


// Step 1: Redirect user to Spotify login
app.get("/login", (req, res) => {
   const scope = "user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
      }).toString()
  );
});

// Step 2: Spotify redirects back with a code
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

   const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  const accessToken = data.access_token;

  // Save the token in session, db, or pass to frontend
  res.redirect(`http://localhost:5173/dashboard?token=${accessToken}`);
});

// Step 3: Use token to fetch songs
app.get("/api/top-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const result = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await result.json();

  res.json(
    data.items?.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      album: track.album.name,
      image: track.album.images?.[0]?.url,
      preview_url: track.preview_url,
    })) || []
  );
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
