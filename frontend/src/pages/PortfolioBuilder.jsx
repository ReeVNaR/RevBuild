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

  // Add memo for generating preview HTML
  const generatePreview = useCallback(() => {
    return generatePortfolioHTML({ portfolioData, sectionSizes });
  }, [portfolioData, sectionSizes]);

  // Add immediate update handlers
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

  // Update preview whenever data changes
  useEffect(() => {
    const updatePreview = () => {
      const iframe = document.getElementById('preview-iframe');
      if (iframe) {
        const previewDocument = iframe.contentDocument || iframe.contentWindow.document;
        previewDocument.open();
        previewDocument.write(generatePreview());
        previewDocument.close();
      }
    };

    updatePreview();
  }, [generatePreview]);

  const handleDownload = () => {
    const html = generatePreview();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFullPreview = () => {
    const html = generatePreview();
    const previewWindow = window.open();
    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  return (
    <div className="h-screen pt-16 bg-gray-50 flex overflow-hidden">
      {/* Left Panel - Editor */}
      <div className="w-[30%] border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6 space-y-8">
          <div className="sticky top-0 bg-gray-50 z-10 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Builder</h1>
          </div>

          <div id="sections-container" className="space-y-8">
            <div id="hero-section">
              <HeroSection
                sectionSizes={sectionSizes}
                portfolioData={portfolioData}
                handleSectionSizeChange={handleSectionSizeChange}
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
                onClick={handleFullPreview}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
              >
                Preview Full
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Download HTML
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <iframe
              id="preview-iframe"
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
