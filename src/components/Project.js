import React, { useState } from "react";
import { motion } from "framer-motion";
import './portfolio.css';

const Projects = () => {
    const [flipped, setFlipped] = useState(null); // Track flipped project

    const handleFlip = (project) => {
        setFlipped(flipped === project ? null : project); // Toggle flip state
    };

    return (
        <div className="min-h-screen text-white flex flex-col items-center p-2 projects-container" id="projects">
            <h2 className="text-5xl font-bold mb-16 projects-title">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-[60rem] projects-grid justify-center">
                {/* AlgoVisualizer */}
                <div className="flip-container relative max-w-[28rem] min-h-[16rem]">
                    <motion.div
                        animate={{ rotateY: flipped === "algo" ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="flip-card relative w-full h-full"
                    >
                        {/* Front Side */}
                        <div className="front-side absolute w-full h-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly hover:bg-gray-900">
                            <h3 className="text-4xl font-bold text-white font-serif project-title">AlgoVisualizer</h3>
                            <div className="flex gap-2 button-group">
                                <button
                                    onClick={() => handleFlip("algo")}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition mt-4 w-40 view-desc"
                                >
                                    View Description
                                </button>
                                <button className="bg-gray-600 project-button text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-4 w-40">
                                    <a href="https://algovisualizer.pythonanywhere.com">View Project</a>
                                </button>
                            </div>
                        </div>

                        {/* Back Side */}
                        <div className="back-side absolute w-full h-full bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly transform rotateY-180">
                            <p className="text-gray-300 mb-4 project-description"><b>AlgoVisualizer</b>  is a Vanilla JavaScript project that visually demonstrates sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort, making algorithm learning interactive and intuitive.</p>
                            <button
                                onClick={() => handleFlip("algo")}
                                className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                            >
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* SkillSync */}
                <div className="flip-container relative max-w-[28rem] min-h-[16rem]">
                    <motion.div
                        animate={{ rotateY: flipped === "skillsync" ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="flip-card relative w-full h-full"
                    >
                        {/* Front Side */}
                        <div className="front-side absolute w-full h-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly hover:bg-gray-900">
                            <h3 className="text-4xl font-bold text-white font-serif project-title">SkillSync</h3>
                            <div className="flex gap-2 button-group">
                                <button
                                    onClick={() => handleFlip("skillsync")}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition mt-4 w-40 view-desc"
                                >
                                    View Description
                                </button>
                                <button className="bg-gray-600 project-button text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-4 w-40">
                                    <a href="/">View Project</a>
                                </button>
                            </div>
                        </div>

                        {/* Back Side */}
                        <div className="back-side absolute w-full h-full bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly transform rotateY-180">
                            <p className="text-gray-300 mb-4 project-description"><b> SkillSync</b> is a React-based platform that connects developers based on their skills, enabling seamless collaboration and networking.</p>
                            <button
                                onClick={() => handleFlip("skillsync")}
                                className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                            >
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>
                {/* Weather App */}
                <div className="flip-container relative max-w-[28rem] min-h-[16rem]">
                    <motion.div
                        animate={{ rotateY: flipped === "weather_app" ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="flip-card relative w-full h-full"
                    >
                        {/* Front Side */}
                        <div className="front-side absolute w-full h-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly hover:bg-gray-900">
                            <h3 className="text-4xl font-bold text-white font-serif project-title">Weather App</h3>
                            <div className="flex gap-2 button-group">
                                <button
                                    onClick={() => handleFlip("weather_app")}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition mt-4 w-40 view-desc"
                                >
                                    View Description
                                </button>
                                <button className="bg-gray-600 project-button text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-4 w-40">
                                    <a href="https://github.com/praveenraj027/Weather-App">View Project</a>
                                </button>
                            </div>
                        </div>

                        {/* Back Side */}
                        <div className="back-side absolute w-full h-full bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly transform rotateY-180">
                            <p className="text-gray-300 mb-4 project-description">This <b>Weather App</b> provides real-time weather updates using the OpenWeather API, delivering accurate temperature, humidity, wind speed, and other weather details for any location.</p>
                            <button
                                onClick={() => handleFlip("weather_app")}
                                className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                            >
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>
                {/* ArtSpot */}
                <div className="flip-container relative max-w-[28rem] min-h-[16rem]">
                    <motion.div
                        animate={{ rotateY: flipped === "artspot" ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="flip-card relative w-full h-full"
                    >
                        {/* Front Side */}
                        <div className="front-side absolute w-full h-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly hover:bg-gray-900">
                            <h3 className="text-4xl font-bold text-white font-serif project-title">ArtSpot</h3>
                            <div className="flex gap-2 button-group">
                                <button
                                    onClick={() => handleFlip("artspot")}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition mt-4 w-40 view-desc"
                                >
                                    View Description
                                </button>
                                <button className="bg-gray-600 project-button text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-4 w-40">
                                    <a href="/">View Project</a>
                                </button>
                            </div>
                        </div>

                        {/* Back Side */}
                        <div className="back-side absolute w-full h-full bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly transform rotateY-180">
                            <p className="text-gray-300 mb-4 project-description"><b>ArtSpot </b> is a Vanilla JavaScript-based community platform where artists can showcase their work, connect, and collaborate with fellow creatives.</p>
                            <button
                                onClick={() => handleFlip("artspot")}
                                className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                            >
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>
                {/* Quiz Game */}
                <div className="flip-container relative max-w-[28rem] min-h-[16rem]">
                    <motion.div
                        animate={{ rotateY: flipped === "quiz_game" ? 180 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="flip-card relative w-full h-full"
                    >
                        {/* Front Side */}
                        <div className="front-side absolute w-full h-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly hover:bg-gray-900">
                            <h3 className="text-4xl font-bold text-white font-serif project-title">Quiz Game</h3>
                            <div className="flex gap-2 button-group">
                                <button
                                    onClick={() => handleFlip("quiz_game")}
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition mt-4 w-40 view-desc"
                                >
                                    View Description
                                </button>
                                <button className="bg-gray-600 project-button text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition mt-4 w-40">
                                    <a href="https://quiz-game-p1pn.onrender.com/">View Project</a>
                                </button>
                            </div>
                        </div>

                        {/* Back Side */}
                        <div className="back-side absolute w-full h-full bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center justify-evenly transform rotateY-180">
                            <p className="text-gray-300 mb-4 project-description"><b>Quiz Game </b> is an engaging trivia app built with React.js, offering multiple-choice questions and instant feedback to test your knowledge in a fun way.</p>
                            <button
                                onClick={() => handleFlip("quiz_game")}
                                className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                            >
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
