import React from 'react';

const AboutSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">About Section</h2>
      <div className="border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 gap-4">
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
  );
};

export default AboutSection;
