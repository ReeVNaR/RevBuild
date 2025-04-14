import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-indigo-600">ResumeBuilder</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
              <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
            </div>
            
            <button className="relative text-gray-600 hover:text-gray-800">
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </button>
            
            <div className="flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=User&background=random"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
