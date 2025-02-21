import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50,
        behavior: "smooth",
      });
    }
    setIsOpen(false); // Close menu on selection
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-gray-200 text-white p-2 shadow-lg z-50 h-14"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-3xl font-bold italic cursor-pointer text-black "
          whileHover={{ scale: 1.1 }}
        >
          Portfolio
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg font-bold px-10 text-black">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="cursor-pointer hover:text-gray-400 transition">Home</a>
          <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="cursor-pointer hover:text-gray-400 transition">Projects</a>
          <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="cursor-pointer hover:text-gray-400 transition">Skills</a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="cursor-pointer hover:text-gray-400 transition">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-black">
          <button
            className="text-3xl font-bold text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-full bg-gray-950 flex flex-col items-center md:hidden"
        >
          <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Home</a>
          <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Projects</a>
          <a href="#skills" onClick={(e) => handleScroll(e, 'skills')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Skills</a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Contact</a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
