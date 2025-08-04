// /src/api/searchSongs.js
export const searchSongs = async (query) => {
  try {
    const res = await fetch(`http://localhost:3001/api/genius/search?q=${query}`);
    const songs = await res.json();
    console.log("songs-->",songs)
    console.log(songs)
    return songs;
  } catch (error) {
    console.error("Error fetching Genius songs:", error);
    return [];
  }
};
