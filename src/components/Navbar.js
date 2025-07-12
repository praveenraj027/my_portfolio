import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Listen to scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`
    fixed left-0 w-full z-50 
    transition-all duration-500 ease-in-out 
    ${scrolled
          ? "bg-white/20 text-black shadow-lg top-2 w-[90%] md:w-[50%] left-1/2 translate-x-[-50%] rounded-2xl h-16 py-3 px-5"
          : "bg-gray-200 text-black top-0 w-full h-14 py-2 px-2 translate-x-0 rounded-none"
        }
  `}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >

      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className={`text-3xl font-bold italic cursor-pointer 
            
          `}
          whileHover={{ scale: 1.1 }}
        >
          Portfolio
        </motion.h1>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-6 text-lg font-bold px-10 
          `}>
          <a href="#home" onClick={(e) => handleScrollToSection(e, 'home')} className="cursor-pointer hover:text-gray-400 transition">Home</a>
          <a href="#projects" onClick={(e) => handleScrollToSection(e, 'projects')} className="cursor-pointer hover:text-gray-400 transition">Projects</a>
          <a href="#skills" onClick={(e) => handleScrollToSection(e, 'skills')} className="cursor-pointer hover:text-gray-400 transition">Skills</a>
          <a href="#contact" onClick={(e) => handleScrollToSection(e, 'contact')} className="cursor-pointer hover:text-gray-400 transition">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className={`${scrolled ? "text-white" : "text-black"} md:hidden`}>
          <button
            className="text-3xl font-bold focus:outline-none"
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
          className="absolute top-full left-0 w-full bg-gray-900/40 rounded-2xl mt-2 backdrop-blur-md flex flex-col items-center md:hidden"
        >
          <a href="#home" onClick={(e) => handleScrollToSection(e, 'home')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Home</a>
          <a href="#projects" onClick={(e) => handleScrollToSection(e, 'projects')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Projects</a>
          <a href="#skills" onClick={(e) => handleScrollToSection(e, 'skills')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Skills</a>
          <a href="#contact" onClick={(e) => handleScrollToSection(e, 'contact')} className="block py-2 text-lg text-white hover:text-gray-400 transition">Contact</a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
