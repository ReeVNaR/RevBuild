import React from 'react';
import { motion } from 'framer-motion';

// TypeScript-style props definition
/**
 * @typedef {Object} EditButtonProps
 * @property {boolean} isOpen - Whether the editor is open
 * @property {() => void} onClick - Click handler function
 * @property {{ top: string, left: string }} [position] - Button position
 * @property {string} [size] - Button size
 * @property {{ default: string, active: string }} [colors] - Button colors
 * @property {{ scale: number, duration: number, shadow: string }} [animation] - Animation settings
 */

/**
 * @param {EditButtonProps} props
 */
const EditButton = ({ 
  isOpen, 
  onClick,
  position = { top: '20px', left: '24px' },
  size = '48px',
  colors = {
    default: '#3b82f6',
    active: '#ef4444'
  },
  animation = {
    scale: 1.05,
    duration: 0.2,
    shadow: "0 10px 20px rgba(0,0,0,0.1)"
  }
}) => {
  const buttonStyle = {
    width: size,
    height: size,
    top: position.top,
    left: position.left
  };

  return (
    <motion.button
      style={buttonStyle}
      whileHover={{ scale: animation.scale, boxShadow: animation.shadow }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotate: isOpen ? 180 : 0,
        backgroundColor: isOpen ? colors.active : colors.default
      }}
      transition={{ duration: animation.duration }}
      onClick={onClick}
      className="fixed z-50 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl backdrop-blur-sm bg-opacity-90"
    >
      <motion.svg 
        className="w-5 h-5 text-white"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        animate={{ 
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 1.1 : 1
        }}
      >
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        )}
      </motion.svg>
    </motion.button>
  );
};

export default EditButton;
