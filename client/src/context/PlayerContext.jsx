import { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [library, setLibrary] = useState([]);

  const addToLibrary = (song) => {
    if (!library.some(item => item.id === song.id)) {
      setLibrary(prev => [...prev, song]);
    }
  };

  const removeFromLibrary = (songId) => {
    setLibrary(prev => prev.filter(song => song.id !== songId));
  };

  return (
    <PlayerContext.Provider value={{
      currentSong,
      setCurrentSong,
      isPlaying,
      setIsPlaying,
      library,
      addToLibrary,
      removeFromLibrary
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
export const useLibrary = () => {
  const { library, addToLibrary, removeFromLibrary } = useContext(PlayerContext);
  return { library, addToLibrary, removeFromLibrary };
};
