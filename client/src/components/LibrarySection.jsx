import { useLibrary } from "../context/PlayerContext";

const LibrarySection = () => {
  const { library, removeFromLibrary } = useLibrary();

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Library</h2>
      {library.length > 0 ? (
        library.map((song) => (
          <div
            key={song.id}
            className="bg-gray-700 text-white rounded-lg p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{song.title}</p>
              <p className="text-sm text-gray-300">{song.artist.name}</p>
            </div>
            <button
              onClick={() => removeFromLibrary(song.id)}
              className="text-red-400 hover:underline"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No songs in your library.</p>
      )}
    </div>
  );
};

export default LibrarySection;
