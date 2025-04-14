import React from 'react';

const layoutOptions = [
  { value: 'layout-centered', label: 'Centered' },
  { value: 'layout-full', label: 'Full Width' },
  { value: 'layout-grid', label: 'Grid' }
];

const backgroundEffects = [
  { value: '', label: 'None' },
  { value: 'bg-pattern-dots', label: 'Dots Pattern' },
  { value: 'bg-pattern-lines', label: 'Lines Pattern' },
  { value: 'bg-gradient', label: 'Gradient' }
];

const animations = [
  { value: 'fade-up', label: 'Fade Up' },
  { value: 'slide-in', label: 'Slide In' },
  { value: 'zoom-in', label: 'Zoom In' }
];

const AboutSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }) => {
  const AboutPreview = () => (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
      <div 
        className={`p-6 rounded-lg ${sectionSizes.about.layout}`}
        style={{
          backgroundColor: sectionSizes.about.backgroundColor,
          padding: sectionSizes.about.padding
        }}
      >
        <div className={`max-w-3xl mx-auto ${sectionSizes.about.animation}`}>
          <h2 className="text-2xl font-bold text-center mb-6">About Me</h2>
          <div className="prose prose-lg mx-auto">
            {portfolioData.about ? (
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {portfolioData.about}
              </p>
            ) : (
              <p className="text-gray-400 italic text-center">
                Add your content to see the preview...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">About Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Layout Settings */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Layout Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Layout Style
              </label>
              <select
                value={sectionSizes.about.layout}
                onChange={(e) => handleSectionSizeChange('about', 'layout', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {layoutOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Animation
              </label>
              <select
                value={sectionSizes.about.animation}
                onChange={(e) => handleSectionSizeChange('about', 'animation', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {animations.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Padding
              </label>
              <input
                type="text"
                value={sectionSizes.about.padding}
                onChange={(e) => handleSectionSizeChange('about', 'padding', e.target.value)}
                placeholder="e.g., 4rem 2rem"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Style Settings */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Style Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={sectionSizes.about.backgroundColor}
                  onChange={(e) => handleSectionSizeChange('about', 'backgroundColor', e.target.value)}
                  className="h-10 w-20"
                />
                <input
                  type="text"
                  value={sectionSizes.about.backgroundColor}
                  onChange={(e) => handleSectionSizeChange('about', 'backgroundColor', e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Background Effect
              </label>
              <select
                value={sectionSizes.about.backgroundEffect}
                onChange={(e) => handleSectionSizeChange('about', 'backgroundEffect', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {backgroundEffects.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700">Content</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            About Text
          </label>
          <textarea
            name="about"
            value={portfolioData.about || ''}
            onChange={handleChange}
            placeholder="Write something about yourself..."
            rows="6"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Live Preview */}
      <AboutPreview />
    </div>
  );
};

export default AboutSection;
