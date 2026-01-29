import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LebaneseMarineMapPage.css';
import Globe3D from './Globe3D';
import DVMSimulator from './DVMSimulator';

const LebaneseMarineMapPage = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // Start with 3D globe

  // Enhanced Lebanon location data with accurate DVM calculations
  const lebanonLocations = {
    'Palm Islands Reserve': {
      coords: [34.5067, 35.7000],
      type: 'marine',
      biodiversityScore: 92,
      status: 'protected',
      category: 'marine_reserve',
      threatLevel: 'low',
      waterQuality: 'Good',
      temperature: '22°C',
      depth: '5-40m',
      protectedSince: '1992',
      description: 'Lebanon\'s northernmost marine protected area. Home to endangered Mediterranean monk seals and nesting site for loggerhead turtles.',
      keySpecies: ['Mediterranean Monk Seal', 'Loggerhead Turtles', 'Seabirds', 'Posidonia Meadows'],
      dvmData: {
        lightPollutionLux: 0.05,
        dvmSuppressionDepth: 20,
        waterClarity: 'clear',
        avgDepth: 22.5,
        feedingEfficiency: 0.95,
        carbonSequestration: -5
      }
    },
    'Tyre Coast Reserve': {
      coords: [33.2733, 35.1943],
      type: 'marine',
      biodiversityScore: 88,
      status: 'protected',
      category: 'unesco_site',
      threatLevel: 'medium',
      waterQuality: 'Good',
      temperature: '24°C',
      depth: '0-25m',
      protectedSince: '1998',
      description: 'UNESCO World Heritage marine area. Critical nesting beach for sea turtles and home to unique vermetid reef formations.',
      keySpecies: ['Green Turtles', 'Hawksbill Turtles', 'Vermetid Reefs', 'Endemic Fish'],
      dvmData: {
        lightPollutionLux: 0.5,
        dvmSuppressionDepth: 50,
        waterClarity: 'clear',
        avgDepth: 12.5,
        feedingEfficiency: 0.85,
        carbonSequestration: -12
      }
    },
    'Tripoli Coast': {
      coords: [34.4333, 35.8167],
      type: 'marine',
      biodiversityScore: 75,
      status: 'proposed',
      category: 'seagrass_meadow',
      threatLevel: 'medium',
      waterQuality: 'Fair',
      temperature: '21°C',
      depth: '2-30m',
      protectedSince: 'Proposed 2025',
      description: 'Important seagrass meadows of Cymodocea nodosa. Part of proposed MPA network with rich coralligenous assemblages.',
      keySpecies: ['Seagrass Meadows', 'Coralligenous Communities', 'Endemic Fish'],
      dvmData: {
        lightPollutionLux: 15,
        dvmSuppressionDepth: 100,
        waterClarity: 'moderate',
        avgDepth: 16,
        feedingEfficiency: 0.70,
        carbonSequestration: -22
      }
    },
    'Beirut Marine Area': {
      coords: [33.8938, 35.5018],
      type: 'marine',
      biodiversityScore: 65,
      status: 'urban',
      category: 'urban_coast',
      threatLevel: 'high',
      waterQuality: 'Poor',
      temperature: '23°C',
      depth: '0-50m',
      protectedSince: 'None',
      description: 'Urban coastal waters with moderate biodiversity. Affected by port activities but still supports some marine life.',
      keySpecies: ['Migratory Fish', 'Coastal Birds', 'Marine Algae'],
      dvmData: {
        lightPollutionLux: 80,
        dvmSuppressionDepth: 200,
        waterClarity: 'turbid',
        avgDepth: 25,
        feedingEfficiency: 0.50,
        carbonSequestration: -35
      }
    }
  };

  const getColorForBiodiversity = (score) => {
    if (score >= 90) return '#00ff7f';
    if (score >= 80) return '#3BE8B0';
    if (score >= 70) return '#58B1F0';
    if (score >= 60) return '#FFA500';
    return '#F25C54';
  };

  const getIconForType = (category) => {
    if (category === 'marine_reserve') return '🏝️';
    if (category === 'unesco_site') return '🏛️';
    if (category === 'seagrass_meadow') return '🌿';
    if (category === 'urban_coast') return '🏙️';
    return '📍';
  };

  // Initialize map with all markers visible - NO POPUPS
  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current && viewMode === '2d') {
      const map = L.map(mapRef.current, {
        center: [33.8547, 35.8623],
        zoom: 9,
        minZoom: 7,
        maxZoom: 14
      });

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri'
      }).addTo(map);

      const lebanonBounds = [[33.0, 35.0], [34.7, 36.7]];
      L.rectangle(lebanonBounds, {
        color: '#3BE8B0',
        weight: 3,
        fillOpacity: 0.05,
        opacity: 0.8,
        dashArray: '5, 10'
      }).addTo(map);

      // Add all locations - no popups, just markers
      Object.keys(lebanonLocations).forEach(locationName => {
        const data = lebanonLocations[locationName];
        const color = getColorForBiodiversity(data.biodiversityScore);

        const marker = L.circleMarker(data.coords, {
          color: '#ffffff',
          fillColor: color,
          fillOpacity: 0.9,
          opacity: 1,
          radius: 12,
          weight: 3
        }).addTo(map);

        marker.on('click', () => {
          setSelectedLocation({ name: locationName, ...data });
          map.flyTo(data.coords, 11, { duration: 1.5 });
        });
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current && viewMode !== '2d') {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode]);

  // Handle Globe Lebanon click - switch to 2D view
  const handleLebanonClick = () => {
    setViewMode('2d');
  };

  return (
    <div className="lebanese-map-page">
      {/* View Mode Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === '2d' ? 'active' : ''}`}
          onClick={() => setViewMode('2d')}
        >
          🗺️ Lebanon Detailed
        </button>
        <button
          className={`toggle-btn ${viewMode === '3d' ? 'active' : ''}`}
          onClick={() => setViewMode('3d')}
        >
          🌍 Global View
        </button>
      </div>

      <div className="map-container">
        {/* Conditional rendering: 2D Map or 3D Globe */}
        {viewMode === '2d' ? (
          <>
            <div ref={mapRef} className="map" />

            {/* Show all locations directly - no buttons */}
            <div className="locations-sidebar">
              <h3>🇱🇧 Lebanon Marine Sites</h3>
              <div className="locations-grid">
                {Object.keys(lebanonLocations).map(locationName => {
                  const location = lebanonLocations[locationName];
                  return (
                    <div
                      key={locationName}
                      className={`location-card ${selectedLocation?.name === locationName ? 'selected' : ''}`}
                      onClick={() => setSelectedLocation({ name: locationName, ...location })}
                    >
                      <div className="location-header">
                        <span className="location-icon">{getIconForType(location.category)}</span>
                        <h4>{locationName}</h4>
                      </div>
                      <div className="location-stats">
                        <div className="stat-row">
                          <span>Biodiversity:</span>
                          <span style={{ color: getColorForBiodiversity(location.biodiversityScore), fontWeight: '700' }}>
                            {location.biodiversityScore}/100
                          </span>
                        </div>
                        <div className="stat-row">
                          <span>DVM Suppression:</span>
                          <span style={{ color: location.dvmData.dvmSuppressionDepth > 100 ? '#F25C54' : '#3BE8B0' }}>
                            {location.dvmData.dvmSuppressionDepth}m
                          </span>
                        </div>
                        <div className="stat-row">
                          <span>Light Pollution:</span>
                          <span>{location.dvmData.lightPollutionLux} lux</span>
                        </div>
                        <div className="stat-row">
                          <span>Water Quality:</span>
                          <span>{location.waterQuality}</span>
                        </div>
                      </div>
                      {selectedLocation?.name === locationName && (
                        <div className="location-details">
                          <p>{location.description}</p>
                          <div className="species-tags">
                            {location.keySpecies.slice(0, 3).map((species, idx) => (
                              <span key={idx} className="species-tag">{species}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <Globe3D
            onLebanonClick={handleLebanonClick}
            selectedLocation={selectedLocation}
          />
        )}
      </div>

      {/* DVM Simulator - Full width below map */}
      {selectedLocation && (
        <div className="dvm-section">
          <DVMSimulator
            location={selectedLocation}
            waterClarity={selectedLocation.dvmData?.waterClarity || 'moderate'}
          />
        </div>
      )}
    </div>
  );
};

export default LebaneseMarineMapPage;
