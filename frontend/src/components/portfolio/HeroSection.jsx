import React from 'react';

const HeroSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }) => {
  const handleHeroChange = (field, value) => {
    handleChange({
      target: {
        name: `hero.${field}`,
        value
      }
    });
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
      
      {/* Layout Settings */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="text-md font-medium mb-3">Layout Settings</h3>
        <div className="grid grid-cols-2 gap-4">
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

      {/* Visual Settings */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="text-md font-medium mb-3">Visual Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Background Image URL</label>
            <input
              type="url"
              value={portfolioData.hero?.backgroundImage || ''}
              onChange={(e) => handleHeroChange('backgroundImage', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Overlay Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={portfolioData.hero?.overlayOpacity || 0.3}
              onChange={(e) => handleHeroChange('overlayOpacity', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Subtitle</label>
            <textarea
              rows="2"
              value={portfolioData.hero?.subtitle || ''}
              onChange={(e) => handleHeroChange('subtitle', e.target.value)}
              className="w-full border rounded p-2"
              placeholder="A brief description of what you do..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Text Color</label>
              <input
                type="color"
                value={portfolioData.hero?.textColor || '#FFFFFF'}
                onChange={(e) => handleHeroChange('textColor', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Subtitle Color</label>
              <input
                type="color"
                value={portfolioData.hero?.subtitleColor || '#E5E7EB'}
                onChange={(e) => handleHeroChange('subtitleColor', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">CTA Button Text</label>
              <input
                type="text"
                value={portfolioData.hero?.ctaButton?.text || ''}
                onChange={(e) => handleHeroChange('ctaButton', { ...portfolioData.hero?.ctaButton, text: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="View My Work"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">CTA Button Link</label>
              <input
                type="text"
                value={portfolioData.hero?.ctaButton?.link || ''}
                onChange={(e) => handleHeroChange('ctaButton', { ...portfolioData.hero?.ctaButton, link: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="#contact"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="space-y-6">
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              name="name"
              id="name"
              value={portfolioData.name}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">This will be displayed as your main heading</p>
        </div>

        <div className="relative">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Title
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value={portfolioData.title}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
              placeholder="Full Stack Developer"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Your current role or professional title</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
