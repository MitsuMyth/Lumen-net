import React, { useRef, useEffect, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import './Globe3D.css';

const Globe3D = ({ onLebanonClick, selectedLocation }) => {
  const globeEl = useRef();
  const [globeReady, setGlobeReady] = useState(false);

  // Country-level shore data with DVM impact
  const countryShores = useMemo(() => [
    {
      id: 'lebanon',
      name: 'Lebanon',
      lat: 33.8547,
      lng: 35.8623,
      biodiversityScore: 82,
      lightPollution: 25, // average lux
      dvmSuppression: 90, // average meters
      coastlineLength: 225, // km
      marineProtectedAreas: 2,
      size: 0.8,
      clickable: true,
      description: '225km Mediterranean coastline with 2 marine protected areas'
    },
    {
      id: 'egypt',
      name: 'Egypt',
      lat: 27.0,
      lng: 33.5,
      biodiversityScore: 78,
      lightPollution: 35,
      dvmSuppression: 120,
      coastlineLength: 2450,
      marineProtectedAreas: 5,
      size: 1.2,
      clickable: false,
      description: 'Red Sea & Mediterranean coasts, rich coral reefs'
    },
    {
      id: 'israel',
      name: 'Israel',
      lat: 31.5,
      lng: 34.8,
      biodiversityScore: 75,
      lightPollution: 40,
      dvmSuppression: 150,
      coastlineLength: 273,
      marineProtectedAreas: 4,
      size: 0.7,
      clickable: false,
      description: 'Mediterranean & Red Sea coasts'
    },
    {
      id: 'syria',
      name: 'Syria',
      lat: 35.0,
      lng: 35.8,
      biodiversityScore: 70,
      lightPollution: 30,
      dvmSuppression: 110,
      coastlineLength: 193,
      marineProtectedAreas: 1,
      size: 0.7,
      clickable: false,
      description: 'Short Mediterranean coastline'
    },
    {
      id: 'turkey',
      name: 'Turkey',
      lat: 39.0,
      lng: 35.0,
      biodiversityScore: 85,
      lightPollution: 28,
      dvmSuppression: 100,
      coastlineLength: 7200,
      marineProtectedAreas: 15,
      size: 1.5,
      clickable: false,
      description: 'Extensive Mediterranean, Aegean & Black Sea coasts'
    },
    {
      id: 'cyprus',
      name: 'Cyprus',
      lat: 35.0,
      lng: 33.0,
      biodiversityScore: 88,
      lightPollution: 15,
      dvmSuppression: 70,
      coastlineLength: 650,
      marineProtectedAreas: 8,
      size: 0.8,
      clickable: false,
      description: 'Island nation with diverse marine ecosystems'
    },
    {
      id: 'greece',
      name: 'Greece',
      lat: 38.0,
      lng: 23.0,
      biodiversityScore: 90,
      lightPollution: 20,
      dvmSuppression: 80,
      coastlineLength: 13676,
      marineProtectedAreas: 25,
      size: 1.5,
      clickable: false,
      description: 'Extensive coastline & island systems'
    },
    {
      id: 'italy',
      name: 'Italy',
      lat: 42.0,
      lng: 13.0,
      biodiversityScore: 87,
      lightPollution: 32,
      dvmSuppression: 105,
      coastlineLength: 7600,
      marineProtectedAreas: 30,
      size: 1.5,
      clickable: false,
      description: 'Peninsula with diverse Mediterranean habitats'
    },
    {
      id: 'spain',
      name: 'Spain',
      lat: 40.0,
      lng: -3.5,
      biodiversityScore: 86,
      lightPollution: 25,
      dvmSuppression: 95,
      coastlineLength: 4964,
      marineProtectedAreas: 20,
      size: 1.4,
      clickable: false,
      description: 'Mediterranean & Atlantic coasts'
    },
    {
      id: 'france',
      name: 'France',
      lat: 43.3,
      lng: 5.4,
      biodiversityScore: 89,
      lightPollution: 22,
      dvmSuppression: 85,
      coastlineLength: 3427,
      marineProtectedAreas: 18,
      size: 1.3,
      clickable: false,
      description: 'Mediterranean coastline with protected areas'
    }
  ], []);

  // Arcs showing DVM disruption patterns in Mediterranean
  const disruptionArcs = useMemo(() => {
    const arcs = [];
    const highImpactCountries = countryShores.filter(c => c.lightPollution > 30);

    highImpactCountries.forEach(country => {
      // Create arcs from high-impact countries to nearby areas
      const nearbyCountries = countryShores.filter(c =>
        c.id !== country.id &&
        Math.abs(c.lat - country.lat) < 10 &&
        Math.abs(c.lng - country.lng) < 10
      );

      nearbyCountries.forEach(nearby => {
        arcs.push({
          startLat: country.lat,
          startLng: country.lng,
          endLat: nearby.lat,
          endLng: nearby.lng,
          color: country.lightPollution > 35 ? '#F25C54' : '#FFA500'
        });
      });
    });

    return arcs;
  }, [countryShores]);

  // Initialize globe position - focus on Mediterranean
  useEffect(() => {
    if (globeEl.current && globeReady) {
      globeEl.current.pointOfView({
        lat: 36.0,
        lng: 25.0,
        altitude: 2.8
      }, 1000);

      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.2;
      globeEl.current.controls().enableZoom = true;
    }
  }, [globeReady]);

  // Focus on Lebanon when selected
  useEffect(() => {
    if (selectedLocation && globeEl.current && globeReady) {
      const lebanon = countryShores.find(c => c.id === 'lebanon');
      if (lebanon) {
        globeEl.current.pointOfView({
          lat: lebanon.lat,
          lng: lebanon.lng,
          altitude: 1.5
        }, 2000);
        globeEl.current.controls().autoRotate = false;
      }
    }
  }, [selectedLocation, globeReady, countryShores]);

  const getBiodiversityColor = (score) => {
    if (score >= 90) return '#00ff7f';
    if (score >= 85) return '#3BE8B0';
    if (score >= 80) return '#58B1F0';
    if (score >= 75) return '#FFA500';
    return '#F25C54';
  };

  const getSuppressionColor = (suppression) => {
    if (suppression < 80) return '#3BE8B0';
    if (suppression < 100) return '#58B1F0';
    if (suppression < 120) return '#FFA500';
    return '#F25C54';
  };

  const handleCountryClick = (country) => {
    if (country.clickable && country.id === 'lebanon') {
      onLebanonClick();
    }
  };

  const zoomToMediterranean = () => {
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: 36.0,
        lng: 25.0,
        altitude: 2.8
      }, 1500);
      globeEl.current.controls().autoRotate = true;
    }
  };

  const zoomToGlobal = () => {
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: 20,
        lng: 0,
        altitude: 3.5
      }, 1500);
    }
  };

  return (
    <div className="globe-container">
      <div className="globe-wrapper">
        <Globe
          ref={globeEl}
          onGlobeReady={() => setGlobeReady(true)}

          // Globe appearance
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

          // Atmosphere with glow
          atmosphereColor="#3BE8B0"
          atmosphereAltitude={0.2}

          // Country shore markers
          pointsData={countryShores}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={d => d.size / 3}
          pointColor={d => getBiodiversityColor(d.biodiversityScore)}
          pointLabel={d => `
            <div class="globe-tooltip country-tooltip">
              <div class="tooltip-header">
                <span class="tooltip-icon">🌊</span>
                <span class="tooltip-title">${d.name}</span>
              </div>
              <div class="tooltip-stats">
                <div class="tooltip-stat">
                  <span class="stat-label">Coastline</span>
                  <span class="stat-value">${d.coastlineLength} km</span>
                </div>
                <div class="tooltip-stat">
                  <span class="stat-label">Biodiversity Score</span>
                  <span class="stat-value" style="color: ${getBiodiversityColor(d.biodiversityScore)}">${d.biodiversityScore}/100</span>
                </div>
                <div class="tooltip-stat">
                  <span class="stat-label">DVM Suppression</span>
                  <span class="stat-value" style="color: ${getSuppressionColor(d.dvmSuppression)}">${d.dvmSuppression}m</span>
                </div>
                <div class="tooltip-stat">
                  <span class="stat-label">Protected Areas</span>
                  <span class="stat-value">${d.marineProtectedAreas}</span>
                </div>
                <div class="tooltip-stat">
                  <span class="stat-label">Light Pollution</span>
                  <span class="stat-value">${d.lightPollution} lux</span>
                </div>
              </div>
              <div class="tooltip-description">${d.description}</div>
              ${d.clickable ? '<div class="tooltip-action">🔍 Click to explore cities</div>' : ''}
            </div>
          `}
          onPointClick={handleCountryClick}

          // Disruption arcs
          arcsData={disruptionArcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcStroke={0.4}
          arcDashLength={0.6}
          arcDashGap={0.3}
          arcDashAnimateTime={3000}

          // Rings for high-impact countries
          ringsData={countryShores.filter(d => d.lightPollution > 30)}
          ringLat="lat"
          ringLng="lng"
          ringMaxRadius={d => d.size * 2}
          ringPropagationSpeed={1.2}
          ringRepeatPeriod={3500}
          ringColor={() => t => `rgba(242, 92, 84, ${Math.sqrt(1 - t) * 0.5})`}

          // Animation
          animateIn={true}
          enablePointerInteraction={true}
        />
      </div>

      {/* Enhanced Globe Controls */}
      <div className="globe-controls-panel">
        <div className="control-section">
          <h4>🗺️ Navigation</h4>
          <div className="control-buttons">
            <button className="globe-control-btn primary" onClick={zoomToMediterranean}>
              <span className="btn-icon">🌊</span>
              <span>Mediterranean Focus</span>
            </button>
            <button className="globe-control-btn" onClick={zoomToGlobal}>
              <span className="btn-icon">🌍</span>
              <span>Global View</span>
            </button>
          </div>
        </div>

        <div className="control-section stats">
          <h4>📊 Mediterranean Stats</h4>
          <div className="stat-item">
            <span className="stat-icon">🌊</span>
            <div className="stat-info">
              <span className="stat-label">Countries</span>
              <span className="stat-value">{countryShores.length}</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🛡️</span>
            <div className="stat-info">
              <span className="stat-label">Protected Areas</span>
              <span className="stat-value">
                {countryShores.reduce((sum, c) => sum + c.marineProtectedAreas, 0)}
              </span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚠️</span>
            <div className="stat-info">
              <span className="stat-label">High Impact Zones</span>
              <span className="stat-value">
                {countryShores.filter(c => c.lightPollution > 30).length}
              </span>
            </div>
          </div>
        </div>

        <div className="control-section">
          <div className="info-note">
            <span className="info-icon">💡</span>
            <p>Click on Lebanon to explore detailed city-level data</p>
          </div>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="globe-legend-panel">
        <div className="legend-section">
          <h4>🎯 Biodiversity Score</h4>
          <div className="legend-grid">
            <div className="legend-row">
              <div className="legend-indicator" style={{ background: '#00ff7f' }}></div>
              <span>Exceptional (90+)</span>
            </div>
            <div className="legend-row">
              <div className="legend-indicator" style={{ background: '#3BE8B0' }}></div>
              <span>High (85-89)</span>
            </div>
            <div className="legend-row">
              <div className="legend-indicator" style={{ background: '#58B1F0' }}></div>
              <span>Good (80-84)</span>
            </div>
            <div className="legend-row">
              <div className="legend-indicator" style={{ background: '#FFA500' }}></div>
              <span>Medium (75-79)</span>
            </div>
            <div className="legend-row">
              <div className="legend-indicator" style={{ background: '#F25C54' }}></div>
              <span>At Risk (&lt;75)</span>
            </div>
          </div>
        </div>

        <div className="legend-section">
          <h4>🌊 DVM Impact</h4>
          <div className="legend-note">
            <p>Light pollution suppresses natural vertical migration patterns, affecting carbon sequestration and marine food webs</p>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {!globeReady && (
        <div className="globe-loading">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <div className="loading-waves">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          </div>
          <div className="loading-text">Initializing Global View...</div>
          <div className="loading-subtext">Loading Mediterranean shore data</div>
        </div>
      )}
    </div>
  );
};

export default Globe3D;
