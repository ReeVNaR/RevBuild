import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import PortfolioBuilder from './pages/PortfolioBuilder';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
