import React, { useState } from 'react';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ContactSection from '../components/portfolio/ContactSection';
import PreviewSection from '../components/portfolio/PreviewSection';
import { generatePortfolioHTML } from '../components/portfolio/GeneratePortfolioHTML';
import NavbarSection from '../components/portfolio/NavbarSection';

const PortfolioBuilder = () => {
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    about: '',
    contact: {
      email: '',
      github: '',
      linkedin: '',
      website: ''
    },
    skills: {
      technical: [],
      tools: [],
      frameworks: [],
      languages: []
    },
    navbar: {
      logo: '',
      backgroundColor: '#FFFFFF'
    },
    hero: {
      backgroundImage: '',
      overlayOpacity: 0.3,
      textColor: '#FFFFFF',
      subtitleColor: '#E5E7EB'
    },
    theme: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
      text: '#111827',
      background: '#FFFFFF'
    }
  });

  const [viewportSettings, setViewportSettings] = useState({
    width: '100%',
    height: '100%'
  });

  const [sectionSizes, setSectionSizes] = useState({
    hero: {
      padding: '4rem',
      height: '100vh',
      fontSize: '3rem',
      backgroundColor: '#1E40AF'
    },
    about: {
      padding: '4rem',
      maxWidth: '100%',
      fontSize: '1.125rem',
      backgroundColor: '#FFFFFF'
    },
    skills: {
      padding: '4rem',
      columns: '2',
      gap: '2rem',
      backgroundColor: '#F3F4F6'
    },
    contact: {
      padding: '4rem',
      maxWidth: '100%',
      fontSize: '1.125rem',
      backgroundColor: '#FFFFFF'
    },
    navbar: {
      padding: '1rem',
      height: '4rem',
      backgroundColor: '#FFFFFF'
    }
  });

  const [openSection, setOpenSection] = useState('hero'); // Add this new state

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setPortfolioData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value
        }
      }));
    } else {
      setPortfolioData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSectionSizeChange = (section, property, value, unit = '') => {
    setSectionSizes(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [property]: `${value}${unit}`
      }
    }));
  };

  const generateHTML = () => {
    return generatePortfolioHTML({ portfolioData, sectionSizes });
  };

  const handleDownloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleViewportChange = (dimension, value) => {
    setViewportSettings(prev => ({
      ...prev,
      [dimension]: value.includes('px') ? value : `${value}px`
    }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <div className="w-[98vw] h-[85vh] p-2">
          <div className="flex h-full gap-2 relative">
            {/* Editor Section */}
            <div className="w-[380px] flex-shrink-0 flex flex-col bg-white/90 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-0.5 bg-blue-600 rounded-full"></div>
                  <h2 className="text-xs font-medium text-gray-800">Editor</h2>
                </div>
                <span className="px-1.5 py-0.5 text-[9px] font-medium text-blue-600 bg-blue-50 rounded">Live</span>
              </div>
              
              <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <nav className="p-1 space-y-0.5">
                  {['navbar', 'hero', 'about', 'skills', 'contact'].map((section) => (
                    <div key={section} 
                         className={`rounded-md transition-all duration-200 ${
                           openSection === section ? 'ring-1 ring-blue-100 bg-white' : 'bg-gray-50 hover:bg-gray-100/50'
                         }`}>
                      <button
                        onClick={() => toggleSection(section)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700"
                      >
                        <span className="capitalize">{section}</span>
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${openSection === section ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {openSection === section && (
                        <div className="p-3 border-t border-gray-100">
                          {section === 'navbar' && <NavbarSection {...{ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }} />}
                          {section === 'hero' && <HeroSection {...{ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }} />}
                          {section === 'about' && <AboutSection {...{ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }} />}
                          {section === 'skills' && <SkillsSection {...{ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }} />}
                          {section === 'contact' && <ContactSection {...{ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }} />}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Preview Section */}
            <div className="flex-1 bg-white/90 rounded-lg shadow-md border border-gray-100">
              <PreviewSection 
                viewportSettings={viewportSettings}
                handleViewportChange={handleViewportChange}
                generateHTML={generateHTML}
                handleDownloadHTML={handleDownloadHTML}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          @apply bg-gray-200 rounded-full transition-colors duration-150;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          @apply bg-gray-300;
        }
      `}</style>
    </>
  );
};

export default PortfolioBuilder;
