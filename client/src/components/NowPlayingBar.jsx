// components/NowPlayingBar.jsx
import { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';

const NowPlayingBar = () => {
  const { currentSong, isPlaying } = usePlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentSong, isPlaying]);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex items-center justify-between px-4 py-2 shadow-lg">
      <div className="flex items-center gap-4">
        <img src={currentSong.image} alt="cover" className="w-12 h-12 rounded" />
        <div>
          <div className="font-semibold">{currentSong.title}</div>
          <div className="text-sm text-gray-300">{currentSong.artist}</div>
        </div>
      </div>
      <audio ref={audioRef} controls className="w-72">
        <source src={currentSong.preview_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default NowPlayingBar;
