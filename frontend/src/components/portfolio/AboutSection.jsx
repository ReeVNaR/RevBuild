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
  // Remove preview section and update handleChange to be more responsive
  const handleInputChange = (e) => {
    handleChange(e);
    // The parent component will handle the preview update
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">About Section</h2>
      
      <div className="grid grid-cols-1 gap-6">
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
            onChange={handleInputChange}
            placeholder="Write something about yourself..."
            rows="6"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
