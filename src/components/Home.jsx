import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = ({ setCurrentPage }) => {
  const [counts, setCounts] = useState({
    biomass: 0,
    carbon: 0,
    depth: 0
  });

  useEffect(() => {
    const duration = 2000;
    const targets = {
      biomass: 10,
      carbon: 35,
      depth: 400
    };

    const increment = (key, target) => {
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          setCounts(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, duration / steps);
    };

    setTimeout(() => {
      increment('biomass', 10);
      increment('carbon', 35);
      increment('depth', 400);
    }, 500);
  }, []);

  return (
    <div className="home-page-new">
      {/* Floating Ocean Particles */}
      <div className="ocean-particles">
        <div className="particle" style={{ left: '5%', animationDelay: '0s', animationDuration: '15s' }}></div>
        <div className="particle" style={{ left: '15%', animationDelay: '2s', animationDuration: '18s' }}></div>
        <div className="particle" style={{ left: '25%', animationDelay: '4s', animationDuration: '20s' }}></div>
        <div className="particle" style={{ left: '35%', animationDelay: '1s', animationDuration: '17s' }}></div>
        <div className="particle" style={{ left: '45%', animationDelay: '3s', animationDuration: '19s' }}></div>
        <div className="particle" style={{ left: '55%', animationDelay: '5s', animationDuration: '16s' }}></div>
        <div className="particle" style={{ left: '65%', animationDelay: '2.5s', animationDuration: '21s' }}></div>
        <div className="particle" style={{ left: '75%', animationDelay: '4.5s', animationDuration: '18s' }}></div>
        <div className="particle" style={{ left: '85%', animationDelay: '1.5s', animationDuration: '22s' }}></div>
        <div className="particle" style={{ left: '95%', animationDelay: '3.5s', animationDuration: '17s' }}></div>

        {/* Larger ambient particles */}
        <div className="particle large" style={{ left: '10%', animationDelay: '6s', animationDuration: '25s' }}></div>
        <div className="particle large" style={{ left: '40%', animationDelay: '8s', animationDuration: '28s' }}></div>
        <div className="particle large" style={{ left: '70%', animationDelay: '10s', animationDuration: '23s' }}></div>
        <div className="particle large" style={{ left: '90%', animationDelay: '12s', animationDuration: '26s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="hero-professional">
        <div className="container-new">
          <div className="hero-content-professional">
            <h1 className="hero-title-professional">
              The ocean has a nightlife we're <span className="gradient-text">dimming it</span>
            </h1>

            <div className="hero-cta">
              <button className="btn-primary-pro" onClick={() => setCurrentPage && setCurrentPage('map')}>
                Explore the Map
              </button>
              <button className="btn-secondary-pro" onClick={() => setCurrentPage && setCurrentPage('learn')}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container-new">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{counts.biomass} Billion</div>
              <div className="stat-label">Tons of Biomass Affected Daily</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counts.carbon}%</div>
              <div className="stat-label">Carbon Sequestration Loss</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counts.depth}m</div>
              <div className="stat-label">Depth of DVM Suppression</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container-new">
          <div className="impact-content">
            <h2>Why This Matters</h2>
            <p>
              Diel Vertical Migration is the largest daily migration of biomass on Earth.
              Artificial light disrupts this natural rhythm, affecting marine ecosystems,
              carbon sequestration, and ocean health worldwide.
            </p>
            <div className="impact-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">🌊</div>
                <h3>Ocean Ecosystems</h3>
                <p>Disrupted feeding patterns affect the entire marine food web</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🌍</div>
                <h3>Climate Impact</h3>
                <p>Reduced carbon sequestration worsens climate change</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🔬</div>
                <h3>Scientific Data</h3>
                <p>Real-time monitoring helps us understand and mitigate impacts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-professional">
        <div className="container-new">
          <div className="cta-content-pro">
            <h2>Explore Marine Light Pollution Data</h2>
            <p>
              Discover how artificial light is disrupting the world's largest biomass migration
            </p>
            <div className="cta-buttons-pro">
              <button className="btn-primary-pro large" onClick={() => setCurrentPage && setCurrentPage('map')}>View Interactive Map</button>
              <button className="btn-secondary-pro large" onClick={() => setCurrentPage && setCurrentPage('learn')}>Learn About DVM</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
