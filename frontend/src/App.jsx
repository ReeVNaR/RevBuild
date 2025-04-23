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
      className={`relative px-4 py-2 rounded-md transition-all duration-200 font-medium text-base 
        hover:text-white group ${isActive ? 'text-white' : 'text-gray-300'}`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left 
        transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0'} 
        group-hover:scale-x-100`}>
      </span>
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
        <div className="container mx-auto h-16 px-8">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="text-2xl font-bold text-white hover:opacity-90 transition-opacity">
              ReVBuilder
            </Link>
            <div className="flex items-center gap-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/resume">Resume</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
    </Router>
  );
}