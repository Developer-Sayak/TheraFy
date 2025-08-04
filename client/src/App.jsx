
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NowPlayingBar from "./components/NowPlayingBar";
import SearchSection from "./components/SearchSection"; // Create this component
import Library from "./components/Library"; // Create this too
import About from "./components/About"; // Optional About page
import Home from "./components/Home"; // Create a Home.jsx for home page
import LibrarySection from "./components/LibrarySection";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-900 to-black text-white pb-16">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<LibrarySection />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchSection />} />
      </Routes>
      <NowPlayingBar />
    </div>
  );
};

export default App;



