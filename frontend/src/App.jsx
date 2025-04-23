import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/resume" className="text-white hover:text-gray-300">Resume</Link>
          <Link to="/portfolio" className="text-white hover:text-gray-300">Portfolio</Link>
        </div>
      </nav>
      
      <main className="py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
    </Router>
  );
}