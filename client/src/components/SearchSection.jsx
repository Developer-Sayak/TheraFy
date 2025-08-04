import { useEffect, useState, useRef } from "react";
import { searchSongs } from "../api/searchSongs";

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const data = await searchSongs(query);
    setLoading(false);
    if (Array.isArray(data)) {
      setResults(data);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        handleSearch();
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handlePlay = (previewUrl) => {
    if (selectedPreview === previewUrl && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setSelectedPreview(previewUrl);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedPreview, isPlaying]);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </form>

      {loading ? (
        <div className="text-center text-gray-500">Loading songs...</div>
      ) : (
        <div className="space-y-4">
          {results.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 text-white rounded-lg p-4 flex items-center gap-4"
            >
              {song.albumArt && (
                <img
                  src={song.albumArt}
                  alt={song.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
              )}
              <div className="flex-1">
                <p className="text-lg font-bold">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
                <a
                  href={song.lyricsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  View Lyrics →
                </a>
              </div>
              {song.preview && (
                <button
                  onClick={() => handlePlay(song.preview)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  {selectedPreview === song.preview && isPlaying ? "Pause" : "Play"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedPreview && (
        <div className="mt-6">
          <audio ref={audioRef} src={selectedPreview} controls className="w-full" />
        </div>
      )}
    </div>
  );
};

export default SearchSection;
