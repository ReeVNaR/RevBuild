import React from 'react';

const ContactSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleChange }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Contact Section</h2>
      <div className="border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 gap-4">
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
        {Object.entries(portfolioData.contact).map(([key, value]) => (
          <input
            key={key}
            type="text"
            name={`contact.${key}`}
            value={value}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="w-full p-2 border rounded"
          />
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
