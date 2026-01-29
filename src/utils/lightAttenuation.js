/**
 * Light Attenuation Calculations for DVM Simulation
 * Based on Beer-Lambert Law: I(z) = I₀ × e^(-k × z)
 */

// Water clarity coefficients (attenuation per meter)
export const WATER_CLARITY = {
  crystal: 0.02,      // Very clear oceanic water
  clear: 0.05,        // Clear coastal water
  moderate: 0.1,      // Moderate visibility
  turbid: 0.2,        // Turbid/murky water
  veryTurbid: 0.4     // Very turbid (river mouths, polluted)
};

// Light wavelength attenuation (different colors penetrate differently)
export const WAVELENGTH_ATTENUATION = {
  red: 0.5,           // Red light absorbed quickly (top 10m)
  orange: 0.3,
  yellow: 0.15,
  green: 0.08,        // Green penetrates deepest
  blue: 0.06,         // Blue light penetrates well
  violet: 0.1,
  white: 0.1          // Average for white light
};

// Surface light levels (lux) at different times
export const SURFACE_LIGHT = {
  fullSun: 100000,        // Bright sunlight
  overcast: 10000,        // Cloudy day
  sunset: 400,            // Sunset/sunrise
  civilTwilight: 10,      // Just after sunset
  nauticalTwilight: 1,    // Darker twilight
  fullMoon: 0.3,          // Full moon night
  quarterMoon: 0.05,      // Quarter moon
  starlight: 0.001,       // Starlight only
  overcastNight: 0.0001   // Overcast night
};

// Artificial light sources (lux at source)
export const ARTIFICIAL_LIGHT = {
  cargoShip: 50000,       // Cargo ship deck lights
  fishingVessel: 100000,  // Fishing vessel (attracting fish)
  oilPlatform: 200000,    // Offshore oil platform
  coastalCity: 30000,     // Coastal city glow
  portFacility: 80000,    // Major port
  cruiseShip: 60000       // Cruise ship
};

/**
 * Calculate light intensity at a given depth using Beer-Lambert Law
 * @param {number} surfaceLight - Light intensity at surface (lux)
 * @param {number} depth - Depth in meters
 * @param {string} waterClarity - Water clarity type
 * @param {string} wavelength - Light wavelength/color
 * @returns {number} Light intensity at depth (lux)
 */
export function calculateLightAtDepth(
  surfaceLight,
  depth,
  waterClarity = 'moderate',
  wavelength = 'white'
) {
  const k = WATER_CLARITY[waterClarity] || WATER_CLARITY.moderate;
  const wavelengthFactor = WAVELENGTH_ATTENUATION[wavelength] || WAVELENGTH_ATTENUATION.white;
  const totalAttenuation = k * wavelengthFactor * 10; // Combined factor

  return surfaceLight * Math.exp(-totalAttenuation * depth / 10);
}

/**
 * Get the ocean zone based on depth
 * @param {number} depth - Depth in meters
 * @returns {object} Zone information
 */
export function getOceanZone(depth) {
  if (depth < 200) {
    return {
      name: 'Epipelagic',
      alias: 'Sunlight Zone',
      lightLevel: 'high',
      color: '#58B1F0',
      description: 'Photosynthesis occurs, most marine life'
    };
  } else if (depth < 1000) {
    return {
      name: 'Mesopelagic',
      alias: 'Twilight Zone',
      lightLevel: 'low',
      color: '#1a4a6e',
      description: 'DVM organisms spend daytime here'
    };
  } else if (depth < 4000) {
    return {
      name: 'Bathypelagic',
      alias: 'Midnight Zone',
      lightLevel: 'none',
      color: '#0a1929',
      description: 'No sunlight, bioluminescence only'
    };
  } else if (depth < 6000) {
    return {
      name: 'Abyssopelagic',
      alias: 'Abyssal Zone',
      lightLevel: 'none',
      color: '#050d14',
      description: 'Near-freezing, extreme pressure'
    };
  } else {
    return {
      name: 'Hadopelagic',
      alias: 'Hadal Zone',
      lightLevel: 'none',
      color: '#000000',
      description: 'Ocean trenches, deepest areas'
    };
  }
}

/**
 * Calculate the depth at which light falls below a threshold
 * @param {number} surfaceLight - Surface light (lux)
 * @param {number} threshold - Light threshold (lux)
 * @param {string} waterClarity - Water clarity type
 * @returns {number} Depth in meters
 */
export function calculateLightPenetrationDepth(
  surfaceLight,
  threshold,
  waterClarity = 'moderate'
) {
  const k = WATER_CLARITY[waterClarity] || WATER_CLARITY.moderate;
  if (surfaceLight <= threshold) return 0;

  // Solve for z: threshold = surfaceLight × e^(-k×z)
  // z = -ln(threshold/surfaceLight) / k
  return -Math.log(threshold / surfaceLight) / k;
}

/**
 * Calculate light from artificial source at distance
 * Uses inverse square law with water attenuation
 * @param {number} sourceIntensity - Light at source (lux)
 * @param {number} distance - Horizontal distance (meters)
 * @param {number} depth - Depth in water (meters)
 * @param {string} waterClarity - Water clarity
 * @returns {number} Light intensity (lux)
 */
export function calculateArtificialLightAtPoint(
  sourceIntensity,
  distance,
  depth,
  waterClarity = 'moderate'
) {
  // Inverse square law for horizontal spread
  const horizontalAttenuation = sourceIntensity / Math.pow(Math.max(distance, 1), 2);

  // Beer-Lambert for vertical attenuation
  const verticalLight = calculateLightAtDepth(
    horizontalAttenuation * 1000, // Scale factor
    depth,
    waterClarity
  );

  return verticalLight;
}

/**
 * Calculate the DVM suppression radius from an artificial light source
 * Based on research: effects can extend up to 2km horizontally
 * @param {number} sourceIntensity - Light source intensity (lux)
 * @param {number} sensitivityThreshold - Organism light sensitivity (lux)
 * @returns {number} Suppression radius in meters
 */
export function calculateSuppressionRadius(sourceIntensity, sensitivityThreshold = 0.001) {
  // Empirical formula based on research
  // At 2km, light from major sources still affects sensitive organisms
  const baseRadius = Math.sqrt(sourceIntensity / sensitivityThreshold) * 0.5;
  return Math.min(baseRadius, 5000); // Cap at 5km max
}

/**
 * Get natural surface light based on time of day
 * @param {number} hour - Hour (0-24)
 * @param {number} moonPhase - Moon phase (0 = new, 0.5 = full, 1 = new)
 * @returns {number} Surface light in lux
 */
export function getNaturalSurfaceLight(hour, moonPhase = 0.5) {
  // Sunrise around 6, sunset around 18 (simplified)
  const sunriseHour = 6;
  const sunsetHour = 18;

  if (hour >= sunriseHour + 1 && hour <= sunsetHour - 1) {
    // Daytime - varies with sun angle
    const midday = (sunriseHour + sunsetHour) / 2;
    const hoursFromMidday = Math.abs(hour - midday);
    const maxHoursFromMidday = (sunsetHour - sunriseHour) / 2;
    const sunAngleFactor = 1 - (hoursFromMidday / maxHoursFromMidday) * 0.5;
    return SURFACE_LIGHT.fullSun * sunAngleFactor;
  } else if (hour >= sunriseHour && hour < sunriseHour + 1) {
    // Sunrise transition
    const progress = hour - sunriseHour;
    return SURFACE_LIGHT.civilTwilight + progress * (SURFACE_LIGHT.overcast - SURFACE_LIGHT.civilTwilight);
  } else if (hour > sunsetHour - 1 && hour <= sunsetHour) {
    // Sunset transition
    const progress = sunsetHour - hour;
    return SURFACE_LIGHT.civilTwilight + progress * (SURFACE_LIGHT.overcast - SURFACE_LIGHT.civilTwilight);
  } else {
    // Nighttime - depends on moon phase
    const moonLight = SURFACE_LIGHT.fullMoon * Math.sin(moonPhase * Math.PI);
    return Math.max(moonLight, SURFACE_LIGHT.starlight);
  }
}

/**
 * Generate light profile for depth range
 * @param {number} surfaceLight - Surface light (lux)
 * @param {number} maxDepth - Maximum depth to calculate
 * @param {number} step - Depth step size
 * @param {string} waterClarity - Water clarity
 * @returns {Array} Array of {depth, light, zone} objects
 */
export function generateLightProfile(
  surfaceLight,
  maxDepth = 500,
  step = 10,
  waterClarity = 'moderate'
) {
  const profile = [];

  for (let depth = 0; depth <= maxDepth; depth += step) {
    const light = calculateLightAtDepth(surfaceLight, depth, waterClarity);
    const zone = getOceanZone(depth);

    profile.push({
      depth,
      light,
      lightLog: light > 0 ? Math.log10(light) : -10,
      zone: zone.name,
      zoneColor: zone.color
    });
  }

  return profile;
}
