import { useState } from "react";

/* eslint-disable react/prop-types */
const MusicList = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null);

  const handlePlay = async (song) => {
    // Stop currently playing
    if (audio) {
      audio.pause();
      setAudio(null);
      setCurrentSong(null);
    }

    // If clicked same song again -> stop
    if (currentSong?.id === song.id) {
      return;
    }

    let previewUrl = song.preview_url;

    // 🔄 Fallback: If Spotify has no preview, search Deezer
    if (!previewUrl) {
      try {
        const query = encodeURIComponent(
          `${song.name} ${song.artists[0]?.name}`
        );
        const res = await fetch(`/deezer-search?q=${query}`);
        const data = await res.json();

        if (data.data?.length > 0) {
          previewUrl = data.data[0].preview; // ✅ Deezer preview
          console.log(`Found Deezer preview for ${song.name}:`, previewUrl);
        }
      } catch (err) {
        console.error("Error fetching Deezer preview:", err);
      }
    }

    // 🎵 Play if we found a preview
    if (previewUrl) {
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      setAudio(newAudio);
      setCurrentSong(song);
    } else {
      alert(`⚠️ No preview available for ${song.name}`);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-purple-800 bg-opacity-40 rounded-xl p-4 shadow-md hover:shadow-lg transition-transform duration-200"
        >
          <img
            src={song.album?.images?.[0]?.url}
            alt={song.name}
            className="rounded-lg w-full h-48 object-cover mb-3"
          />
          <h2 className="text-lg font-semibold truncate">{song.name}</h2>
          <p className="text-sm text-gray-300 truncate">
            {song.artists.map((artist) => artist.name).join(", ")}
          </p>

          {/* ✅ Play button */}
          <button
            onClick={() => handlePlay(song)}
            className="mt-3 bg-green-500 px-3 py-1 rounded-md hover:bg-green-600"
          >
            {currentSong?.id === song.id ? "⏸ Pause" : "▶ Play"}
          </button>

          <a
            href={song.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-green-400 hover:underline"
          >
            Open in Spotify
          </a>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
