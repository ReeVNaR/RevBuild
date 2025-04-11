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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="animate-fade-in-up">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Create Your</span>
              <span className="block text-blue-600">Professional Portfolio</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Build a stunning portfolio website in minutes. Customize every aspect to showcase your skills and experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-8">
          {/* Editor Section - 30% */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Editor</h2>
                  <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">Live Update</span>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-2 custom-scrollbar">
                  <nav className="space-y-1">
                    {/* Navbar Section */}
                    <div className="border-b border-gray-200">
                      <button
                        onClick={() => toggleSection('navbar')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                          </svg>
                          Navigation Bar
                        </span>
                        <svg
                          className={`w-5 h-5 transform ${openSection === 'navbar' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSection === 'navbar' && (
                        <div className="p-4">
                          <NavbarSection 
                            sectionSizes={sectionSizes}
                            portfolioData={portfolioData}
                            handleSectionSizeChange={handleSectionSizeChange}
                            handleChange={handleChange}
                          />
                        </div>
                      )}
                    </div>

                    {/* Hero Section */}
                    <div className="border-b border-gray-200">
                      <button
                        onClick={() => toggleSection('hero')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          Hero Section
                        </span>
                        <svg
                          className={`w-5 h-5 transform ${openSection === 'hero' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSection === 'hero' && (
                        <div className="p-4">
                          <HeroSection 
                            sectionSizes={sectionSizes}
                            portfolioData={portfolioData}
                            handleSectionSizeChange={handleSectionSizeChange}
                            handleChange={handleChange}
                          />
                        </div>
                      )}
                    </div>

                    {/* About Section */}
                    <div className="border-b border-gray-200">
                      <button
                        onClick={() => toggleSection('about')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          About Section
                        </span>
                        <svg
                          className={`w-5 h-5 transform ${openSection === 'about' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSection === 'about' && (
                        <div className="p-4">
                          <AboutSection 
                            sectionSizes={sectionSizes}
                            portfolioData={portfolioData}
                            handleSectionSizeChange={handleSectionSizeChange}
                            handleChange={handleChange}
                          />
                        </div>
                      )}
                    </div>

                    {/* Skills Section */}
                    <div className="border-b border-gray-200">
                      <button
                        onClick={() => toggleSection('skills')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Skills Section
                        </span>
                        <svg
                          className={`w-5 h-5 transform ${openSection === 'skills' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSection === 'skills' && (
                        <div className="p-4">
                          <SkillsSection 
                            sectionSizes={sectionSizes}
                            portfolioData={portfolioData}
                            handleSectionSizeChange={handleSectionSizeChange}
                            handleChange={handleChange}
                          />
                        </div>
                      )}
                    </div>

                    {/* Contact Section */}
                    <div className="border-b border-gray-200">
                      <button
                        onClick={() => toggleSection('contact')}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
                      >
                        <span className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact Section
                        </span>
                        <svg
                          className={`w-5 h-5 transform ${openSection === 'contact' ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSection === 'contact' && (
                        <div className="p-4">
                          <ContactSection 
                            sectionSizes={sectionSizes}
                            portfolioData={portfolioData}
                            handleSectionSizeChange={handleSectionSizeChange}
                            handleChange={handleChange}
                          />
                        </div>
                      )}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section - 70% */}
          <div className="col-span-12 lg:col-span-8">
            <PreviewSection 
              viewportSettings={viewportSettings}
              handleViewportChange={handleViewportChange}
              generateHTML={generateHTML}
              handleDownloadHTML={handleDownloadHTML}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioBuilder;
