// components/MusicList.jsx
import { usePlayer } from '../context/PlayerContext';

const MusicList = ({ songs }) => {
  const { setCurrentSong, setIsPlaying } = usePlayer();

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {songs.map((song) => (
        <div
          key={song.id}
          className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 cursor-pointer transition"
          onClick={() => handlePlay(song)}
        >
          <img src={song.image} alt={song.title} className="rounded-xl mb-2" />
          <div className="text-white font-bold">{song.title}</div>
          <div className="text-sm text-gray-300">{song.artist}</div>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
