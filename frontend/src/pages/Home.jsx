import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const slides = [
    { image: '/screenshots/resume-template.png', title: 'Professional Resume Templates' },
    { image: '/screenshots/portfolio-preview.png', title: 'Portfolio Showcases' },
    { image: '/screenshots/customization.png', title: 'Easy Customization' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <div className="container mx-auto px-4 pt-20">
        {/* Hero Section */}
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

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-24 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You Can Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">✅</div>
              <h3 className="font-semibold text-lg mb-2">Resume Builder</h3>
              <p className="text-gray-600">Create professional resumes in minutes</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">🎨</div>
              <h3 className="font-semibold text-lg mb-2">Portfolio Builder</h3>
              <p className="text-gray-600">Showcase your projects beautifully</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">📄</div>
              <h3 className="font-semibold text-lg mb-2">Export Options</h3>
              <p className="text-gray-600">Export as PDF or share online via custom link</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">🌈</div>
              <h3 className="font-semibold text-lg mb-2">Multiple Templates</h3>
              <p className="text-gray-600">Choose from multiple templates & themes</p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="max-w-6xl mx-auto mt-24 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See It In Action</h2>
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <div className="relative h-[600px] bg-gray-100">
              <div className="absolute inset-0 transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div key={index} className="absolute top-0 left-0 w-full h-full"
                       style={{ left: `${index * 100}%` }}>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-8">
                      <h3 className="text-white text-2xl font-semibold">{slide.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 w-10 h-10 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                aria-label="Previous slide"
              >
                <svg 
                  className="w-6 h-6 text-gray-800 group-hover:text-gray-900 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 w-10 h-10 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                aria-label="Next slide"
              >
                <svg 
                  className="w-6 h-6 text-gray-800 group-hover:text-gray-900 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-6xl mx-auto mt-24 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RevBuilder?</h2>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Fast & Intuitive</h3>
              <p className="text-gray-600">Build your resume in minutes, not hours</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">💻</div>
              <h3 className="font-semibold text-lg mb-2">100% Responsive</h3>
              <p className="text-gray-600">Works perfectly on all devices</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">🧠</div>
              <h3 className="font-semibold text-lg mb-2">Smart Sections</h3>
              <p className="text-gray-600">Pre-built sections for every need</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-gray-600">Offline PDF export, your data stays safe</p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-24 bg-gray-900 text-white -mx-4 px-4">
          <div className="max-w-6xl mx-auto py-12">
            {/* Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="font-bold text-lg mb-4">RevBuilder</h3>
                <p className="text-gray-400 text-sm">
                  Create professional resumes and portfolios that stand out.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/templates" className="text-gray-400 hover:text-white transition-colors">
                      Browse Templates
                    </a>
                  </li>
                  <li>
                    <a href="/examples" className="text-gray-400 hover:text-white transition-colors">
                      Resume Examples
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                      Career Blog
                    </a>
                  </li>
                  <li>
                    <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
                <a 
                  href="mailto:support@revbuilder.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  support@revbuilder.com
                </a>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 RevBuilder. All rights reserved.
              </div>
              <nav className="flex flex-wrap gap-6 text-sm">
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of use
                </a>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
