import React from 'react';

const ContactSection = ({ sectionSizes, portfolioData, handleSectionSizeChange, handleNestedChange }) => {
  const ContactPreview = () => (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
      <div 
        className="p-6 rounded-lg"
        style={{
          backgroundColor: sectionSizes.contact.backgroundColor,
          padding: sectionSizes.contact.padding
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-6">{portfolioData.contact?.email}</p>
          <div className="flex justify-center space-x-6">
            {portfolioData.contact?.github && (
              <a href={portfolioData.contact.github} className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-github text-3xl"></i>
              </a>
            )}
            {portfolioData.contact?.linkedin && (
              <a href={portfolioData.contact.linkedin} className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-linkedin text-3xl"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                value={portfolioData.contact?.email || ''}
                onChange={(e) => handleNestedChange('contact.email', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={portfolioData.contact?.github || ''}
                onChange={(e) => handleNestedChange('contact.github', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={portfolioData.contact?.linkedin || ''}
                onChange={(e) => handleNestedChange('contact.linkedin', e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="https://linkedin.com/in/username"
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
              <input
                type="color"
                value={sectionSizes.contact.backgroundColor}
                onChange={(e) => handleSectionSizeChange('contact', 'backgroundColor', e.target.value)}
                className="w-full h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Padding
              </label>
              <input
                type="text"
                value={sectionSizes.contact.padding}
                onChange={(e) => handleSectionSizeChange('contact', 'padding', e.target.value)}
                placeholder="e.g., 4rem 2rem"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <ContactPreview />
    </div>
  );
};

export default ContactSection;
