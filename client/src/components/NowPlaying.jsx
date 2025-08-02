// src/components/NowPlaying.jsx
const NowPlaying = () => {
  return (
    <div className="p-4 bg-[#1e293b] rounded-lg text-center">
      <h3 className="text-xl font-semibold text-white mb-3">Now Playing</h3>
      <div className="bg-[#0f172a] p-4 rounded-lg">
        <p className="text-white">No track playing</p>
      </div>
    </div>
  );
};

export default NowPlaying;
