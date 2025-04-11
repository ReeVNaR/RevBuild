import React from 'react';

const NavbarSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }) => {
  const handleNavbarChange = (field, value) => {
    handleChange({
      target: {
        name: `navbar.${field}`,
        value
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Visual Settings */}
      <div className="border rounded-lg p-4">
        <h3 className="text-md font-medium mb-3">Visual Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Background Color</label>
              <input
                type="color"
                value={portfolioData.navbar?.backgroundColor || '#FFFFFF'}
                onChange={(e) => handleNavbarChange('backgroundColor', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Text Color</label>
              <input
                type="color"
                value={portfolioData.navbar?.textColor || '#111827'}
                onChange={(e) => handleNavbarChange('textColor', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Hover Color</label>
              <input
                type="color"
                value={portfolioData.navbar?.hoverColor || '#3B82F6'}
                onChange={(e) => handleNavbarChange('hoverColor', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Border Color</label>
              <input
                type="color"
                value={portfolioData.navbar?.borderColor || '#E5E7EB'}
                onChange={(e) => handleNavbarChange('borderColor', e.target.value)}
                className="w-full h-10 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="border rounded-lg p-4">
        <h3 className="text-md font-medium mb-3">Layout Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Height (px)</label>
            <input
              type="number"
              value={portfolioData.navbar?.height || 64}
              onChange={(e) => handleNavbarChange('height', e.target.value)}
              className="w-full p-2 border rounded"
              min="40"
              max="120"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Shadow</label>
              <select
                value={portfolioData.navbar?.shadow || 'md'}
                onChange={(e) => handleNavbarChange('shadow', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Border Style</label>
              <select
                value={portfolioData.navbar?.borderStyle || 'none'}
                onChange={(e) => handleNavbarChange('borderStyle', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="bottom">Bottom Border</option>
                <option value="full">Full Border</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Settings */}
      <div className="border rounded-lg p-4">
        <h3 className="text-md font-medium mb-3">Animation Settings</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Link Hover Effect</label>
              <select
                value={portfolioData.navbar?.linkEffect || 'none'}
                onChange={(e) => handleNavbarChange('linkEffect', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="none">None</option>
                <option value="underline">Underline</option>
                <option value="scale">Scale</option>
                <option value="fade">Fade</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Scroll Behavior</label>
              <select
                value={portfolioData.navbar?.scrollBehavior || 'static'}
                onChange={(e) => handleNavbarChange('scrollBehavior', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="static">Static</option>
                <option value="hide">Hide on Scroll</option>
                <option value="shrink">Shrink on Scroll</option>
                <option value="transparent">Transparent on Top</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Settings */}
      <div className="border rounded-lg p-4">
        <h3 className="text-md font-medium mb-3">Logo Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Logo Type</label>
            <select
              value={portfolioData.navbar?.logoType || 'text'}
              onChange={(e) => handleNavbarChange('logoType', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
          </div>

          {portfolioData.navbar?.logoType === 'text' ? (
            <div>
              <label className="text-sm text-gray-600 block mb-1">Logo Text</label>
              <input
                type="text"
                value={portfolioData.navbar?.logoText || ''}
                onChange={(e) => handleNavbarChange('logoText', e.target.value)}
                placeholder="Your Brand"
                className="w-full p-2 border rounded"
              />
            </div>
          ) : (
            <div>
              <label className="text-sm text-gray-600 block mb-1">Logo Image URL</label>
              <input
                type="url"
                value={portfolioData.navbar?.logoImage || ''}
                onChange={(e) => handleNavbarChange('logoImage', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full p-2 border rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;
