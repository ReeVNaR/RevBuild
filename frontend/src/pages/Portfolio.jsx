import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import EditButton from '../components/EditButton';
import { defaultContent } from '../data/defaultContent';

const Portfolio = () => {
  const previewRef = useRef(null);
  const [content, setContent] = useState(defaultContent);
  const [showEditor, setShowEditor] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const downloadHTML = () => {
    if (!previewRef.current) return;
    
    const previewContent = previewRef.current.innerHTML;
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${content.hero.name} - Portfolio</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            html { scroll-behavior: smooth; }
            .nav-sticky {
              position: sticky;
              top: 0;
              z-index: 50;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(8px);
            }
          </style>
        </head>
        <body class="min-h-screen bg-gray-50">
          ${previewContent}
          <script>
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
                });
              });
            });
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([htmlTemplate], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderEditor = () => {
    return (
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ 
          x: showEditor ? 0 : '-100%',
          boxShadow: showEditor ? "0 0 40px rgba(0,0,0,0.1)" : "none"
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="fixed left-0 top-0 h-full w-96 bg-white/90 backdrop-blur-lg z-50 overflow-y-auto border-r border-gray-200/50"
      >
        <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edit Content
          </h2>
          <div className="mt-6 space-y-2">
            {Object.keys(content).map((section) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === section 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'hover:bg-gray-100'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {activeSection === 'hero' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={content.hero.name}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, name: e.target.value }
                    })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, title: e.target.value }
                    })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Your Title"
                  />
                </div>
              </motion.div>
            )}
            {/* Add similar styling for other sections */}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
      {renderEditor()}
      <EditButton 
        isOpen={showEditor} 
        onClick={() => setShowEditor(!showEditor)}
        position={{ top: '24px', left: '24px' }}
        size="52px"
        colors={{
          default: '#4f46e5',
          active: '#dc2626'
        }}
        animation={{
          scale: 1.1,
          duration: 0.3,
          shadow: "0 15px 25px rgba(0,0,0,0.15)"
        }}
      />
      <div 
        className={`min-h-screen ${showEditor ? 'ml-96' : ''} transition-all duration-300`} 
        ref={previewRef}
      >
        <nav className="nav-sticky backdrop-blur-lg bg-white/70 border-b border-gray-200/50">
          <Navbar brand={content.navbar.logo} items={content.navbar.items} />
        </nav>
        <main>
          <div id="home" className="snap-start min-h-screen relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0" />
            <div className="relative z-10 pt-16">
              <Hero name={content.hero.name} title={content.hero.title} />
            </div>
          </div>
          <div id="about" className="snap-start min-h-screen bg-white pt-16">
            <About description={content.about.description} />
          </div>
          <div id="skills" className="snap-start min-h-screen bg-gray-50 pt-16">
            <Skills skills={content.skills} />
          </div>
          <div id="projects" className="snap-start min-h-screen bg-white pt-16">
            <Projects projects={content.projects} />
          </div>
          <div id="contact" className="snap-start min-h-screen bg-gray-50 pt-16">
            <Contact email={content.contact.email} message={content.contact.message} />
          </div>
        </main>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadHTML}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export HTML</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;
