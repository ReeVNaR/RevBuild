import React, { useEffect, useRef } from 'react';

const PreviewSection = ({ viewportSettings, generateHTML, handleDownloadHTML }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = generateHTML();
    }
  }, [generateHTML]);

  const handlePreviewClick = () => {
    const newWindow = window.open();
    newWindow.document.write(generateHTML());
    newWindow.document.close();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end items-center gap-2 p-2 border-b border-gray-200">
        <button
          onClick={handlePreviewClick}
          className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
        >
          Preview Full
        </button>
        <button
          onClick={handleDownloadHTML}
          className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
        >
          Download HTML
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <iframe
          ref={iframeRef}
          title="Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

export default PreviewSection;
