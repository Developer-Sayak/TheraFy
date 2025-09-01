const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');
const songRoutes = require("./routes/songRoutes");
const fetch = require("node-fetch");
require('dotenv').config();
const querystring = require("querystring");


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
const redirectUri = "https://therafy.onrender.com/callback"; // MUST MATCH DASHBOARD

// Step 1: Login route (redirect user to Spotify)
app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
      })
  );
});


// Step 2: Callback route (Spotify redirects here after login)
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    console.log("tokens",access_token,refresh_token)

    res.redirect(`http://localhost:5173/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    res.status(400).json({ error: "Failed to get tokens" });
  }
});

// Step 3: Use token to fetch songs
app.get("/api/top-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    res.json(data.items || []); // return only tracks array
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

app.get("/deezer-search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await fetch(`https://api.deezer.com/search?q=${q}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Deezer fetch failed" });
  }
});

app.get("/refresh", async (req, res) => {
  const refreshToken = "AQDFIhJnuA7tTVy5p_3NdyxbgiCeJIa7E2rt-Wf-cOKZjcVeBm4zEFL25sCLWz0dfF5wsi-HD5ty3I5HKBOAF_cD1nX2tqkI7s3okj0KezZMj9tkbK7u3cgykNy7K9DGfKM"; // you should store per-user in DB/session
  
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();
  res.json(data);
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
