import React, { useState, useRef } from 'react';

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
    }
  });

  const [viewportSettings, setViewportSettings] = useState({
    width: '100%',
    height: '100%'
  });

  const [sectionSizes, setSectionSizes] = useState({
    hero: {
      padding: '20rem',
      height: '100vh',
      fontSize: '3rem',
      backgroundColor: '#1E40AF'
    },
    about: {
      padding: '20rem',
      maxWidth: '100%',
      fontSize: '1.125rem',
      backgroundColor: '#FFFFFF'
    },
    skills: {
      padding: '20rem',
      columns: '2',
      gap: '2rem',
      backgroundColor: '#F3F4F6'
    },
    contact: {
      padding: '20rem',
      maxWidth: '100%',
      fontSize: '1.125rem',
      backgroundColor: '#FFFFFF'
    }
  });

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
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${portfolioData.name || 'My Portfolio'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .mobile-menu { 
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            background-color: rgba(255, 255, 255, 0.98);
        }
        .mobile-menu.active { transform: translateX(0); }
        .hamburger { display: none; }
        @media (max-width: 768px) {
            .hamburger { display: block; }
            .section-padding { padding: 3rem 1rem !important; }
            h1 { font-size: 2rem !important; }
            h2 { font-size: 1.5rem !important; }
            .container { padding: 0 1rem; }
        }
    </style>
</head>
<body class="bg-gray-100">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <a href="#" class="text-xl font-bold text-gray-800 z-50">${portfolioData.name || 'Your Name'}</a>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex space-x-8">
                    <a href="#about" class="text-gray-600 hover:text-blue-600">About</a>
                    <a href="#skills" class="text-gray-600 hover:text-blue-600">Skills</a>
                    <a href="#contact" class="text-gray-600 hover:text-blue-600">Contact</a>
                </div>

                <!-- Mobile Menu Button -->
                <button class="hamburger md:hidden focus:outline-none z-50" 
                    onclick="toggleMenu()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <div id="mobileMenu" class="mobile-menu fixed inset-0 z-40">
            <div class="flex flex-col items-center justify-center h-full space-y-8 text-xl">
                <a href="#about" onclick="closeMenu()" class="text-gray-800 hover:text-blue-600">About</a>
                <a href="#skills" onclick="closeMenu()" class="text-gray-800 hover:text-blue-600">Skills</a>
                <a href="#contact" onclick="closeMenu()" class="text-gray-800 hover:text-blue-600">Contact</a>
            </div>
        </div>
    </nav>

    <script>
        function toggleMenu() {
            document.getElementById('mobileMenu').classList.toggle('active');
            document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('active') ? 'hidden' : '';
        }
        
        function closeMenu() {
            document.getElementById('mobileMenu').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close menu on resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    </script>

    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-16" style="padding-top: calc(${sectionSizes.hero.padding} + 4rem); padding-bottom: ${sectionSizes.hero.padding}; height: ${sectionSizes.hero.height}; font-size: ${sectionSizes.hero.fontSize}; background-color: ${sectionSizes.hero.backgroundColor}">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">${portfolioData.name || 'Your Name'}</h1>
            <p class="text-xl md:text-2xl mb-8">${portfolioData.title || 'Your Title'}</p>
            <div class="flex justify-center space-x-4">
                ${portfolioData.contact?.github ? `
                    <a href="${portfolioData.contact.github}" class="text-white hover:text-gray-200">
                        <i class="fab fa-github text-2xl"></i>
                    </a>` : ''}
                ${portfolioData.contact?.linkedin ? `
                    <a href="${portfolioData.contact.linkedin}" class="text-white hover:text-gray-200">
                        <i class="fab fa-linkedin text-2xl"></i>
                    </a>` : ''}
            </div>
        </div>
    </header>

    <!-- About Section with ID for navigation -->
    <section id="about" class="bg-white" style="padding-top: ${sectionSizes.about.padding}; padding-bottom: ${sectionSizes.about.padding}; max-width: ${sectionSizes.about.maxWidth}; font-size: ${sectionSizes.about.fontSize}; background-color: ${sectionSizes.about.backgroundColor}">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-8 text-center">About Me</h2>
            <p class="text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
                ${portfolioData.about || 'Tell us about yourself...'}
            </p>
        </div>
    </section>

    <!-- Skills Section with ID for navigation -->
    <section id="skills" class="bg-gray-50" style="padding-top: ${sectionSizes.skills.padding}; padding-bottom: ${sectionSizes.skills.padding}; background-color: ${sectionSizes.skills.backgroundColor}">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${Object.entries(portfolioData.skills).map(([category, skills]) => `
            <div class="bg-white rounded-lg shadow-lg p-6">
              <h3 class="text-xl font-bold mb-4 capitalize">${category.replace('_', ' ')}</h3>
              <div class="flex flex-wrap gap-2">
                ${skills.map(skill => `
                  <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">${skill}</span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Contact Section with ID for navigation -->
    <section id="contact" class="bg-white" style="padding-top: ${sectionSizes.contact.padding}; padding-bottom: ${sectionSizes.contact.padding}; max-width: ${sectionSizes.contact.maxWidth}; font-size: ${sectionSizes.contact.fontSize}; background-color: ${sectionSizes.contact.backgroundColor}">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-8">Get In Touch</h2>
            <p class="text-gray-600 mb-8">
                ${portfolioData.contact?.email || 'your.email@example.com'}
            </p>
            <div class="flex justify-center space-x-4">
                ${portfolioData.contact?.github ? `
                    <a href="${portfolioData.contact.github}" class="text-gray-600 hover:text-gray-800">
                        <i class="fab fa-github text-2xl"></i>
                    </a>` : ''}
                ${portfolioData.contact?.linkedin ? `
                    <a href="${portfolioData.contact.linkedin}" class="text-gray-600 hover:text-gray-800">
                        <i class="fab fa-linkedin text-2xl"></i>
                    </a>` : ''}
            </div>
        </div>
    </section>

    <!-- Add smooth scroll behavior -->
    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>
</body>
</html>`;
    return html;
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Portfolio Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto sticky top-24" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <form className="space-y-6">
              {/* Hero Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Padding</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={parseInt(sectionSizes.hero.padding)}
                          onChange={(e) => handleSectionSizeChange('hero', 'padding', e.target.value, 'rem')}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-500 w-16">{parseInt(sectionSizes.hero.padding)}rem</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Height</label>
                      <select
                        value={sectionSizes.hero.height}
                        onChange={(e) => handleSectionSizeChange('hero', 'height', e.target.value)}
                        className="w-full border rounded p-2"
                      >
                        <option value="100vh">Full Height</option>
                        <option value="75vh">75% Height</option>
                        <option value="50vh">Half Height</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Background Color</label>
                      <input
                        type="color"
                        value={sectionSizes.hero.backgroundColor}
                        onChange={(e) => handleSectionSizeChange('hero', 'backgroundColor', e.target.value)}
                        className="w-full h-10 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={portfolioData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="title"
                    value={portfolioData.title}
                    onChange={handleChange}
                    placeholder="Professional Title"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </section>

              {/* About Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">About Section</h2>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Padding</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={parseInt(sectionSizes.about.padding)}
                          onChange={(e) => handleSectionSizeChange('about', 'padding', e.target.value, 'rem')}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-500 w-16">{parseInt(sectionSizes.about.padding)}rem</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Background Color</label>
                      <input
                        type="color"
                        value={sectionSizes.about.backgroundColor}
                        onChange={(e) => handleSectionSizeChange('about', 'backgroundColor', e.target.value)}
                        className="w-full h-10 rounded"
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  name="about"
                  value={portfolioData.about}
                  onChange={handleChange}
                  placeholder="About Me"
                  rows="4"
                  className="w-full p-2 border rounded"
                />
              </section>

              {/* Skills Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Skills Section</h2>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Padding</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={parseInt(sectionSizes.skills.padding)}
                          onChange={(e) => handleSectionSizeChange('skills', 'padding', e.target.value, 'rem')}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-500 w-16">{parseInt(sectionSizes.skills.padding)}rem</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Background Color</label>
                      <input
                        type="color"
                        value={sectionSizes.skills.backgroundColor}
                        onChange={(e) => handleSectionSizeChange('skills', 'backgroundColor', e.target.value)}
                        className="w-full h-10 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Technical Skills</label>
                    <input
                      type="text"
                      name="skills.technical"
                      value={portfolioData.skills.technical.join(', ')}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'skills.technical',
                          value: e.target.value.split(',').map(s => s.trim())
                        }
                      })}
                      placeholder="e.g. JavaScript, Python, React"
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tools & Software</label>
                    <input
                      type="text"
                      name="skills.tools"
                      value={portfolioData.skills.tools.join(', ')}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'skills.tools',
                          value: e.target.value.split(',').map(s => s.trim())
                        }
                      })}
                      placeholder="e.g. Git, VS Code, Docker"
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Frameworks & Libraries</label>
                    <input
                      type="text"
                      name="skills.frameworks"
                      value={portfolioData.skills.frameworks.join(', ')}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'skills.frameworks',
                          value: e.target.value.split(',').map(s => s.trim())
                        }
                      })}
                      placeholder="e.g. Next.js, Express, TailwindCSS"
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Languages</label>
                    <input
                      type="text"
                      name="skills.languages"
                      value={portfolioData.skills.languages.join(', ')}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'skills.languages',
                          value: e.target.value.split(',').map(s => s.trim())
                        }
                      })}
                      placeholder="e.g. English, Spanish"
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Contact Section</h2>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Padding</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={parseInt(sectionSizes.contact.padding)}
                          onChange={(e) => handleSectionSizeChange('contact', 'padding', e.target.value, 'rem')}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-500 w-16">{parseInt(sectionSizes.contact.padding)}rem</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Background Color</label>
                      <input
                        type="color"
                        value={sectionSizes.contact.backgroundColor}
                        onChange={(e) => handleSectionSizeChange('contact', 'backgroundColor', e.target.value)}
                        className="w-full h-10 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="contact.email"
                    value={portfolioData.contact.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="contact.github"
                    value={portfolioData.contact.github}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="contact.linkedin"
                    value={portfolioData.contact.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="contact.website"
                    value={portfolioData.contact.website}
                    onChange={handleChange}
                    placeholder="Personal Website"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </section>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Preview</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={parseInt(viewportSettings.width) || ''}
                    onChange={(e) => handleViewportChange('width', e.target.value)}
                    className="w-20 border rounded px-2 py-1"
                    placeholder="Width"
                  />
                  <span className="text-sm text-gray-500">×</span>
                  <input
                    type="number"
                    value={parseInt(viewportSettings.height) || ''}
                    onChange={(e) => handleViewportChange('height', e.target.value)}
                    className="w-20 border rounded px-2 py-1"
                    placeholder="Height"
                  />
                  <select 
                    onChange={(e) => {
                      if (e.target.value === 'custom') return;
                      const [width, height] = e.target.value.split('x');
                      setViewportSettings({ width: `${width}px`, height: `${height}px` });
                    }}
                    className="border rounded px-2 py-1"
                  >
                    <option value="custom">Custom</option>
                    <option value="1920x1080">Desktop HD</option>
                    <option value="1366x768">Desktop</option>
                    <option value="768x1024">Tablet</option>
                    <option value="375x667">Mobile</option>
                  </select>
                </div>
                <button
                  onClick={() => window.open('about:blank').document.write(generateHTML())}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  Full Preview
                </button>
                <button
                  onClick={handleDownloadHTML}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="preview-container border rounded-lg overflow-hidden bg-gray-100 p-4 w-full" 
              style={{ 
                height: 'calc(100vh - 220px)',
                maxWidth: '100%',
                margin: '0 auto'
              }}>
              <div className="w-full h-full overflow-auto flex justify-center">
                <iframe
                  srcDoc={generateHTML()}
                  title="Portfolio Preview"
                  className="preview-iframe bg-white rounded-lg shadow-lg"
                  style={{
                    width: viewportSettings.width,
                    height: viewportSettings.height,
                    border: 'none',
                    transition: 'all 0.3s ease',
                    minWidth: '320px',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
