import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss} from "react-icons/si";

const Skill = () => {
  return (
    <div className="text-white min-h-screen py-10" id="skills">
      <h2 className="text-5xl font-bold text-center text-gray-300">Skills</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20 px-10 skill-div">
        
        {/* HTML Skill */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl text-center shadow-lg skill-name  transition min-h-60"
        >
          <FaHtml5 className="text-5xl text-orange-500 mb-3" />
          <h3 className="text-2xl font-semibold">HTML</h3>
          <p className="text-gray-300 text-sm mt-2">Markup language for web pages.</p>
        </motion.div>

        {/* CSS Skill */}
        <motion.div 
           className="bg-gray-800 p-6 rounded-xl text-center shadow-lg  skill-name transition min-h-60"
        >
          <FaCss3Alt className="text-5xl text-blue-500 mb-3" />
          <h3 className="text-2xl font-semibold">CSS</h3>
          <p className="text-gray-300 text-sm mt-2">Stylesheet for web design.</p>
        </motion.div>

        {/* JavaScript Skill */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl text-center shadow-lg  skill-name transition min-h-60"
        >
          <FaJs className="text-5xl text-yellow-400 mb-3" />
          <h3 className="text-2xl font-semibold">JavaScript</h3>
          <p className="text-gray-300 text-sm mt-2">For dynamic web interactions.</p>
        </motion.div>

        {/* React Skill */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl text-center shadow-lg  skill-name transition min-h-60"
        >
          <FaReact className="text-5xl text-blue-400 mb-3" />
          <h3 className="text-2xl font-semibold">React</h3>
          <p className="text-gray-300 text-sm mt-2">Library for UI components.</p>
        </motion.div>

        {/* Tailwind CSS Skill */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl text-center shadow-lg  skill-name transition min-h-60"
        >
          <SiTailwindcss className="text-5xl text-teal-400 mb-3" />
          <h3 className="text-2xl font-semibold">Tailwind CSS</h3>
          <p className="text-gray-300 text-sm mt-2">Utility-first CSS framework.</p>
        </motion.div>

        {/* Node.js Skill */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl text-center shadow-lg skill-name  transition min-h-60"
        >
          <FaNodeJs className="text-5xl text-green-500 mb-3" />
          <h3 className="text-2xl font-semibold">Node.js</h3>
          <p className="text-gray-300 text-sm mt-2">Backend JavaScript runtime.</p>
        </motion.div>

      </div>
    </div>
  );
};

export default Skill;
