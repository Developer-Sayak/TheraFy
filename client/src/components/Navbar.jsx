import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const therafyLogo = "/therafy-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link to="/" className="text-white hover:text-[#10b981] transition">Home</Link>
      <Link to="/library" className="text-white hover:text-[#10b981] transition">Library</Link>
      <Link to="/about" className="text-white hover:text-[#10b981] transition">About</Link>
      <Link to="/search" className="text-white hover:text-[#10b981] transition">Search</Link>
    </>
  );

  return (
    <nav className="bg-[#1e293b] px-6 py-4 flex justify-between items-center shadow-md relative z-50">
      <div className="relative flex items-center space-x-3 group">
        <img
          src={therafyLogo}
          alt="TheraFy Logo"
          className="h-12 w-12 rounded-full border-2 border-[#10b981] bg-white/80 shadow-xl transition-transform duration-700 ease-in-out transform group-hover:scale-110 group-hover:rotate-12"
          style={{ boxShadow: "0 0 12px #10b981, 0 0 35px #f472b6" }}
        />
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#f472b6] bg-clip-text text-transparent">
          TheraFy
        </h1>
      </div>

      <div className="hidden md:flex space-x-8">{navLinks}</div>

      <div className="md:hidden">
        <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X className="h-7 w-7 text-[#10b981]" />
          ) : (
            <Menu className="h-7 w-7 text-[#10b981]" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-20 right-6 bg-[#1e293b] rounded-md shadow-lg flex flex-col space-y-4 px-8 py-6 md:hidden z-40">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
