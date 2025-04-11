import React from 'react';

const PreviewSection = ({ 
  viewportSettings, 
  handleViewportChange, 
  generateHTML, 
  handleDownloadHTML 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
            <span className="text-sm text-gray-500">Live View</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.open('about:blank').document.write(generateHTML())}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
            <button
              onClick={handleDownloadHTML}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="preview-container border rounded-lg overflow-hidden bg-gray-50" 
          style={{ height: 'calc(100vh - 280px)' }}>
          <iframe
            srcDoc={generateHTML()}
            title="Portfolio Preview"
            className="w-full h-full bg-white"
            style={{
              border: 'none',
              minWidth: '320px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
