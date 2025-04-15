import React from 'react';

const SkillsSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleNestedChange }) => {
  const categories = ['technical', 'soft', 'tools', 'languages'];

  const handleSkillChange = (category, skillsString) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim());
    handleNestedChange(`skills.${category}`, skillsArray);
  };

  const SkillsPreview = () => (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
      <div 
        className={`p-6 rounded-lg ${sectionSizes.skills.layout}`}
        style={{
          backgroundColor: sectionSizes.skills.backgroundColor,
          padding: sectionSizes.skills.padding
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Skills</h2>
        <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${sectionSizes.skills.columns}, 1fr)` }}>
          {categories.map(category => (
            portfolioData.skills?.[category]?.length > 0 && (
              <div key={category} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills[category].map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Skills Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Layout Settings */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Layout Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Number of Columns
              </label>
              <input
                type="number"
                min="1"
                max="4"
                value={sectionSizes.skills.columns}
                onChange={(e) => handleSectionSizeChange('skills', 'columns', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Background Color
              </label>
              <input
                type="color"
                value={sectionSizes.skills.backgroundColor}
                onChange={(e) => handleSectionSizeChange('skills', 'backgroundColor', e.target.value)}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Padding
              </label>
              <input
                type="text"
                value={sectionSizes.skills.padding}
                onChange={(e) => handleSectionSizeChange('skills', 'padding', e.target.value)}
                placeholder="e.g., 4rem 2rem"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Skills Input */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
          
          <div className="space-y-4">
            {categories.map(category => (
              <div key={category}>
                <label className="block text-sm font-medium text-gray-600 mb-2 capitalize">
                  {category} Skills
                </label>
                <textarea
                  value={portfolioData.skills?.[category]?.join(', ') || ''}
                  onChange={(e) => handleSkillChange(category, e.target.value)}
                  placeholder="Enter skills separated by commas"
                  rows="2"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <SkillsPreview />
    </div>
  );
};

export default SkillsSection;
