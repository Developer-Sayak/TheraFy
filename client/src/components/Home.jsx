// components/Home.jsx
import { useState, useEffect } from "react";
import Hero from "./Hero"
import MusicList from "./MusicList";


const Home = () => {
    const [songs, setSongs] = useState([]);
    
      useEffect(() => {
        const fetchSongs = async () => {
          try {
            const res = await fetch("http://localhost:3001/api/top-tracks");
            const data = await res.json();
            // console.log("data-->",data)
            setSongs(data);
          } catch (error) {
            console.error("Failed to fetch songs:", error);
          }
        };
    
        fetchSongs();
      }, []);
    return (
  <div className="px-4 mt-6">
    <Hero />
    <div className="px-4 mt-6">
        <h1 className="text-3xl font-bold mb-4">Top Tracks</h1>
        <MusicList songs={songs} />
      </div>
  </div>
)};

export default Home;
