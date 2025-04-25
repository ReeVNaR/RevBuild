import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Portfolio = () => {
  const previewRef = useRef(null);
  const [activeTab, setActiveTab] = useState('navbar');  // Changed default tab
  const [content, setContent] = useState({
    navbar: {
      logo: "Your Brand",
      items: [
        { title: 'Home', href: '#home' },
        { title: 'About', href: '#about' },
        { title: 'Skills', href: '#skills' },
        { title: 'Projects', href: '#projects' },
        { title: 'Contact', href: '#contact' },
      ]
    },
    hero: {
      name: "Your Name",
      title: "Full Stack Developer",
    },
    about: {
      description: "Your professional summary and background",
    },
    skills: ["React", "JavaScript", "Node.js", "Python", "CSS", "HTML"],
    projects: [
      {
        title: "Project Name",
        description: "Project description",
        image: "project-image.jpg",
        demo: "#",
        github: "#"
      }
    ],
    contact: {
      email: "",
      message: ""
    }
  });

  const inputClass = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
  const sectionClass = "bg-white p-6 rounded-lg shadow-md mb-6";
  const headerClass = "text-xl font-semibold mb-4 text-gray-800";

  const tabs = [
    { id: 'navbar', label: 'Navigation' },
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const renderEditorContent = () => {
    switch(activeTab) {
      case 'navbar':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Brand/Logo Text</label>
              <input
                type="text"
                value={content.navbar.logo}
                onChange={(e) => setContent({
                  ...content,
                  navbar: { ...content.navbar, logo: e.target.value }
                })}
                className={inputClass}
                placeholder="Your Brand Name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Navigation Items</label>
              {content.navbar.items.map((item, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...content.navbar.items];
                      newItems[index].title = e.target.value;
                      setContent({
                        ...content,
                        navbar: { ...content.navbar, items: newItems }
                      });
                    }}
                    className={`${inputClass} flex-1`}
                    placeholder="Menu Item"
                  />
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => {
                      const newItems = [...content.navbar.items];
                      newItems[index].href = e.target.value;
                      setContent({
                        ...content,
                        navbar: { ...content.navbar, items: newItems }
                      });
                    }}
                    className={`${inputClass} flex-1`}
                    placeholder="Link (#section)"
                  />
                  <button
                    onClick={() => {
                      const newItems = content.navbar.items.filter((_, i) => i !== index);
                      setContent({
                        ...content,
                        navbar: { ...content.navbar, items: newItems }
                      });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => setContent({
                  ...content,
                  navbar: {
                    ...content.navbar,
                    items: [...content.navbar.items, { title: '', href: '' }]
                  }
                })}
                className="w-full mt-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                + Add Menu Item
              </button>
            </div>
          </div>
        );
      case 'hero':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={content.hero.name}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, name: e.target.value }
                })}
                className={inputClass}
                placeholder="Your Name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                className={inputClass}
                placeholder="Your Professional Title"
              />
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
            <textarea
              value={content.about.description}
              onChange={(e) => setContent({
                ...content,
                about: { description: e.target.value }
              })}
              className={`${inputClass} min-h-[200px] resize-none`}
              placeholder="Write your professional summary here..."
            />
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Skills</label>
            <div className="space-y-2">
              {content.skills.map((skill, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...content.skills];
                      newSkills[index] = e.target.value;
                      setContent({ ...content, skills: newSkills });
                    }}
                    className={inputClass}
                    placeholder="Skill"
                  />
                  <button
                    onClick={() => {
                      const newSkills = content.skills.filter((_, i) => i !== index);
                      setContent({ ...content, skills: newSkills });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => setContent({
                  ...content,
                  skills: [...content.skills, '']
                })}
                className="w-full mt-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                + Add Skill
              </button>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            {content.projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Project {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newProjects = content.projects.filter((_, i) => i !== index);
                      setContent({ ...content, projects: newProjects });
                    }}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...content.projects];
                    newProjects[index] = { ...project, title: e.target.value };
                    setContent({ ...content, projects: newProjects });
                  }}
                  className={inputClass}
                  placeholder="Project Title"
                />
                <textarea
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...content.projects];
                    newProjects[index] = { ...project, description: e.target.value };
                    setContent({ ...content, projects: newProjects });
                  }}
                  className={`${inputClass} min-h-[100px]`}
                  placeholder="Project Description"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={project.demo}
                    onChange={(e) => {
                      const newProjects = [...content.projects];
                      newProjects[index] = { ...project, demo: e.target.value };
                      setContent({ ...content, projects: newProjects });
                    }}
                    className={inputClass}
                    placeholder="Demo URL"
                  />
                  <input
                    type="text"
                    value={project.github}
                    onChange={(e) => {
                      const newProjects = [...content.projects];
                      newProjects[index] = { ...project, github: e.target.value };
                      setContent({ ...content, projects: newProjects });
                    }}
                    className={inputClass}
                    placeholder="GitHub URL"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => setContent({
                ...content,
                projects: [...content.projects, {
                  title: '',
                  description: '',
                  image: '',
                  demo: '',
                  github: ''
                }]
              })}
              className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + Add Project
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, email: e.target.value }
                })}
                className={inputClass}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Message</label>
              <textarea
                value={content.contact.message}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, message: e.target.value }
                })}
                className={`${inputClass} min-h-[100px]`}
                placeholder="Your contact message..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const downloadHTML = () => {
    if (!previewRef.current) return;
    
    const previewContent = previewRef.current.innerHTML;
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${content.hero.name} - Portfolio</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            html {
              scroll-behavior: smooth;
            }
            .nav-sticky {
              position: sticky;
              top: 0;
              z-index: 50;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(8px);
            }
          </style>
        </head>
        <body class="min-h-screen bg-gray-50">
          ${previewContent}
          <script>
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                  behavior: 'smooth'
                });
              });
            });
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([htmlTemplate], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Editor Section */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-1/2 bg-gray-100 overflow-hidden flex flex-col"
      >
        {/* Header with Download Button */}
        <div className="bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Portfolio Editor</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadHTML}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export HTML</span>
          </motion.button>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b px-6">
          <nav className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={sectionClass}
            >
              {renderEditorContent()}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Preview Section */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-1/2 relative overflow-y-auto scroll-smooth bg-gradient-to-br from-gray-50 to-white"
      >
        <div ref={previewRef} className="min-h-screen">
          <nav className="nav-sticky">
            <Navbar brand={content.navbar.logo} items={content.navbar.items} />
          </nav>
          <main>
            <div id="home" className="snap-start min-h-screen relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0" />
              <div className="relative z-10 pt-16">
                <Hero name={content.hero.name} title={content.hero.title} />
              </div>
            </div>
            <div id="about" className="snap-start min-h-screen bg-white pt-16">
              <About description={content.about.description} />
            </div>
            <div id="skills" className="snap-start min-h-screen bg-gray-50 pt-16">
              <Skills skills={content.skills} />
            </div>
            <div id="projects" className="snap-start min-h-screen bg-white pt-16">
              <Projects projects={content.projects} />
            </div>
            <div id="contact" className="snap-start min-h-screen bg-gray-50 pt-16">
              <Contact />
            </div>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
