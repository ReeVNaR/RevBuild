import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ name, title }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4"
      >
        <motion.h1 
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hi, I'm {name}
        </motion.h1>
        <motion.p 
          className="text-2xl mb-8 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.p>
        <motion.button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get In Touch
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
