import React from 'react';
import './Learn.css';

const Learn = () => {
  return (
    <div className="learn-page">
      {/* Hero */}
      <section className="learn-hero">
        <div className="container">
          <h1 className="page-title">Understanding the Ocean's Nightlife</h1>
          <p className="page-subtitle">
            Explore the science behind Diel Vertical Migration and why light pollution matters
          </p>
        </div>
      </section>

      {/* Education Cards */}
      <section className="education-section">
        <div className="container">
          <div className="education-grid">
            
            {/* Card 1: What is DVM? */}
            <div className="education-card">
              <div className="card-header">
                <div className="card-icon">🌙</div>
                <h2>What is Diel Vertical Migration?</h2>
              </div>
              <div className="card-content">
                <p>
                  Every single night, an incredible phenomenon occurs beneath the ocean's surface. 
                  Billions of marine organisms—from tiny zooplankton to large fish—embark on the 
                  largest migration of biomass on our planet.
                </p>
                
                <p>
                  <strong>This is Diel Vertical Migration (DVM)</strong>, and it happens like clockwork:
                </p>
                
                <div className="info-box">
                  <div className="info-item">
                    <span className="time-icon">🌅</span>
                    <div>
                      <strong>Dawn</strong>
                      <p>Organisms descend to deep waters (200-1000m) to hide from predators</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="time-icon">🌆</span>
                    <div>
                      <strong>Dusk</strong>
                      <p>Under darkness, they rise to surface waters to feed on phytoplankton</p>
                    </div>
                  </div>
                </div>
                
                <div className="stat-highlight">
                  <div className="stat-big">10 billion tons</div>
                  <p>of biomass participates in DVM every night—more than all wild land animals combined!</p>
                </div>
              </div>
            </div>

            {/* Card 2: How Light Disrupts It */}
            <div className="education-card">
              <div className="card-header">
                <div className="card-icon">💡</div>
                <h2>How Light Disrupts the Migration</h2>
              </div>
              <div className="card-content">
                <p>
                  Artificial light from ships, oil platforms, and coastal cities creates an 
                  invisible barrier in the ocean, fundamentally disrupting the natural rhythm of DVM.
                </p>
                
                <h3>The Impact Cascade:</h3>
                
                <div className="impact-chain">
                  <div className="impact-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Detection</h4>
                      <p>Marine organisms sense artificial light and perceive it as "daylight"</p>
                    </div>
                  </div>
                  <div className="arrow-down">↓</div>
                  <div className="impact-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Behavioral Change</h4>
                      <p>They avoid lit areas or delay migration, staying deeper than normal</p>
                    </div>
                  </div>
                  <div className="arrow-down">↓</div>
                  <div className="impact-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Feeding Disruption</h4>
                      <p>Miss critical feeding opportunities, reducing energy and reproduction</p>
                    </div>
                  </div>
                  <div className="arrow-down">↓</div>
                  <div className="impact-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Ecosystem Effect</h4>
                      <p>Impacts ripple through food web—affecting fish to whales</p>
                    </div>
                  </div>
                </div>
                
                <div className="warning-box">
                  <strong>⚠️ Research shows:</strong>
                  <ul>
                    <li>Light pollution can suppress DVM by up to 400 meters depth</li>
                    <li>Effects extend over 2 km horizontally from light sources</li>
                    <li>Even low levels of light can alter behavior</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3: What Can We Do? */}
            <div className="education-card">
              <div className="card-header">
                <div className="card-icon">✨</div>
                <h2>What Can We Do?</h2>
              </div>
              <div className="card-content">
                <p>
                  The good news? We can take meaningful action to protect the ocean's nightlife. 
                  Solutions exist at multiple levels—from individual choices to industry standards.
                </p>
                
                <div className="solutions-grid">
                  <div className="solution-card">
                    <div className="solution-icon">🚢</div>
                    <h4>Maritime Industry</h4>
                    <ul>
                      <li>Dim or turn off non-essential deck lighting</li>
                      <li>Use red/amber lights instead of white/blue</li>
                      <li>Shield lights to point downward</li>
                      <li>Adopt "dark ship" protocols</li>
                    </ul>
                  </div>
                  
                  <div className="solution-card">
                    <div className="solution-icon">🏙️</div>
                    <h4>Coastal Communities</h4>
                    <ul>
                      <li>Install ocean-friendly lighting</li>
                      <li>Use warmer color temperatures</li>
                      <li>Reduce unnecessary illumination</li>
                      <li>Support "dark sky" initiatives</li>
                    </ul>
                  </div>
                  
                  <div className="solution-card">
                    <div className="solution-icon">🛢️</div>
                    <h4>Offshore Operations</h4>
                    <ul>
                      <li>Minimize platform lighting</li>
                      <li>Use directional lighting</li>
                      <li>Conduct environmental audits</li>
                      <li>Implement seasonal reductions</li>
                    </ul>
                  </div>
                  
                  <div className="solution-card">
                    <div className="solution-icon">🔬</div>
                    <h4>Research & Policy</h4>
                    <ul>
                      <li>Map light pollution hotspots</li>
                      <li>Establish marine "dark zones"</li>
                      <li>Create lighting standards</li>
                      <li>Monitor migration patterns</li>
                    </ul>
                  </div>
                </div>
                
                <div className="action-box">
                  <h3>🌟 Individual Actions</h3>
                  <p>Even if you're not in the maritime industry, you can help:</p>
                  <div className="action-list">
                    <div className="action-item">
                      <span className="check">✓</span>
                      <span>Support marine conservation organizations</span>
                    </div>
                    <div className="action-item">
                      <span className="check">✓</span>
                      <span>Reduce coastal light pollution</span>
                    </div>
                    <div className="action-item">
                      <span className="check">✓</span>
                      <span>Spread awareness about DVM</span>
                    </div>
                    <div className="action-item">
                      <span className="check">✓</span>
                      <span>Advocate for ocean-friendly policies</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="resources-section">
        <div className="container">
          <h2>Learn More</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h4>📚 Scientific Papers</h4>
              <p>Explore peer-reviewed research on DVM and light pollution</p>
            </div>
            <div className="resource-card">
              <h4>🌍 Conservation Groups</h4>
              <p>Connect with organizations protecting marine ecosystems</p>
            </div>
            <div className="resource-card">
              <h4>💡 Best Practices</h4>
              <p>Technical guidelines for ocean-friendly lighting</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learn;
