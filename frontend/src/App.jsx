import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
        isActive
          ? 'text-white bg-white/10'
          : 'text-gray-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg h-12"> {/* Fixed height */}
        <div className="container mx-auto h-full px-6">
          <div className="flex items-center justify-between h-full">
            <div className="text-xl font-bold text-white">
              ReVBuilder
            </div>
            <div className="flex items-center space-x-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/resume">Resume</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="h-[calc(100vh-48px)]"> {/* Adjusted height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
    </Router>
  );
}