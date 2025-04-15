import React, { useEffect, useRef } from 'react';

const PreviewSection = ({ portfolioData, sectionSizes, generateHTML, handleDownloadHTML }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const updatePreview = () => {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = generateHTML({ portfolioData, sectionSizes });
      }
    };

    updatePreview();
    // Add event listener for real-time updates
    window.addEventListener('portfolio-update', updatePreview);
    return () => window.removeEventListener('portfolio-update', updatePreview);
  }, [portfolioData, sectionSizes, generateHTML]);

  const handlePreviewClick = () => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(generateHTML({ portfolioData, sectionSizes }));
    newWindow.document.close();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Live Preview</h2>
        <div className="space-x-4">
          <button
            onClick={handlePreviewClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm transition-colors"
          >
            Preview Full
          </button>
          <button
            onClick={handleDownloadHTML}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
          >
            Download HTML
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <iframe
          ref={iframeRef}
          title="Portfolio Preview"
          className="w-full h-full border rounded-lg bg-white shadow-sm"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default PreviewSection;
