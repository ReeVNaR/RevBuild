import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
            <img src="project-image.jpg" alt="Project" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Project Name</h3>
              <p className="text-gray-600 mb-4">Project description</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600">Demo</a>
                <a href="#" className="text-blue-600">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
