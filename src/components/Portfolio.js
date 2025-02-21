// import React, { useState } from "react";
import { motion } from "framer-motion";
import './portfolio.css';
// import praveen from './praveen.jpg';

const Portfolio = () => {

  return (
    <div className="min-h-screen text-white " id="home">
      {/* Main Content */}
      <div className="p-10 main-div">
        <div className="h-[100vh] flex hero-container">
          {/* Hero Section */}
          <div className="w-1/2 h-full flex flex-col justify-center pl-32 hero-text">
            {/* Heading Section */}
            <motion.h1
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="text-7xl praveen-h1 font-extrabold text-white drop-shadow-lg mb-10 hero-title"
            >
              <motion.p
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="py-2"
              >
                Hi,
              </motion.p>

              <motion.p
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="py-2"
              >
                I'm Praveen Rajak
              </motion.p>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl font-serif italic mt-4 text-blue-200 hero-subtitle"
            >
              I'm Praveen Rajak, a passionate Computer Science Engineering student specializing in AI and Machine Learning. I'm also an aspiring Frontend Developer with experience in HTML, CSS, JavaScript, and React.js.
            </motion.p>
          </div>
          <div className="relative flex justify-center items-center w-1/2">
            {/* <img src={praveen} className="rounded-3xl h-96 w-72 z-10" alt="profile" />
            <div className="absolute bg-white h-96 w-72 rounded-3xl z-20 opacity-40 flex justify-center items-center text-black">
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Portfolio;
