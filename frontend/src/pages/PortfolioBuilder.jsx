import React, { useState, useEffect, useCallback } from 'react';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ContactSection from '../components/portfolio/ContactSection';
import HeroSection from '../components/portfolio/HeroSection';
import { generatePortfolioHTML } from '../components/portfolio/GeneratePortfolioHTML';
import PreviewSection from '../components/portfolio/PreviewSection';

const PortfolioBuilder = () => {
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    about: '',
    skills: {},
    contact: {
      email: '',
      github: '',
      linkedin: ''
    },
    hero: {
      subtitle: '',
      backgroundImage: '',
      overlayOpacity: 0.5,
      textColor: '#FFFFFF',
      subtitleColor: '#E5E7EB',
      ctaButton: {
        text: '',
        link: ''
      }
    }
  });

  const [sectionSizes, setSectionSizes] = useState({
    hero: {
      backgroundColor: '#1F2937',
      textColor: '#FFFFFF',
      height: '100vh'
    },
    about: {
      layout: 'layout-centered',
      padding: '4rem 2rem',
      backgroundColor: '#FFFFFF',
      backgroundEffect: '',
      animation: 'fade-up'
    },
    skills: {
      layout: 'layout-grid',
      padding: '4rem 2rem',
      backgroundColor: '#F3F4F6',
      backgroundEffect: '',
      columns: 3
    },
    contact: {
      backgroundColor: '#FFFFFF',
      layout: 'layout-centered',
      padding: '4rem 2rem'
    }
  });

  const previewIframeRef = React.useRef(null);

  const generatePreview = useCallback(() => {
    return generatePortfolioHTML({ portfolioData, sectionSizes });
  }, [portfolioData, sectionSizes]);

  useEffect(() => {
    const updatePreview = () => {
      if (previewIframeRef.current) {
        const iframe = previewIframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(generatePreview());
        iframeDoc.close();
      }
    };

    const timeoutId = setTimeout(updatePreview, 100);
    return () => clearTimeout(timeoutId);
  }, [generatePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSectionSizeChange = (section, property, value) => {
    setSectionSizes(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [property]: value
      }
    }));
  };

  const handleDownload = () => {
    const html = generatePreview();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    const html = generatePreview();
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  return (
    <div className="h-screen pt-16 bg-gray-50 flex overflow-hidden">
      {/* Left Sidebar - Editor */}
      <div className="w-[30%] border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Builder</h1>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Quick Navigation</h3>
              <div className="flex gap-2 flex-wrap">
                {['Hero', 'About', 'Skills', 'Contact'].map(section => (
                  <button
                    key={section}
                    onClick={() => document.getElementById(`${section.toLowerCase()}-section`).scrollIntoView({ behavior: 'smooth' })}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            <div id="hero-section">
              <HeroSection
                sectionSizes={sectionSizes}
                portfolioData={portfolioData}
                handleSectionSizeChange={handleSectionSizeChange}
                handleChange={handleChange}
                handleNestedChange={handleNestedChange}
              />
            </div>

            <div id="about-section">
              <AboutSection
                sectionSizes={sectionSizes}
                portfolioData={portfolioData}
                handleSectionSizeChange={handleSectionSizeChange}
                handleChange={handleChange}
              />
            </div>

            <div id="skills-section">
              <SkillsSection
                sectionSizes={sectionSizes}
                portfolioData={portfolioData}
                handleSectionSizeChange={handleSectionSizeChange}
                handleNestedChange={handleNestedChange}
              />
            </div>

            <div id="contact-section">
              <ContactSection
                sectionSizes={sectionSizes}
                portfolioData={portfolioData}
                handleSectionSizeChange={handleSectionSizeChange}
                handleNestedChange={handleNestedChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1 bg-gray-50">
        <div className="h-full flex flex-col">
          <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Live Preview</h2>
            <div className="space-x-4">
              <button
                onClick={handlePreview}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors"
              >
                Preview Full
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
              >
                Download HTML
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <iframe
              ref={previewIframeRef}
              title="Portfolio Preview"
              className="w-full h-full border rounded-lg bg-white shadow-sm"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
