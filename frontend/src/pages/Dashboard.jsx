import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dummyResumes = [
    { id: 1, title: 'Software Developer Resume', lastModified: '2023-12-01' },
    { id: 2, title: 'Project Manager Resume', lastModified: '2023-12-02' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 pt-16">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-100 fixed left-0 top-16 bottom-0">
        <nav className="p-6">
          <Link to="/dashboard" 
            className="flex items-center mb-3 px-4 py-3 text-indigo-600 bg-indigo-50 rounded-lg font-medium transition-all">
            <i className="fas fa-home mr-3"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/resume-builder" 
            className="flex items-center mb-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-all">
            <i className="fas fa-file-alt mr-3"></i>
            <span>Resume Builder</span>
          </Link>
          <Link to="/portfolio-builder" 
            className="flex items-center mb-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-all">
            <i className="fas fa-briefcase mr-3"></i>
            <span>Portfolio Builder</span>
          </Link>
          <Link to="/settings" 
            className="flex items-center mb-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-all">
            <i className="fas fa-cog mr-3"></i>
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-72 mt-4">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your resumes and portfolios</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center">
                <i className="fas fa-filter mr-2"></i> Filter
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center">
                <i className="fas fa-plus mr-2"></i> New Resume
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyResumes.map(resume => (
              <div key={resume.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{resume.title}</h3>
                    <span className="text-sm text-gray-500 flex items-center">
                      <i className="fas fa-clock mr-2"></i>
                      Last modified: {resume.lastModified}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200 font-medium">
                      <i className="fas fa-edit mr-2"></i> Edit
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium">
                      <i className="fas fa-eye mr-2"></i> Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
