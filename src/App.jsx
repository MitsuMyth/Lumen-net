import React, { useState } from 'react';
import './App.css';
import Home from './components/Home.jsx';
import MapPage from './components/MapPage.jsx';
import Learn from './components/Learn.jsx';
import Luma from './components/Luma.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'map':
        return <MapPage />;
      case 'learn':
        return <Learn />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🌊</span>
            <span className="logo-text">LumenNet</span>
          </div>
          <ul className="nav-links">
            <li>
              <button 
                className={currentPage === 'home' ? 'active' : ''} 
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={currentPage === 'map' ? 'active' : ''} 
                onClick={() => setCurrentPage('map')}
              >
                Map
              </button>
            </li>
            <li>
              <button 
                className={currentPage === 'learn' ? 'active' : ''} 
                onClick={() => setCurrentPage('learn')}
              >
                Learn
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      {renderPage()}

      {/* AI Assistant - Luma (available on all pages) */}
      <Luma />
    </div>
  );
}

export default App;
