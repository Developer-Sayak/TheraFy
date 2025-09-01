import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NowPlayingBar from "./components/NowPlayingBar";
import SearchSection from "./components/SearchSection";
import LibrarySection from "./components/LibrarySection";
import About from "./components/About";
import Home from "./components/Home";
import MusicList from "./components/MusicList";

const App = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Grab tokens from redirect URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      if (refreshToken) {
        localStorage.setItem("spotify_refresh_token", refreshToken);
      }
      // Clear query params from URL
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Songs:", data);
          setSongs(data.items || []);
        })
        .catch((err) => console.error("Error fetching tracks:", err));
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem("spotify_access_token");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-900 to-black text-white pb-16">
      <Navbar />

      {!isLoggedIn ? (
        <div className="flex items-center justify-center h-screen">
          <a
            href="https://therafy.onrender.com/login"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
          >
            Login with Spotify
          </a>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<LibrarySection />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchSection />} />
          </Routes>

          {/* ✅ Show top tracks on home page */}
          <div className="px-4 mt-6">
            <h1 className="text-3xl font-bold mb-4">🎵 Your Top Tracks</h1>
            <MusicList songs={songs} />
          </div>
        </>
      )}

      <NowPlayingBar />
    </div>
  );
};

export default App;
