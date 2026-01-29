import React, { useState, useEffect, useMemo } from 'react';
import {
  calculateMigrationDepth,
  getMigrationPhase,
  calculateFeedingProbability,
  getDVMStatus,
  simulate24HourCycle
} from '../utils/dvmCalculations';
import {
  calculateLightAtDepth,
  getNaturalSurfaceLight,
  generateLightProfile
} from '../utils/lightAttenuation';
import { marineSpecies, getDVMSpecies } from '../data/speciesData';
import './DVMSimulator.css';

const DVMSimulator = ({ location, waterClarity = 'moderate' }) => {
  const [timeOfDay, setTimeOfDay] = useState(12); // 0-24 hours
  const [artificialLight, setArtificialLight] = useState(0);
  const [selectedSpeciesIds, setSelectedSpeciesIds] = useState(['copepods', 'lanternfish', 'krill']);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [speed, setSpeed] = useState(1);

  const dvmSpecies = useMemo(() => getDVMSpecies(), []);
  const maxDepth = 500;

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeOfDay(prev => (prev + 0.5 * speed) % 24);
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Calculate light profile
  const surfaceLight = getNaturalSurfaceLight(timeOfDay);
  const totalSurfaceLight = surfaceLight + artificialLight;

  const lightProfile = useMemo(() => {
    return generateLightProfile(totalSurfaceLight, maxDepth, 10, waterClarity);
  }, [totalSurfaceLight, maxDepth, waterClarity]);

  const naturalLightProfile = useMemo(() => {
    return generateLightProfile(surfaceLight, maxDepth, 10, waterClarity);
  }, [surfaceLight, maxDepth, waterClarity]);

  // Calculate migration for selected species
  const speciesPositions = useMemo(() => {
    return selectedSpeciesIds.map(id => {
      const species = marineSpecies[id];
      const migration = calculateMigrationDepth(timeOfDay, artificialLight, species, waterClarity);
      const naturalMigration = calculateMigrationDepth(timeOfDay, 0, species, waterClarity);
      const feeding = calculateFeedingProbability(
        migration.currentDepth,
        migration.lightAtDepth,
        species,
        timeOfDay
      );

      return {
        species,
        ...migration,
        naturalDepth: naturalMigration.currentDepth,
        feedingProbability: feeding.probability
      };
    });
  }, [selectedSpeciesIds, timeOfDay, artificialLight, waterClarity]);

  const phase = getMigrationPhase(timeOfDay);

  const toggleSpecies = (speciesId) => {
    setSelectedSpeciesIds(prev =>
      prev.includes(speciesId)
        ? prev.filter(id => id !== speciesId)
        : [...prev, speciesId]
    );
  };

  const getTimeLabel = (hour) => {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const getSunMoonIcon = (hour) => {
    if (hour >= 6 && hour < 18) return '☀️';
    if (hour >= 18 && hour < 19) return '🌅';
    if (hour >= 5 && hour < 6) return '🌄';
    return '🌙';
  };

  const getDepthColor = (depth, lightValue) => {
    // Color gradient based on depth and light
    const lightFactor = Math.log10(Math.max(lightValue, 0.0001) + 1) / 6;
    const depthFactor = depth / maxDepth;

    const r = Math.floor(11 + depthFactor * 20);
    const g = Math.floor(30 + depthFactor * 20 - lightFactor * 20);
    const b = Math.floor(52 + depthFactor * 30);

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="dvm-simulator">
      <div className="simulator-header">
        <h3>🌊 DVM Depth Simulator</h3>
        <p className="simulator-subtitle">
          Real-time visualization of organism migration patterns
        </p>
      </div>

      {/* Time Control */}
      <div className="time-control">
        <div className="time-display">
          <span className="time-icon">{getSunMoonIcon(timeOfDay)}</span>
          <span className="time-label">{getTimeLabel(timeOfDay)}</span>
          <span className="phase-badge">{phase}</span>
        </div>

        <input
          type="range"
          min="0"
          max="24"
          step="0.1"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
          className="time-slider"
        />

        <div className="time-markers">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>12 AM</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="playback-controls">
        <button
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play 24h Cycle'}
        </button>

        <div className="speed-control">
          <label>Speed:</label>
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
        </div>

        <button
          className={`compare-btn ${showComparison ? 'active' : ''}`}
          onClick={() => setShowComparison(!showComparison)}
        >
          {showComparison ? '📊 Hide' : '📊 Compare'}
        </button>
      </div>

      {/* Light Pollution Control */}
      <div className="light-control">
        <div className="control-header">
          <label>💡 Artificial Light Pollution</label>
          <span className="light-value">{artificialLight.toFixed(2)} lux</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={artificialLight}
          onChange={(e) => setArtificialLight(parseFloat(e.target.value))}
          className="light-slider"
        />
        <div className="light-presets">
          <button onClick={() => setArtificialLight(0)}>Natural</button>
          <button onClick={() => setArtificialLight(50)}>Low</button>
          <button onClick={() => setArtificialLight(200)}>Moderate</button>
          <button onClick={() => setArtificialLight(500)}>High</button>
          <button onClick={() => setArtificialLight(1000)}>Extreme</button>
        </div>
      </div>

      {/* Depth Visualization */}
      <div className="depth-visualization">
        <div className="depth-container">
          {/* Depth scale */}
          <div className="depth-scale">
            {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map(d => (
              <div key={d} className="depth-marker">
                <span className="depth-label">{d}m</span>
                <div className="depth-line" />
              </div>
            ))}
          </div>

          {/* Light gradient visualization */}
          <div className="light-gradient">
            {lightProfile.map((point, i) => (
              <div
                key={i}
                className="gradient-segment"
                style={{
                  height: `${100 / lightProfile.length}%`,
                  backgroundColor: getDepthColor(point.depth, point.light)
                }}
              />
            ))}
          </div>

          {/* Species positions */}
          <div className="species-container">
            {speciesPositions.map(({ species, currentDepth, feedingProbability, isDisrupted }) => (
              <div
                key={species.id}
                className={`species-marker ${isDisrupted ? 'disrupted' : ''}`}
                style={{
                  top: `${(currentDepth / maxDepth) * 100}%`,
                  left: `${20 + Math.random() * 60}%`
                }}
                title={`${species.name}: ${currentDepth.toFixed(0)}m`}
              >
                <span className="species-icon" style={{ fontSize: feedingProbability > 0.5 ? '24px' : '18px' }}>
                  {species.icon}
                </span>
                {feedingProbability > 0.5 && (
                  <div className="feeding-indicator">🍽️</div>
                )}
              </div>
            ))}
          </div>

          {/* Natural comparison overlay */}
          {showComparison && (
            <div className="comparison-overlay">
              {speciesPositions.map(({ species, naturalDepth }) => (
                <div
                  key={`natural-${species.id}`}
                  className="natural-marker"
                  style={{
                    top: `${(naturalDepth / maxDepth) * 100}%`
                  }}
                >
                  <span className="natural-icon">{species.icon}</span>
                </div>
              ))}
            </div>
          )}

          {/* Zone labels */}
          <div className="zone-labels">
            <div className="zone-label epipelagic">Epipelagic<br/>(Sunlight)</div>
            <div className="zone-label mesopelagic">Mesopelagic<br/>(Twilight)</div>
            <div className="zone-label bathypelagic">Bathypelagic<br/>(Midnight)</div>
          </div>
        </div>

        {/* Light intensity indicator */}
        <div className="light-indicator">
          <div className="indicator-label">Surface Light</div>
          <div className="indicator-value">{totalSurfaceLight.toFixed(2)} lux</div>
          <div className="indicator-bar">
            <div
              className="indicator-fill"
              style={{
                width: `${Math.min((totalSurfaceLight / 100000) * 100, 100)}%`,
                backgroundColor: artificialLight > 100 ? '#F25C54' : '#3BE8B0'
              }}
            />
          </div>
        </div>
      </div>

      {/* Species Selection */}
      <div className="species-selection">
        <h4>Select Species to Track</h4>
        <div className="species-grid">
          {dvmSpecies.slice(0, 8).map(species => (
            <button
              key={species.id}
              className={`species-btn ${selectedSpeciesIds.includes(species.id) ? 'selected' : ''}`}
              onClick={() => toggleSpecies(species.id)}
            >
              <span className="species-icon-large">{species.icon}</span>
              <span className="species-name">{species.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      {artificialLight > 10 && (
        <div className="impact-summary">
          <h4>⚠️ Light Pollution Impact</h4>
          {speciesPositions.map(({ species, suppressionDepth, isDisrupted }) => {
            const status = getDVMStatus({ suppressionDepth, phase, isDisrupted });
            return (
              <div key={species.id} className="impact-item">
                <span className="impact-species">{species.icon} {species.name}</span>
                <span className="impact-status" style={{ color: status.color }}>
                  {status.status}
                </span>
                <span className="impact-depth">
                  {suppressionDepth > 0 ? `↓ ${suppressionDepth.toFixed(0)}m deeper` : 'Natural depth'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DVMSimulator;
