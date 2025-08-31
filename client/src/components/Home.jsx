// components/Home.jsx
import { useState, useEffect } from "react";
import Hero from "./Hero";
import MusicList from "./MusicList";

const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // 1. Grab token from URL if just redirected from Spotify
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("spotify_token", tokenFromUrl);
      // Clean up URL (remove ?token=...)
      window.history.replaceState({}, document.title, "/");
    }

    // 2. Get token from localStorage
    const token = localStorage.getItem("spotify_token");

    // 3. If token exists, fetch top tracks
    if (token) {
      const fetchSongs = async () => {
        try {
          const response = await fetch(
            "https://therafy.onrender.com/api/top-tracks",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const tracks = await response.json();
          console.log("tracks", tracks);
          setSongs(tracks);
        } catch (error) {
          console.error("Failed to fetch songs:", error);
        }
      };

      fetchSongs();
    }
  }, []);

  return (
    <div className="px-4 mt-6">
      <Hero />

      {/* Show login if no token */}
      {!localStorage.getItem("spotify_token") ? (
        <div className="flex items-center justify-center h-screen">
          <a
            href="https://therafy.onrender.com/login"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
          >
            Login with Spotify
          </a>
        </div>
      ) : (
        <div className="px-4 mt-6">
          <h1 className="text-3xl font-bold mb-4">Top Tracks</h1>
          <MusicList songs={songs} />
        </div>
      )}
    </div>
  );
};

export default Home;
