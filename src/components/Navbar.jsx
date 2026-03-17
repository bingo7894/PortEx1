import { useState, useEffect } from "react";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar relative z-50 py-6 flex items-center justify-between px-6 md:px-12">
      {/* Logo */}
      <div className="logo cursor-pointer z-50">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent p-1">
          Pokpong<span className="text-yellow-400">.</span>
        </h1>
      </div>

      {/* Menu (Floating Pill Style on Mobile) */}
      <ul
        className={`flex items-center sm:gap-8 gap-6 
          md:static fixed left-1/2 -translate-x-1/2 md:translate-x-0 
          md:opacity-100 bg-black/60 backdrop-blur-xl border-2 border-yellow-500/40 shadow-2xl shadow-yellow-500/20
          md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none
          px-8 py-3 rounded-full 
          transition-all duration-300 md:transition-none z-40
          ${active ? "top-4 opacity-100" : "-top-20 opacity-0"}`}
      >
        <li>
          <a
            href="#home"
            className="text-sm md:text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-sm md:text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#project"
            className="text-sm md:text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-sm md:text-base font-medium text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
