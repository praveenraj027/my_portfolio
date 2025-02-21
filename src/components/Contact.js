import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:praveerajak0506@gmail.com?subject=Message from ${formData.name}&body=${formData.message} (${formData.email})`;
    };

    return (
        <motion.div
            className="min-h-screen text-white text-center pt-20 px-4"
            id='contact'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2
                className="text-4xl md:text-5xl font-bold mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Get in Touch
            </motion.h2>
            
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 pt-10'>
                <div className='w-full md:w-1/2 text-center'>
                    <motion.p
                        className="text-xl md:text-2xl mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        Feel free to reach out to me through any of the platforms below!
                    </motion.p>
                    
                    <div className="flex justify-center gap-6 text-3xl md:text-4xl mb-8">
                        {[  
                            { icon: <FaGithub />, link: "https://github.com/praveenraj027" },
                            { icon: <FaLinkedin />, link: "https://linkedin.com/in/praveen-rajak" },
                            { icon: <FaInstagram />, link: "https://instagram.com/praveen_raj027" },
                            { icon: <FaEnvelope />, link: "mailto:praveenrajak0506@gmail.com" }
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-400 transition"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md text-gray-800 max-w-md mx-auto">
                        <h3 className="text-2xl font-bold mb-2">Want a Stunning Portfolio at just Rs.2999/- ?</h3>
                        <p className="text-lg mb-4">I can create a professional and personalized portfolio website for you! Let's make your online presence stand out.</p>
                        <button className='bg-gray-900 text-white px-4 py-2 rounded-lg font-bold'>Contact me &rarr;</button>
                    </div>
                </div>
                
                <div className='w-full md:w-1/2 px-4 py-8'>
                    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto m-h-[20rem]">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none"
                            rows="4"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition mt-5"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
