import React from 'react';

const HeroSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleNestedChange }) => {
  const HeroPreview = () => (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
      <div 
        className="relative h-64 rounded-lg overflow-hidden"
        style={{
          backgroundColor: sectionSizes.hero.backgroundColor,
          backgroundImage: portfolioData.hero?.backgroundImage ? 
            `linear-gradient(rgba(0, 0, 0, ${portfolioData.hero.overlayOpacity}), rgba(0, 0, 0, ${portfolioData.hero.overlayOpacity})), url(${portfolioData.hero.backgroundImage})` : 
            'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: portfolioData.hero?.textColor }}>
            {portfolioData.name || 'Your Name'}
          </h1>
          <p className="text-xl mb-2" style={{ color: portfolioData.hero?.subtitleColor }}>
            {portfolioData.title || 'Your Title'}
          </p>
          <p style={{ color: portfolioData.hero?.subtitleColor }}>
            {portfolioData.hero?.subtitle || 'Add a subtitle...'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Hero Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Basic Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={portfolioData.name || ''}
                onChange={(e) => handleNestedChange('name', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={portfolioData.title || ''}
                onChange={(e) => handleNestedChange('title', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Professional Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Subtitle</label>
              <input
                type="text"
                value={portfolioData.hero?.subtitle || ''}
                onChange={(e) => handleNestedChange('hero.subtitle', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="A brief description"
              />
            </div>
          </div>
        </div>

        {/* Style Settings */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Style Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Background Image URL</label>
              <input
                type="text"
                value={portfolioData.hero?.backgroundImage || ''}
                onChange={(e) => handleNestedChange('hero.backgroundImage', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Overlay Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={portfolioData.hero?.overlayOpacity || 0.5}
                onChange={(e) => handleNestedChange('hero.overlayOpacity', e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Text Color</label>
              <input
                type="color"
                value={portfolioData.hero?.textColor || '#FFFFFF'}
                onChange={(e) => handleNestedChange('hero.textColor', e.target.value)}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Subtitle Color</label>
              <input
                type="color"
                value={portfolioData.hero?.subtitleColor || '#E5E7EB'}
                onChange={(e) => handleNestedChange('hero.subtitleColor', e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <HeroPreview />
    </div>
  );
};

export default HeroSection;
