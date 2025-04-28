import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/src/assets/logo.png";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex  justify-between items-center p-5 md:px-10 bg-white text-black fixed w-full top-0 left-0 z-50 shadow-md lg:mb-10">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 font-extrabold text-2xl lg:text-4xl">
        {/* <span>HMS</span> */}
        <img src={Logo} height="200px" width="200px"/>
      </Link>
      {/* Desktop Menu */}
      <div className="hidden  md:flex space-x-10 font-semibold">
        <Link to="/about" className="hover:text-[#3b82f5] transition">About</Link>
        <Link to="/contact" className="hover:text-[#3b82f5] transition">Contact</Link>
        <Link to="/auth/request" className="hover:text-[#3b82f5] transition">Request</Link>
        <Link to="/rules" className="hover:text-[#3b82f5] transition">Rules & Guidelines</Link>
        <Link to="/notices" className="hover:text-[#3b82f5] transition">NoticeBoard</Link>
        <Link
          to="/auth/login"
          className="bg-[#4f46e5]  text-white px-6 py-2 rounded-md font-bold hover:scale-95 transition-all duration-200"
        >
          Login
        </Link>
      </div>

      {/* Hamburger Button */}
      <div className="md:hidden z-50" onClick={() => setMenuOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-[70%] flex flex-col p-8 pt-14 space-y-8 text-xl font-bold text-black shadow-lg transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-5 right-5" onClick={() => setMenuOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-black cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5]">About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5]">Contact</Link>
        <Link to="/auth/request" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5]">Request</Link>
        <Link to="/rules" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5]">Rules & Guidelines</Link>
        <Link to="/notices" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f5]">NoticeBoard</Link>
        <Link
          to="/auth/login"
          onClick={() => setMenuOpen(false)}
          className=" bg-[#3b82f5] text-white px-6 py-2 rounded-md font-bold  "
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export { Navbar };
