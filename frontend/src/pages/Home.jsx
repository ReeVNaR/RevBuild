export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text">
            Craft Stunning Resumes & Portfolios – Instantly.
          </h1>
          <p className="text-xl mb-12 text-gray-600">
            One powerful platform to build, customize, and export your professional identity.
          </p>
          <div className="flex gap-6 justify-center">
            <button 
              onClick={() => window.location.href = '/resume'}
              className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-xl"
            >
              Start Resume
            </button>
            <button 
              onClick={() => window.location.href = '/portfolio'}
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-medium transition-all duration-200 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md"
            >
              Start Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
