import React, { useEffect} from "react";
import { motion } from "framer-motion";
import './portfolio.css';
import lottie from "lottie-web";
// import praveen from './praveen.jpg';

const Portfolio = () => {

  const lottieRef = React.useRef(null);
  useEffect(() => {
    fetch('https://lottie.host/a20a6d70-7fcf-4e70-9a79-f8738353a58b/UkjBzxLVJV.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Lottie JSON file not found: ${'https://lottie.host/a7fdaf42-64a7-4195-a375-3723038d143e/BtF5QQqjaN.json'}`);
        }
        return res.json();
      })
      .then((data) => {
        lottie.loadAnimation({
          container: lottieRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data, // Use fetched JSON data
        });
      })
      .catch((error) => console.error("Error loading Lottie animation:", error));

    return () => lottie.destroy();
  }, []);
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
          <div className="relative flex justify-center items-center w-1/2 image-div" >
            {/* <img src={praveen} className="rounded-3xl h-96 w-72 z-10" alt="profile" />
            <div className="absolute bg-white h-96 w-72 rounded-3xl z-20 opacity-40 flex justify-center items-center text-black">
            </div> */}
            <div className="h-[20rem] lottie-image" ref={lottieRef}>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Portfolio;
