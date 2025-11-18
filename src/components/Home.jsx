import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles on mount
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: Math.random() * 10 + 10
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="ocean-background">
          <div className="particles-container">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.left}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </div>
          <div className="wave-overlay" />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            The Ocean Has a <span className="highlight">Nightlife</span><br />
            We're Dimming It.
          </h1>
          <p className="hero-subtitle">
            Exploring how artificial light disrupts the ocean's nightly rhythm
          </p>
          <button className="cta-button" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <span>Explore the Impact</span>
            <span className="arrow">→</span>
          </button>
        </div>
        
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="explanation">
        <div className="container">
          <div className="explanation-grid">
            <div className="explanation-card fade-in">
              <div className="card-icon">🌙</div>
              <p>
                Every night, billions of organisms rise and fall through the ocean — 
                a process called <strong>Diel Vertical Migration</strong>.
              </p>
            </div>
            <div className="explanation-card fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="card-icon">💡</div>
              <p>
                Artificial light from ships and cities is <strong>disrupting this rhythm</strong>, 
                affecting the entire marine food web.
              </p>
            </div>
            <div className="explanation-card fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="card-icon">🗺️</div>
              <p>
                Explore how the ocean's glow has changed and discover areas at risk 
                across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10 Billion</div>
              <div className="stat-label">Tons of biomass migrate nightly</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">400m</div>
              <div className="stat-label">Depth range of migration</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">70%</div>
              <div className="stat-label">Of ocean surface affected by light</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to explore the data?</h2>
          <p>Discover which ocean regions are most affected by artificial light pollution</p>
          <button className="cta-button secondary">
            <span>Open Interactive Map</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
