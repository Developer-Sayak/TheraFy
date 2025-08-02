import { useEffect, useState } from "react";

const useTopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTracks = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/top-tracks");
      const data = await res.json();
      console.log("songs -- > ",data)
      setTracks(data);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return { tracks, loading };
};

export default useTopTracks;
