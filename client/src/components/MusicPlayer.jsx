import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const MusicPlayer = ({ currentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  }, [currentSong]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-6 py-4 shadow-2xl z-50 rounded-t-2xl">
      {currentSong ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-4 w-full md:w-1/3">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              className="w-14 h-14 rounded-lg object-cover shadow-md"
            />
            <div>
              <p className="text-lg font-semibold truncate">{currentSong.title}</p>
              <p className="text-sm text-gray-400">{currentSong.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 w-full md:w-1/3">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-all"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
            <Volume2 size={20} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-600 rounded-lg cursor-pointer accent-green-400"
            />
          </div>

          <audio ref={audioRef} className="hidden">
            <source src={currentSong.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        <p className="text-center text-gray-400">Select a song to play</p>
      )}
    </div>
  );
};

export default MusicPlayer;
