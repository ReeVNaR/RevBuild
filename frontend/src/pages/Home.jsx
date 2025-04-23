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

      {/* Hero Section - Full Height */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative animate-fade-in py-20">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-gray-900/5 to-gray-800/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-gray-800/5 to-gray-900/5 rounded-full blur-2xl"></div>
            
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 text-transparent bg-clip-text">
              Craft Stunning Resumes & Portfolios.
            </h1>
            <p className="text-xl lg:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto">
              One powerful platform to build, customize, and export your professional identity.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => window.location.href = '/resume'}
                className="w-full sm:w-auto bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 hover:from-gray-800 hover:to-gray-600"
              >
                Start Your Resume →
              </button>
              <button 
                onClick={() => window.location.href = '/portfolio'}
                className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-medium transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                Create Portfolio →
              </button>
            </div>
            <div className="mt-16 text-sm text-gray-500 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Free Templates
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582A1 1 0 004 6.32V16a1 1 0 001.5.866l4-1.6a1 1 0 01.5 0l4 1.6A1 1 0 0016 16V6.32a1.001 1.001 0 00-.546-.914L11.5 3.822V3a1 1 0 00-1-1zm4 12.386L10 12.786v-2.2l4 1.6v2.2z" clipRule="evenodd"/>
                </svg>
                No Sign-up Required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features + Preview Combined Section */}
      <section className="min-h-screen flex flex-col justify-center py-12">
        {/* Features */}
        <div className="container mx-auto px-4 mb-24">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute -top-40 -right-20 w-72 h-72 bg-gradient-to-r from-gray-900/5 to-gray-800/5 rounded-full blur-3xl"></div>
            <span className="block text-gray-500 text-center font-medium mb-4">FEATURES</span>
            <h2 className="text-4xl font-bold text-center mb-4">What You Can Build</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-16">Choose from our professionally designed templates and customize them to match your style.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">✅</div>
                <h3 className="font-semibold text-xl mb-3">Resume Builder</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Create professional resumes in minutes</p>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="font-semibold text-xl mb-3">Portfolio Builder</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Showcase your projects beautifully</p>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">📄</div>
                <h3 className="font-semibold text-xl mb-3">Export Options</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Export as PDF or share online via custom link</p>
              </div>
              <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">🌈</div>
                <h3 className="font-semibold text-xl mb-3">Multiple Templates</h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Choose from multiple templates & themes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <span className="block text-gray-500 text-center font-medium mb-4">PREVIEW</span>
            <h2 className="text-4xl font-bold text-center mb-4">See It In Action</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-16">Watch how easy it is to create your professional resume or portfolio.</p>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
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
        </div>
      </section>

      {/* Benefits + Footer Combined Section */}
      <section className="min-h-screen flex flex-col">
        {/* Benefits */}
        <div className="flex-1 bg-gray-50/50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto relative">
              <div className="absolute -top-40 -left-20 w-72 h-72 bg-gradient-to-r from-gray-900/5 to-gray-800/5 rounded-full blur-3xl"></div>
              <span className="block text-gray-500 text-center font-medium mb-4">BENEFITS</span>
              <h2 className="text-4xl font-bold text-center mb-4">Why Choose RevBuilder?</h2>
              <p className="text-gray-600 text-center max-w-xl mx-auto mb-16">We provide the tools you need to create impressive professional documents.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">⚡</div>
                  <h3 className="font-semibold text-xl mb-3">Fast & Intuitive</h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Build your resume in minutes, not hours</p>
                </div>
                <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">💻</div>
                  <h3 className="font-semibold text-xl mb-3">100% Responsive</h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Works perfectly on all devices</p>
                </div>
                <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">🧠</div>
                  <h3 className="font-semibold text-xl mb-3">Smart Sections</h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Pre-built sections for every need</p>
                </div>
                <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">🔒</div>
                  <h3 className="font-semibold text-xl mb-3">Privacy First</h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">Offline PDF export, your data stays safe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="container mx-auto px-4">
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
          </div>
        </footer>
      </section>
    </div>
  );
}
