import React from 'react';

const cardStyles = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'elevated', label: 'Elevated' },
  { value: 'bordered', label: 'Bordered' },
  { value: 'glass', label: 'Glass Morphism' }
];

const skillLayouts = [
  { value: 'grid', label: 'Grid' },
  { value: 'masonry', label: 'Masonry' },
  { value: 'carousel', label: 'Carousel' }
];

const badgeStyles = [
  { value: 'pill', label: 'Pill' },
  { value: 'tag', label: 'Tag' },
  { value: 'chip', label: 'Chip' }
];

const SkillsSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Skills Section</h2>
      <div className="border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 gap-4">
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
        {Object.entries(portfolioData.skills).map(([key, value]) => (
          <div key={key}>
            <label className="text-sm font-medium text-gray-600 capitalize">
              {key.replace('_', ' ')}
            </label>
            <input
              type="text"
              name={`skills.${key}`}
              value={value.join(', ')}
              onChange={(e) => handleChange({
                target: {
                  name: `skills.${key}`,
                  value: e.target.value.split(',').map(s => s.trim())
                }
              })}
              placeholder={`e.g. ${getSkillsPlaceholder(key)}`}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const getSkillsPlaceholder = (key) => {
  const placeholders = {
    technical: 'JavaScript, Python, React',
    tools: 'Git, VS Code, Docker',
    frameworks: 'Next.js, Express, TailwindCSS',
    languages: 'English, Spanish'
  };
  return placeholders[key] || '';
};

export default SkillsSection;
