import React from 'react';

const PreviewSection = ({ viewportSettings, handleViewportChange, generateHTML, handleDownloadHTML }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end p-2 border-b border-gray-200">
        <button
          onClick={handleDownloadHTML}
          className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
        >
          Download HTML
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <iframe
          srcDoc={generateHTML()}
          title="Preview"
          className="w-full h-full border-none"
          style={{
            width: viewportSettings.width,
            height: viewportSettings.height
          }}
        />
      </div>
    </div>
  );
};

export default PreviewSection;
