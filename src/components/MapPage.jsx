import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LebaneseMarineMapPage.css';

const LebaneseMarineMapPage = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [layers, setLayers] = useState({
    marineProtected: true,
    biodiversityHotspots: true,
    freshwaterSources: true,
    threats: false
  });
  const [markersRef, setMarkersRef] = useState({});
  const [currentFilter, setCurrentFilter] = useState('all');

  // Enhanced Lebanon location data with real-time information
  const lebanonLocations = {
    'Palm Islands Reserve': {
      coords: [34.5067, 35.7000],
      type: 'marine',
      biodiversityScore: 92,
      status: 'protected',
      category: 'marine_reserve',
      threatLevel: 'low',
      visitorCount: '12,000/year',
      lastSurvey: '2024',
      description: 'Lebanon\'s northernmost marine protected area. Home to endangered Mediterranean monk seals, nesting site for loggerhead turtles, and critical stopover for migratory birds.',
      keySpecies: ['Mediterranean Monk Seal', 'Loggerhead Turtles', 'Seabirds', 'Posidonia Meadows'],
      threats: ['Tourism pressure', 'Water pollution', 'Climate change'],
      conservation: ['Boat restrictions', 'Monitoring programs', 'Tourist education'],
      waterQuality: 'Good',
      temperature: '22°C',
      depth: '5-40m',
      protectedSince: '1992'
    },
    'Tyre Coast Reserve': {
      coords: [33.2733, 35.1943],
      type: 'marine',
      biodiversityScore: 88,
      status: 'protected',
      category: 'unesco_site',
      threatLevel: 'medium',
      visitorCount: '25,000/year',
      lastSurvey: '2024',
      description: 'UNESCO World Heritage marine area. Critical nesting beach for sea turtles and home to unique vermetid reef formations. Supports 1,790+ marine species.',
      keySpecies: ['Green Turtles', 'Hawksbill Turtles', 'Vermetid Reefs', 'Endemic Fish'],
      threats: ['Coastal development', 'Light pollution', 'Beach erosion'],
      conservation: ['Turtle nest protection', 'Light management', 'Beach restoration'],
      waterQuality: 'Good',
      temperature: '24°C',
      depth: '0-25m',
      protectedSince: '1998'
    },
    'Tripoli Coast': {
      coords: [34.4333, 35.8167],
      type: 'marine',
      biodiversityScore: 75,
      status: 'proposed',
      category: 'seagrass_meadow',
      threatLevel: 'medium',
      visitorCount: '8,000/year',
      lastSurvey: '2023',
      description: 'Important seagrass meadows of Cymodocea nodosa. Part of proposed MPA network with rich coralligenous assemblages and diverse fish populations.',
      keySpecies: ['Seagrass Meadows', 'Coralligenous Communities', 'Endemic Fish', 'Sea Urchins'],
      threats: ['Fishing pressure', 'Coastal pollution', 'Anchor damage'],
      conservation: ['Proposed MPA status', 'Fishery regulations', 'Monitoring'],
      waterQuality: 'Fair',
      temperature: '21°C',
      depth: '2-30m',
      protectedSince: 'Proposed 2025'
    },
    'Beirut Marine Area': {
      coords: [33.8938, 35.5018],
      type: 'marine',
      biodiversityScore: 65,
      status: 'urban',
      category: 'urban_coast',
      threatLevel: 'high',
      visitorCount: '50,000/year',
      lastSurvey: '2024',
      description: 'Urban coastal waters with moderate biodiversity. Affected by port activities but still supports some marine life including seasonal fish migrations.',
      keySpecies: ['Migratory Fish', 'Coastal Birds', 'Marine Algae', 'Urban-adapted species'],
      threats: ['Port pollution', 'Urban runoff', 'Coastal development', 'Noise pollution'],
      conservation: ['Water treatment', 'Pollution monitoring', 'Urban planning'],
      waterQuality: 'Poor',
      temperature: '23°C',
      depth: '0-50m',
      protectedSince: 'None'
    },
    'Lake Qaraoun': {
      coords: [33.6167, 35.6833],
      type: 'freshwater',
      biodiversityScore: 82,
      status: 'critical',
      category: 'artificial_lake',
      threatLevel: 'critical',
      visitorCount: '15,000/year',
      lastSurvey: '2024',
      description: 'Largest artificial lake in Lebanon (12 km²). Critical stopover for 20,000+ migratory birds. Severely threatened by pollution and eutrophication.',
      keySpecies: ['Migratory Birds', 'Waterfowl', 'Endemic Fish', 'Wetland Plants'],
      threats: ['Agricultural pollution', 'Industrial waste', 'Eutrophication', 'Cyanobacteria blooms'],
      conservation: ['Water treatment', 'Agricultural controls', 'Bird monitoring'],
      waterQuality: 'Critical',
      temperature: '18°C',
      depth: '0-60m',
      protectedSince: '2010 (partial)'
    },
    'Ammiq Wetland': {
      coords: [33.7000, 35.7667],
      type: 'freshwater',
      biodiversityScore: 95,
      status: 'protected',
      category: 'ramsar_wetland',
      threatLevel: 'low',
      visitorCount: '5,000/year',
      lastSurvey: '2024',
      description: 'World Nature Reserve (280 ha). Globally important bird migration route hosting 250+ bird species. Critical biological corridor between Africa and Europe.',
      keySpecies: ['250+ Bird Species', 'Wetland Plants', 'Amphibians', 'Migratory Waterfowl'],
      threats: ['Agricultural encroachment', 'Water diversion', 'Climate change'],
      conservation: ['Ramsar protection', 'Bird monitoring', 'Water management'],
      waterQuality: 'Excellent',
      temperature: '16°C',
      depth: '0-3m',
      protectedSince: '1996'
    },
    'Yammouneh Lake': {
      coords: [34.1833, 36.0833],
      type: 'freshwater',
      biodiversityScore: 85,
      status: 'endemic',
      category: 'mountain_lake',
      threatLevel: 'medium',
      visitorCount: '2,000/year',
      lastSurvey: '2023',
      description: 'High-altitude lake home to Lebanon\'s only endemic fish - the Levantine minnow. Unique mountain ecosystem at 1,800m elevation.',
      keySpecies: ['Levantine Minnow (Endemic)', 'Alpine Plants', 'Mountain Birds', 'Rare Insects'],
      threats: ['Climate change', 'Tourism pressure', 'Water extraction'],
      conservation: ['Species monitoring', 'Access control', 'Research programs'],
      waterQuality: 'Good',
      temperature: '12°C',
      depth: '0-15m',
      protectedSince: '2015'
    },
    'Litani River Mouth': {
      coords: [33.3500, 35.3000],
      type: 'mixed',
      biodiversityScore: 60,
      status: 'polluted',
      category: 'river_estuary',
      threatLevel: 'critical',
      visitorCount: '500/year',
      lastSurvey: '2024',
      description: 'Mouth of Lebanon\'s longest river (170 km). Once pristine estuary now severely impacted by upstream pollution but still important for fish migrations.',
      keySpecies: ['Estuarine Fish', 'Coastal Birds', 'Riparian Vegetation', 'Migratory Species'],
      threats: ['Severe pollution', 'Agricultural runoff', 'Industrial waste', 'Dam impacts'],
      conservation: ['Pollution control', 'River restoration', 'Monitoring programs'],
      waterQuality: 'Critical',
      temperature: '20°C',
      depth: '0-10m',
      protectedSince: 'None'
    }
  };

  const getColorForBiodiversity = (score) => {
    if (score >= 90) return '#00ff7f';
    if (score >= 80) return '#3BE8B0';
    if (score >= 70) return '#58B1F0';
    if (score >= 60) return '#FFA500';
    return '#F25C54';
  };

  const getThreatColor = (threatLevel) => {
    switch(threatLevel) {
      case 'low': return '#00ff7f';
      case 'medium': return '#FFA500';
      case 'high': return '#FF6B35';
      case 'critical': return '#F25C54';
      default: return '#58B1F0';
    }
  };

  const getWaterQualityColor = (quality) => {
    switch(quality) {
      case 'Excellent': return '#00ff7f';
      case 'Good': return '#3BE8B0';
      case 'Fair': return '#FFA500';
      case 'Poor': return '#FF6B35';
      case 'Critical': return '#F25C54';
      default: return '#58B1F0';
    }
  };

  const getIconForType = (type, category) => {
    if (category === 'marine_reserve') return '🏝️';
    if (category === 'unesco_site') return '🏛️';
    if (category === 'seagrass_meadow') return '🌿';
    if (category === 'urban_coast') return '🏙️';
    if (category === 'artificial_lake') return '🌊';
    if (category === 'ramsar_wetland') return '🦆';
    if (category === 'mountain_lake') return '⛰️';
    if (category === 'river_estuary') return '🏞️';
    
    switch(type) {
      case 'marine': return '🌊';
      case 'freshwater': return '💧';
      case 'mixed': return '🏞️';
      default: return '📍';
    }
  };

  const shouldShowLocation = (location) => {
    if (currentFilter === 'threatened' && location.threatLevel !== 'high' && location.threatLevel !== 'critical') {
      return false;
    }
    if (currentFilter === 'protected' && location.status !== 'protected') {
      return false;
    }
    if (currentFilter === 'endemic' && location.status !== 'endemic') {
      return false;
    }

    if (!layers.marineProtected && location.type === 'marine' && location.status === 'protected') {
      return false;
    }
    if (!layers.freshwaterSources && location.type === 'freshwater') {
      return false;
    }
    if (!layers.threats && location.threatLevel === 'critical') {
      return false;
    }
    return true;
  };

  // Dynamic marker updates based on layer toggles
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    Object.values(markersRef).forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });

    const newMarkers = {};

    Object.keys(lebanonLocations).forEach(locationName => {
      const data = lebanonLocations[locationName];
      
      if (!shouldShowLocation(data)) return;

      const color = layers.threats ? getThreatColor(data.threatLevel) : getColorForBiodiversity(data.biodiversityScore);
      const icon = getIconForType(data.type, data.category);

      const marker = L.circleMarker(data.coords, {
        color: '#ffffff',
        fillColor: color,
        fillOpacity: 0.8,
        opacity: 1,
        radius: 10,
        weight: 2
      }).addTo(mapInstanceRef.current);

      marker.bindPopup(`
        <div style="text-align: center; font-family: 'Poppins', sans-serif; min-width: 200px;">
          <div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>
          <strong style="font-size: 16px; color: #333;">${locationName}</strong>
          <div style="margin: 8px 0; padding: 8px; background: #f0f8ff; border-radius: 5px;">
            <div style="font-size: 12px; color: #666;">Biodiversity Score</div>
            <div style="font-size: 18px; font-weight: bold; color: ${getColorForBiodiversity(data.biodiversityScore)};">${data.biodiversityScore}/100</div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #666;">
            <span>Water Quality: <strong style="color: ${getWaterQualityColor(data.waterQuality)};">${data.waterQuality}</strong></span>
            <span>Temp: <strong>${data.temperature}</strong></span>
          </div>
          <div style="margin-top: 8px; font-size: 12px; color: #333;">
            Click for detailed information
          </div>
        </div>
      `, {
        maxWidth: 250,
        className: 'custom-popup'
      });

      marker.on('mouseover', function() {
        this.setStyle({ radius: 13, fillOpacity: 0.9 });
      });

      marker.on('mouseout', function() {
        this.setStyle({ radius: 10, fillOpacity: 0.8 });
      });

      marker.on('click', () => {
        setSelectedLocation({ name: locationName, ...data });
        mapInstanceRef.current.flyTo(data.coords, 11, { duration: 1.5 });
      });

      newMarkers[locationName] = marker;
    });

    setMarkersRef(newMarkers);
  }, [layers, currentFilter]);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current, {
        center: [33.8547, 35.8623],
        zoom: 9,
        minZoom: 7,
        maxZoom: 14
      });

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri'
      });

      const topoLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri'
      });

      satelliteLayer.addTo(map);

      const baseMaps = {
        "Satellite": satelliteLayer,
        "Topographic": topoLayer
      };
      
      L.control.layers(baseMaps).addTo(map);

      const lebanonBounds = [[33.0, 35.0], [34.7, 36.7]];
      
      L.rectangle(lebanonBounds, {
        color: '#3BE8B0',
        weight: 3,
        fillOpacity: 0.05,
        opacity: 0.8,
        dashArray: '5, 10'
      }).addTo(map);

      L.control.scale({
        position: 'bottomright',
        metric: true,
        imperial: false
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const toggleLayer = (layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  const setFilter = (filterType) => {
    setCurrentFilter(filterType);
  };

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([33.8547, 35.8623], 9, { duration: 1.5 });
    }
    setSelectedLocation(null);
  };

  return (
    <div className="lebanese-map-page">
      <div className="map-container">
        <div ref={mapRef} className="map" />

        {/* Enhanced Interactive Controls */}
        <div className="map-controls">
          <h3>🇱🇧 Lebanon Biodiversity</h3>

          {/* Quick Filters */}
          <div className="filter-section">
            <h4>Quick Filters</h4>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Sites
              </button>
              <button 
                className={`filter-btn ${currentFilter === 'protected' ? 'active' : ''}`}
                onClick={() => setFilter('protected')}
              >
                Protected
              </button>
              <button 
                className={`filter-btn ${currentFilter === 'threatened' ? 'active' : ''}`}
                onClick={() => setFilter('threatened')}
              >
                Threatened
              </button>
              <button 
                className={`filter-btn ${currentFilter === 'endemic' ? 'active' : ''}`}
                onClick={() => setFilter('endemic')}
              >
                Endemic
              </button>
            </div>
          </div>

          {/* Layer Controls */}
          <div className="layer-section">
            <h4>Layer Controls</h4>
            <div className="control-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={layers.marineProtected}
                  onChange={() => toggleLayer('marineProtected')}
                />
                <span className="slider" />
                <span className="label-text">Marine Protected Areas</span>
              </label>
            </div>
            <div className="control-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={layers.biodiversityHotspots}
                  onChange={() => toggleLayer('biodiversityHotspots')}
                />
                <span className="slider" />
                <span className="label-text">Biodiversity Hotspots</span>
              </label>
            </div>
            <div className="control-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={layers.freshwaterSources}
                  onChange={() => toggleLayer('freshwaterSources')}
                />
                <span className="slider" />
                <span className="label-text">Freshwater Ecosystems</span>
              </label>
            </div>
            <div className="control-group">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={layers.threats}
                  onChange={() => toggleLayer('threats')}
                />
                <span className="slider" />
                <span className="label-text">Environmental Threats</span>
              </label>
            </div>
          </div>

          <button className="reset-btn" onClick={resetView}>
            🔄 Reset View
          </button>
        </div>

        {/* Enhanced Info Panel */}
        <div className="info-panel">
          <h3>Lebanese Marine & Freshwater Life</h3>
          {!selectedLocation ? (
            <>
              <p className="info-subtitle">Click on any location to explore Lebanon's unique biodiversity</p>
              
              {/* Dynamic Statistics */}
              <div className="lebanon-stats">
                <div className="stat-card marine">
                  <div className="stat-icon">🌊</div>
                  <div className="stat-content">
                    <div className="stat-number">1,790+</div>
                    <div className="stat-label">Marine Species</div>
                    <div className="stat-note">In &lt;1% of world's ocean</div>
                  </div>
                </div>
                <div className="stat-card freshwater">
                  <div className="stat-icon">💧</div>
                  <div className="stat-content">
                    <div className="stat-number">250+</div>
                    <div className="stat-label">Bird Species</div>
                    <div className="stat-note">At Ammiq alone</div>
                  </div>
                </div>
                <div className="stat-card protected">
                  <div className="stat-icon">🛡️</div>
                  <div className="stat-content">
                    <div className="stat-number">2</div>
                    <div className="stat-label">Marine Reserves</div>
                    <div className="stat-note">Palm Islands & Tyre</div>
                  </div>
                </div>
              </div>
              
              {/* Dynamic Legend */}
              <div className="legend">
                <h4>{layers.threats ? 'Threat Level' : 'Biodiversity Score'}</h4>
                <div className="legend-items">
                  {layers.threats ? (
                    <>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#00ff7f' }} />
                        <span>Low Threat</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#FFA500' }} />
                        <span>Medium Threat</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#FF6B35' }} />
                        <span>High Threat</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#F25C54' }} />
                        <span>Critical Threat</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#00ff7f' }} />
                        <span>Exceptional (90-100)</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#3BE8B0' }} />
                        <span>High (80-89)</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#58B1F0' }} />
                        <span>Medium (70-79)</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#FFA500' }} />
                        <span>Low (60-69)</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color" style={{ background: '#F25C54' }} />
                        <span>Critical (&lt;60)</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="ecosystem-types">
                  <h4>Ecosystem Types</h4>
                  <div className="type-item">
                    <span className="type-icon">🏝️</span>
                    <span>Marine Reserves</span>
                  </div>
                  <div className="type-item">
                    <span className="type-icon">🦆</span>
                    <span>Wetlands</span>
                  </div>
                  <div className="type-item">
                    <span className="type-icon">⛰️</span>
                    <span>Mountain Lakes</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="location-info">
              <button className="back-button" onClick={() => setSelectedLocation(null)}>
                ← Back
              </button>
              <div className="location-header">
                <span className="location-icon">{getIconForType(selectedLocation.type, selectedLocation.category)}</span>
                <h4>{selectedLocation.name}</h4>
              </div>
              
              {/* Enhanced Statistics Grid */}
              <div className="info-stats">
                <div className="stat">
                  <div className="stat-label">Biodiversity Score</div>
                  <div className="stat-value" style={{ color: getColorForBiodiversity(selectedLocation.biodiversityScore) }}>
                    {selectedLocation.biodiversityScore}/100
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-label">Threat Level</div>
                  <div className="stat-value" style={{ color: getThreatColor(selectedLocation.threatLevel) }}>
                    {selectedLocation.threatLevel.charAt(0).toUpperCase() + selectedLocation.threatLevel.slice(1)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-label">Water Quality</div>
                  <div className="stat-value" style={{ color: getWaterQualityColor(selectedLocation.waterQuality) }}>
                    {selectedLocation.waterQuality}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-label">Conservation Status</div>
                  <div className={`stat-badge ${selectedLocation.status}`}>
                    {selectedLocation.status.charAt(0).toUpperCase() + selectedLocation.status.slice(1)}
                  </div>
                </div>
              </div>

              {/* Real-time Environmental Data */}
              <div className="environmental-data">
                <h5>Environmental Conditions</h5>
                <div className="data-grid">
                  <div className="data-item">
                    <span className="data-label">Temperature</span>
                    <span className="data-value">{selectedLocation.temperature}</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Depth Range</span>
                    <span className="data-value">{selectedLocation.depth}</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Visitors/Year</span>
                    <span className="data-value">{selectedLocation.visitorCount}</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Protected Since</span>
                    <span className="data-value">{selectedLocation.protectedSince}</span>
                  </div>
                </div>
              </div>
              
              <p className="location-description">{selectedLocation.description}</p>
              
              {/* Interactive Species Grid */}
              <div className="key-species">
                <h5>Key Species & Features</h5>
                <div className="species-grid">
                  {selectedLocation.keySpecies.map((species, index) => (
                    <div key={index} className="species-item">
                      <span className="species-bullet">🌿</span>
                      <span>{species}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive Threats Grid */}
              <div className="threats">
                <h5>Environmental Threats</h5>
                <div className="threats-grid">
                  {selectedLocation.threats.map((threat, index) => (
                    <div key={index} className="threat-item">
                      <span className="threat-bullet">⚠️</span>
                      <span>{threat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conservation Efforts */}
              <div className="conservation-efforts">
                <h5>Conservation Efforts</h5>
                <div className="conservation-grid">
                  {selectedLocation.conservation.map((effort, index) => (
                    <div key={index} className="conservation-item">
                      <span className="conservation-bullet">🛡️</span>
                      <span>{effort}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lebanon Facts */}
          <div className="lebanon-facts">
            <h4>🌿 Lebanon's Natural Heritage</h4>
            <ul>
              <li>Home to 2.7% of world's marine species</li>
              <li>Mediterranean biodiversity hotspot</li>
              <li>Critical migration route Africa-Europe</li>
              <li>Litani River: Lebanon's longest at 170km</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LebaneseMarineMapPage;