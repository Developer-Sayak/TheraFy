// src/components/Hero.jsx
const Hero = () => {
  return (
    <div className="text-center py-16 bg-gradient-to-br from-[#1e293b] to-[#0f172a]">
      <h2 className="text-4xl font-bold text-white mb-4">Welcome to TheraFy</h2>
      <p className="text-lg text-gray-300 mb-6">Ad-Free. Global. Music for your soul.</p>
      <button className="bg-[#10b981] hover:bg-green-500 text-black font-semibold py-2 px-5 rounded-lg">
        Explore Music
      </button>
    </div>
  );
};

export default Hero;
