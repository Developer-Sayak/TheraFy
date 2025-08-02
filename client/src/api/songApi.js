import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchSongs = async () => {
  const res = await axios.get(`${API_BASE}/songs`);
  console.log("res",res)
  return res.data;
};
