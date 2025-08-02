// App.jsx
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicList from './components/MusicList';
import NowPlayingBar from './components/NowPlayingBar';

const App = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/top-tracks");
        const data = await res.json();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-900 to-black text-white pb-16">
      <Navbar />
      <Hero />
      <div className="px-4 mt-6">
        <h1 className="text-3xl font-bold mb-4">Top Tracks</h1>
        <MusicList songs={songs} />
      </div>
      <NowPlayingBar />
    </div>
  );
};

export default App;
