import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ brand, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {brand}
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                {item.title}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`w-full h-0.5 bg-gray-600 block transition-all duration-300 ${
                    isOpen && (
                      i === 1 ? 'opacity-0' :
                      i === 0 ? 'rotate-45 translate-y-2.5' :
                      '-rotate-45 -translate-y-2.5'
                    )
                  }`}
                />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'} overflow-hidden`}>
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
