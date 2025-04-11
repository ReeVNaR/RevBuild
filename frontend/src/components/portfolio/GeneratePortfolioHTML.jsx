export const generatePortfolioHTML = ({ portfolioData, sectionSizes }) => {
  const theme = portfolioData.theme || {};
  const hero = portfolioData.hero || {};
  
  const getNavLinkEffectClass = (effect) => {
    switch(effect) {
      case 'underline':
        return 'hover:border-b-2 hover:border-current';
      case 'scale':
        return 'hover:transform hover:scale-110';
      case 'fade':
        return 'hover:opacity-70';
      default:
        return `hover:text-[${portfolioData.navbar?.hoverColor || '#3B82F6'}]`;
    }
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${portfolioData.name || 'My Portfolio'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --color-primary: ${theme.primary || '#3B82F6'};
            --color-secondary: ${theme.secondary || '#1E40AF'};
            --color-accent: ${theme.accent || '#60A5FA'};
            --color-text: ${theme.text || '#111827'};
            --color-background: ${theme.background || '#FFFFFF'};
            --transition-duration: 0.3s;
            --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
        }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        section { min-height: 100vh; display: flex; align-items: center; }
        .container { width: 100%; }
        .mobile-menu { 
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            background-color: rgba(255, 255, 255, 0.98);
        }
        .mobile-menu.active { transform: translateX(0); }
        .hamburger { display: none; }
        @media (max-width: 768px) {
            .hamburger { display: block; }
            .section-padding { padding: 3rem 1rem !important; }
            h1 { font-size: 2rem !important; }
            h2 { font-size: 1.5rem !important; }
            .container { padding: 0 1rem; }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-scroll-indicator {
            animation: scroll 2s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        @keyframes scroll {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(10px); opacity: 0.5; }
        }
        .bg-gradient-animate {
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Professional scrollbar styling */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
        }

        /* Professional link transitions */
        a {
            transition: all var(--transition-duration) var(--ease-out);
        }

        /* Professional section transitions */
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
        }

        section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Professional card hover effects */
        .hover-card {
            transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
        }

        .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }

        /* Glass morphism effect for navbar */
        .glass-nav {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }

        /* Professional text spacing */
        .content-wrapper {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }

        .section-heading {
            font-size: 2.5rem;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            position: relative;
            display: inline-block;
        }

        .section-heading::after {
            content: '';
            position: absolute;
            bottom: -0.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background-color: var(--color-primary);
            border-radius: 2px;
        }

        .section-text {
            max-width: 65ch;
            margin: 0 auto;
            line-height: 1.8;
        }

        @media (max-width: 768px) {
            .section-heading {
                font-size: 2rem;
            }
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').slice(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 64;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        closeMenu();
                    }
                });
            });
        });
    </script>
</head>
<body class="bg-gray-100" style="color: var(--color-text); background: var(--color-background)">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav" 
         style="
           background-color: ${portfolioData.navbar?.backgroundColor ? portfolioData.navbar.backgroundColor.replace(')', ', 0.95)').replace('rgb', 'rgba') : 'rgba(255, 255, 255, 0.95)'};
           height: ${portfolioData.navbar?.height || 64}px;
           border: ${portfolioData.navbar?.borderStyle === 'full' ? `1px solid ${portfolioData.navbar?.borderColor}` : 'none'};
           border-bottom: ${portfolioData.navbar?.borderStyle === 'bottom' ? `1px solid ${portfolioData.navbar?.borderColor}` : ''};
           box-shadow: ${
             portfolioData.navbar?.shadow === 'none' ? 'none' :
             portfolioData.navbar?.shadow === 'sm' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' :
             portfolioData.navbar?.shadow === 'md' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' :
             '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
           };
         ">
        <div class="container mx-auto px-4 h-full">
            <div class="flex justify-between items-center h-full">
                <!-- Logo -->
                <div class="flex items-center h-full">
                    ${portfolioData.navbar?.logoType === 'image' ? 
                      `<img src="${portfolioData.navbar.logoImage}" alt="Logo" class="h-[calc(100%-1rem)] max-h-8 w-auto">` :
                      `<a href="#" class="text-xl font-bold flex items-center h-full" style="color: ${portfolioData.navbar?.textColor}">${portfolioData.navbar?.logoText || portfolioData.name || 'Your Name'}</a>`
                    }
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center h-full">
                    ${['About', 'Skills', 'Contact'].map(item => `
                      <a href="#${item.toLowerCase()}" 
                         class="flex items-center h-full px-4 transition-all duration-300 ${getNavLinkEffectClass(portfolioData.navbar?.linkEffect)}"
                         style="color: ${portfolioData.navbar?.textColor}">
                        ${item}
                      </a>
                    `).join('')}
                </div>

                <!-- Mobile Menu Button -->
                <button class="hamburger md:hidden flex items-center h-full focus:outline-none z-50" 
                    onclick="toggleMenu()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <div id="mobileMenu" class="mobile-menu fixed inset-0 z-40">
            <div class="flex flex-col items-center justify-center h-full space-y-8 text-xl">
                <a href="#about" onclick="closeMenu()" class="text-gray-800 hover:text-blue-600">About</a>
                <a href="#skills" onclick="closeMenu()" class="text-gray-800 hover:text-blue-600">Skills</a>
                <a href="#contact" onclick="closeMenu()" class="text-gray-800 hover:text-blue-600">Contact</a>
            </div>
        </div>
    </nav>

    <script>
        function toggleMenu() {
            document.getElementById('mobileMenu').classList.toggle('active');
            document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('active') ? 'hidden' : '';
        }
        
        function closeMenu() {
            document.getElementById('mobileMenu').classList.remove('active');
            document.body.style.overflow = '';
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Add scroll behavior
        const navbar = document.querySelector('nav');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollBehavior = '${portfolioData.navbar?.scrollBehavior}';
            const currentScroll = window.pageYOffset;
            
            switch(scrollBehavior) {
                case 'hide':
                    navbar.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
                    break;
                case 'shrink':
                    navbar.style.height = currentScroll > 100 ? '48px' : '${portfolioData.navbar?.height || 64}px';
                    break;
                case 'transparent':
                    navbar.style.backgroundColor = currentScroll > 100 ? 
                      '${portfolioData.navbar?.backgroundColor || '#FFFFFF'}' : 'transparent';
                    break;
            }
            lastScroll = currentScroll;
        });

        // Add section reveal animation
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    </script>

    <header class="relative min-h-screen flex items-center justify-center overflow-hidden" 
            style="
              background-color: ${sectionSizes.hero.backgroundColor};
              background-image: ${hero.backgroundImage ? `linear-gradient(rgba(0, 0, 0, ${hero.overlayOpacity}), rgba(0, 0, 0, ${hero.overlayOpacity})), url('${hero.backgroundImage}')` : ''};
              background-size: cover;
              background-position: center;
              color: ${hero.textColor};
            ">
        <div class="container relative mx-auto px-6 py-32 text-center max-w-6xl">
            <div class="space-y-8">
                <div class="space-y-4">
                    <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                        <span class="block">
                            ${portfolioData.name || 'Your Name'}
                        </span>
                    </h1>
                    <p class="text-xl sm:text-2xl md:text-3xl font-light"
                       style="color: ${hero.subtitleColor}">
                        ${portfolioData.title || 'Your Title'}
                    </p>
                    ${portfolioData.hero?.subtitle ? 
                      `<p class="text-lg sm:text-xl max-w-2xl mx-auto opacity-90"
                          style="color: ${hero.subtitleColor}">
                          ${portfolioData.hero.subtitle}
                       </p>` : ''}
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    ${portfolioData.contact?.github || portfolioData.contact?.linkedin ? `
                        <div class="flex items-center space-x-6">
                            ${portfolioData.contact?.github ? `
                                <a href="${portfolioData.contact.github}" 
                                   class="group transition-all duration-300 hover:text-blue-300">
                                    <i class="fab fa-github text-2xl sm:text-3xl"></i>
                                    <span class="sr-only">GitHub Profile</span>
                                </a>` : ''}
                            ${portfolioData.contact?.linkedin ? `
                                <a href="${portfolioData.contact.linkedin}" 
                                   class="group transition-all duration-300 hover:text-blue-300">
                                    <i class="fab fa-linkedin text-2xl sm:text-3xl"></i>
                                    <span class="sr-only">LinkedIn Profile</span>
                                </a>` : ''}
                        </div>
                    ` : ''}
                    ${portfolioData.hero?.ctaButton ? `
                        <a href="${portfolioData.hero.ctaButton.link}"
                           class="inline-flex items-center px-6 py-3 border-2 border-current rounded-lg text-base font-medium transition-all duration-300 hover:bg-white hover:text-gray-900">
                            ${portfolioData.hero.ctaButton.text}
                            <svg class="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    ` : ''}
                </div>
            </div>

            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <a href="#about" 
                   class="inline-flex flex-col items-center text-sm font-medium transition-opacity duration-300 hover:opacity-75">
                    <span class="sr-only">Scroll down</span>
                    <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="py-20" style="background-color: ${sectionSizes.about.backgroundColor};">
        <div class="content-wrapper">
            <div class="text-center">
                <h2 class="section-heading">About Me</h2>
                <div class="section-text prose prose-lg mx-auto">
                    <p class="text-gray-600 leading-relaxed">
                        ${portfolioData.about || 'Tell us about yourself...'}
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20" style="background-color: ${sectionSizes.skills.backgroundColor};">
        <div class="content-wrapper">
            <div class="text-center mb-12">
                <h2 class="section-heading">Skills</h2>
            </div>
            <div class="grid gap-6 md:gap-8" style="
                grid-template-columns: repeat(${sectionSizes.skills.columns}, 1fr);">
                ${Object.entries(portfolioData.skills).map(([category, skills]) => `
                    <div class="bg-white rounded-lg shadow-lg p-6 hover-card">
                        <h3 class="text-xl font-bold mb-4 capitalize">${category.replace('_', ' ')}</h3>
                        <div class="flex flex-wrap gap-2">
                            ${skills.map(skill => `
                                <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                    ${skill}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20" style="background-color: ${sectionSizes.contact.backgroundColor};">
        <div class="content-wrapper">
            <div class="text-center">
                <h2 class="section-heading">Get In Touch</h2>
                <div class="section-text">
                    <p class="text-gray-600 mb-8 text-lg">
                        ${portfolioData.contact?.email || 'your.email@example.com'}
                    </p>
                    <div class="flex justify-center space-x-6">
                        ${portfolioData.contact?.github ? `
                            <a href="${portfolioData.contact.github}" 
                               class="text-gray-600 hover:text-gray-800 transform hover:scale-110 transition-all">
                                <i class="fab fa-github text-3xl"></i>
                            </a>` : ''}
                        ${portfolioData.contact?.linkedin ? `
                            <a href="${portfolioData.contact.linkedin}" 
                               class="text-gray-600 hover:text-gray-800 transform hover:scale-110 transition-all">
                                <i class="fab fa-linkedin text-3xl"></i>
                            </a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>
</body>
</html>`;
};
