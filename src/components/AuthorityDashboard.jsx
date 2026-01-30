import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { l1Devices, getFleetSummary } from '../data/deviceData';
import './AuthorityDashboard.css';

const AuthorityDashboard = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fleetSummary, setFleetSummary] = useState(getFleetSummary());
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (!mapInstance.current) {
      // Initialize Leaflet map centered on Lebanese coast
      const map = L.map(mapRef.current).setView([33.9, 35.5], 9);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstance.current = map;

      // Add device markers
      l1Devices.forEach(device => {
        const isWater = device.type === 'water';
        const statusColor =
          device.status === 'normal' ? '#00D4C8' :
          device.status === 'warning' ? '#FFA500' :
          '#F25C54';

        const icon = L.divIcon({
          className: 'custom-device-marker',
          html: `
            <div class="device-marker ${device.type}" style="border-color: ${statusColor};">
              <div class="marker-icon">${isWater ? '🌊' : '🏖️'}</div>
              <div class="marker-pulse" style="border-color: ${statusColor};"></div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        const marker = L.marker([device.coordinates.lat, device.coordinates.lng], { icon })
          .addTo(map)
          .on('click', () => {
            setSelectedDevice(device);
            map.flyTo([device.coordinates.lat, device.coordinates.lng], 11, {
              duration: 1.5
            });
          });

        markersRef.current.push(marker);
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFleetSummary(getFleetSummary());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#00D4C8';
      case 'warning': return '#FFA500';
      case 'offline': return '#F25C54';
      default: return '#8FA8B8';
    }
  };

  const getBatteryColor = (percent) => {
    if (percent >= 80) return '#00D4C8';
    if (percent >= 50) return '#FFD93D';
    if (percent >= 30) return '#FFA500';
    return '#F25C54';
  };

  return (
    <div className="authority-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Lumenet Command Dashboard</h1>
          <p className="subtitle">Real-time fleet monitoring & control</p>
        </div>
        <div className="header-right">
          <div className="sync-indicator">
            <div className="pulse-dot"></div>
            <span>Live Data</span>
          </div>
        </div>
      </header>

      {/* Fleet Summary Stats */}
      <div className="fleet-summary">
        <div className="summary-card">
          <div className="card-icon">🌊</div>
          <div className="card-content">
            <div className="card-value">{fleetSummary.waterDevices}</div>
            <div className="card-label">L1 Devices Active</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <div className="card-value">{fleetSummary.activeDevices}</div>
            <div className="card-label">Operational</div>
          </div>
        </div>

        <div className="summary-card warning">
          <div className="card-icon">⚠️</div>
          <div className="card-content">
            <div className="card-value">{fleetSummary.warningDevices}</div>
            <div className="card-label">Warnings</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🔋</div>
          <div className="card-content">
            <div className="card-value">{fleetSummary.avgBatteryLevel}%</div>
            <div className="card-label">Avg Battery</div>
          </div>
        </div>

        <div className="summary-card success">
          <div className="card-icon">💨</div>
          <div className="card-content">
            <div className="card-value">{fleetSummary.totalCarbonRemoval}t</div>
            <div className="card-label">Carbon/Day</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🛡️</div>
          <div className="card-content">
            <div className="card-value">{fleetSummary.dvmProtectedSites}</div>
            <div className="card-label">DVM Protected</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Map Section */}
        <div className="map-section">
          <div className="section-header">
            <h2>Fleet Deployment Map</h2>
            <div className="map-legend">
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#3BE8B0' }}></span>
                Normal
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#FFA500' }}></span>
                Warning
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#F25C54' }}></span>
                Offline
              </span>
            </div>
          </div>
          <div ref={mapRef} className="dashboard-map"></div>
        </div>

        {/* Device Details Panel */}
        <div className="device-details-panel">
          {selectedDevice ? (
            <div className="device-details">
              <div className="details-header">
                <div className="device-title">
                  <h3>{selectedDevice.name}</h3>
                  <span className="device-type-badge">{selectedDevice.type}</span>
                </div>
                <button className="close-btn" onClick={() => setSelectedDevice(null)}>×</button>
              </div>

              <div className="device-info">
                <p className="location-name">📍 {selectedDevice.location}</p>
                <p className="last-update">Last update: {new Date(selectedDevice.lastUpdate).toLocaleTimeString()}</p>
              </div>

              {/* Device Image */}
              <div className="device-image-section">
                <img src="/L1.jpeg" alt="Lumenet L1 Device" className="device-image" />
                <p className="image-caption">Lumenet L1 Multi-Sensor Station</p>
              </div>

              {/* Device Status */}
              <div className="info-section">
                <h4>Device Health</h4>
                <div className="health-grid">
                  <div className="health-item">
                    <span className="health-label">Status</span>
                    <span
                      className="health-value status-badge"
                      style={{ background: getStatusColor(selectedDevice.status) }}
                    >
                      {selectedDevice.status}
                    </span>
                  </div>
                  <div className="health-item">
                    <span className="health-label">Battery</span>
                    <div className="battery-display">
                      <div className="battery-bar">
                        <div
                          className="battery-fill"
                          style={{
                            width: `${selectedDevice.health.batteryPercent}%`,
                            background: getBatteryColor(selectedDevice.health.batteryPercent)
                          }}
                        ></div>
                      </div>
                      <span className="battery-text">{selectedDevice.health.batteryPercent}%</span>
                    </div>
                  </div>
                  <div className="health-item">
                    <span className="health-label">Voltage</span>
                    <span className="health-value">{selectedDevice.health.batteryVoltage}V</span>
                  </div>
                  <div className="health-item">
                    <span className="health-label">Motor</span>
                    <span className="health-value">{selectedDevice.health.motorStatus}</span>
                  </div>
                  <div className="health-item">
                    <span className="health-label">Solar</span>
                    <span className="health-value">
                      {selectedDevice.health.solarCharging ? '☀️ Charging' : '🌙 Inactive'}
                    </span>
                  </div>
                  <div className="health-item">
                    <span className="health-label">Signal</span>
                    <span className="health-value">{selectedDevice.health.signalStrength} dBm</span>
                  </div>
                  <div className="health-item">
                    <span className="health-label">Uptime</span>
                    <span className="health-value">{selectedDevice.health.uptime}</span>
                  </div>
                </div>
              </div>

              {/* Sensor Readings */}
              {selectedDevice.type === 'water' && (
                <>
                  <div className="info-section">
                    <h4>Chemical Sensors</h4>
                    <div className="sensor-reading">
                      <div className="sensor-header">
                        <span className="sensor-name">CO₂ Level</span>
                        <span className="sensor-trend">
                          {selectedDevice.sensors.co2Trend === 'rising' && '📈'}
                          {selectedDevice.sensors.co2Trend === 'falling' && '📉'}
                          {selectedDevice.sensors.co2Trend === 'stable' && '➡️'}
                        </span>
                      </div>
                      <div className="sensor-value-large">{selectedDevice.sensors.co2Level} <span className="unit">ppm</span></div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h4>Spectral Light Sensors</h4>
                    <div className="sensor-grid">
                      <div className="sensor-item">
                        <span className="sensor-label">Intensity</span>
                        <span className="sensor-value">{selectedDevice.sensors.lightIntensity} lux</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">Wavelength</span>
                        <span className="sensor-value">{selectedDevice.sensors.lightWavelength} nm</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">Day/Night</span>
                        <span className="sensor-value">
                          {selectedDevice.sensors.dayNightStatus === 'day' ? '☀️ Day' : '🌙 Night'}
                        </span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">Direction</span>
                        <span className="sensor-value">{selectedDevice.sensors.lightDirection}</span>
                      </div>
                      <div className="sensor-item full-width">
                        <span className="sensor-label">Pollution Index</span>
                        <span
                          className="pollution-badge"
                          style={{
                            background:
                              selectedDevice.sensors.lightPollutionIndex === 'low' ? '#00D4C8' :
                              selectedDevice.sensors.lightPollutionIndex === 'medium' ? '#FFD93D' :
                              selectedDevice.sensors.lightPollutionIndex === 'high' ? '#FFA500' :
                              '#F25C54'
                          }}
                        >
                          {selectedDevice.sensors.lightPollutionIndex}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h4>Sonar Biomass Detection</h4>
                    <div className="sensor-grid">
                      <div className="sensor-item">
                        <span className="sensor-label">Density</span>
                        <span className="sensor-value">{selectedDevice.sensors.biomassDensity} units</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">DVM Depth</span>
                        <span className="sensor-value">{selectedDevice.sensors.dvmDepth}m</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">Movement</span>
                        <span className="sensor-value">
                          {selectedDevice.sensors.verticalMovement === 'ascending' && '⬆️ Ascending'}
                          {selectedDevice.sensors.verticalMovement === 'descending' && '⬇️ Descending'}
                          {selectedDevice.sensors.verticalMovement === 'stable' && '➡️ Stable'}
                        </span>
                      </div>
                      <div className="sensor-item full-width">
                        <span className="sensor-label">DVM Status</span>
                        <span
                          className="dvm-status-badge"
                          style={{
                            background: selectedDevice.sensors.dvmMigrationActive ? '#00D4C8' : '#FFA500'
                          }}
                        >
                          {selectedDevice.sensors.dvmMigrationActive ? '✅ Active Migration' : '⚠️ Migration Suppressed'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="info-section impact-section">
                    <h4>Environmental Impact</h4>
                    <div className="impact-grid">
                      <div className="impact-card">
                        <div className="impact-label">DVM Protection</div>
                        <div
                          className="impact-value"
                          style={{
                            color: selectedDevice.impact.dvmProtectionStatus === 'protected' ? '#3BE8B0' : '#FFA500'
                          }}
                        >
                          {selectedDevice.impact.dvmProtectionStatus}
                        </div>
                      </div>
                      <div className="impact-card">
                        <div className="impact-label">Carbon Removal</div>
                        <div className="impact-value">{selectedDevice.impact.carbonRemovalDaily}t/day</div>
                      </div>
                      <div className="impact-card">
                        <div className="impact-label">Fishery Health</div>
                        <div className="impact-value">{selectedDevice.impact.fisheryHealth}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedDevice.type === 'land' && (
                <div className="info-section">
                  <h4>Land Station Sensors</h4>
                  <div className="sensor-grid">
                    <div className="sensor-item">
                      <span className="sensor-label">CO₂</span>
                      <span className="sensor-value">{selectedDevice.sensors.co2Level} ppm</span>
                    </div>
                    <div className="sensor-item">
                      <span className="sensor-label">Light Intensity</span>
                      <span className="sensor-value">{selectedDevice.sensors.lightIntensity} lux</span>
                    </div>
                    <div className="sensor-item full-width">
                      <span className="sensor-label">Pollution Index</span>
                      <span
                        className="pollution-badge"
                        style={{ background: '#F25C54' }}
                      >
                        {selectedDevice.sensors.lightPollutionIndex}
                      </span>
                    </div>
                  </div>
                  <p className="land-note">
                    📊 Land stations provide baseline pollution measurements for comparison with marine data.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">📍</div>
              <h3>Select a Device</h3>
              <p>Click on any marker on the map to view detailed sensor data and device health information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
