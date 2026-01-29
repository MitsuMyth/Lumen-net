/**
 * Diel Vertical Migration (DVM) Calculations
 * Scientific modeling of marine organism migration patterns
 */

import {
  calculateLightAtDepth,
  getNaturalSurfaceLight,
  calculateArtificialLightAtPoint,
  calculateSuppressionRadius,
  WATER_CLARITY
} from './lightAttenuation';

/**
 * Calculate optimal migration depth for an organism based on conditions
 * @param {number} timeOfDay - Hour (0-24)
 * @param {number} artificialLight - Additional artificial light (lux)
 * @param {object} species - Species data object
 * @param {string} waterClarity - Water clarity type
 * @returns {object} Migration data
 */
export function calculateMigrationDepth(
  timeOfDay,
  artificialLight = 0,
  species,
  waterClarity = 'moderate'
) {
  const naturalLight = getNaturalSurfaceLight(timeOfDay);
  const totalSurfaceLight = naturalLight + artificialLight;

  // Species light sensitivity threshold
  const threshold = species.lightSensitivity;

  // Find depth where light drops below species tolerance
  let optimalDepth = 0;
  const maxDepth = species.dayDepth[1]; // Maximum depth species can reach

  for (let depth = 0; depth <= maxDepth; depth += 5) {
    const lightAtDepth = calculateLightAtDepth(totalSurfaceLight, depth, waterClarity);
    if (lightAtDepth <= threshold) {
      optimalDepth = depth;
      break;
    }
    optimalDepth = depth;
  }

  // Calculate natural depth (what it would be without artificial light)
  let naturalDepth = 0;
  for (let depth = 0; depth <= maxDepth; depth += 5) {
    const lightAtDepth = calculateLightAtDepth(naturalLight, depth, waterClarity);
    if (lightAtDepth <= threshold) {
      naturalDepth = depth;
      break;
    }
    naturalDepth = depth;
  }

  // Determine migration phase based on time
  const phase = getMigrationPhase(timeOfDay);

  // Calculate target depth based on phase and light
  let targetDepth;
  if (phase === 'ascending' || phase === 'surface') {
    // Night - want to be near surface for feeding
    targetDepth = Math.max(optimalDepth, species.nightDepth[0]);
    targetDepth = Math.min(targetDepth, species.nightDepth[1]);
  } else {
    // Day - descend to avoid predators
    targetDepth = Math.max(optimalDepth, species.dayDepth[0]);
  }

  // Suppression depth (how much deeper they must go due to artificial light)
  const suppressionDepth = optimalDepth - naturalDepth;

  return {
    currentDepth: targetDepth,
    naturalDepth,
    optimalDepth,
    suppressionDepth,
    phase,
    lightAtSurface: totalSurfaceLight,
    lightAtDepth: calculateLightAtDepth(totalSurfaceLight, targetDepth, waterClarity),
    isDisrupted: suppressionDepth > 20 // Significant if pushed down >20m
  };
}

/**
 * Get migration phase based on time of day
 * @param {number} hour - Hour (0-24)
 * @returns {string} Migration phase
 */
export function getMigrationPhase(hour) {
  if (hour >= 5 && hour < 7) return 'descending';      // Dawn descent
  if (hour >= 7 && hour < 17) return 'deep';           // Daytime at depth
  if (hour >= 17 && hour < 19) return 'ascending';     // Dusk ascent
  return 'surface';                                      // Nighttime feeding
}

/**
 * Calculate feeding probability based on conditions
 * @param {number} depth - Current depth (meters)
 * @param {number} lightLevel - Light at depth (lux)
 * @param {object} species - Species data
 * @param {number} timeOfDay - Hour (0-24)
 * @returns {object} Feeding data
 */
export function calculateFeedingProbability(depth, lightLevel, species, timeOfDay) {
  const phase = getMigrationPhase(timeOfDay);

  // Base feeding probability depends on being in feeding zone
  let baseProbability = 0;

  if (phase === 'surface' || phase === 'ascending') {
    // Nighttime - primary feeding period
    const inFeedingZone = depth >= species.nightDepth[0] && depth <= species.nightDepth[1];
    baseProbability = inFeedingZone ? 0.9 : 0.3;
  } else {
    // Daytime - minimal feeding
    baseProbability = 0.1;
  }

  // Light penalty - too much light increases predation risk
  const lightPenalty = Math.min(lightLevel / species.lightSensitivity * 0.01, 0.5);

  // Depth penalty - feeding resources decrease with depth
  const depthPenalty = Math.min(depth / 500, 0.4);

  const finalProbability = Math.max(0, baseProbability - lightPenalty - depthPenalty);

  return {
    probability: finalProbability,
    baseProbability,
    lightPenalty,
    depthPenalty,
    phase,
    inOptimalZone: depth <= species.nightDepth[1] && depth >= species.nightDepth[0]
  };
}

/**
 * Calculate energy balance for an organism
 * @param {number} feedingTime - Hours of effective feeding
 * @param {number} migrationDistance - Total migration distance (meters)
 * @param {object} species - Species data
 * @returns {object} Energy balance data
 */
export function calculateEnergyBalance(feedingTime, migrationDistance, species) {
  // Energy gained from feeding (arbitrary units)
  const energyGained = feedingTime * species.feedingRate * 100;

  // Energy spent on migration
  const migrationCost = migrationDistance * species.metabolicRate * 0.5;

  // Basal metabolic cost (24 hour period)
  const basalCost = 24 * species.metabolicRate * 10;

  const netEnergy = energyGained - migrationCost - basalCost;
  const efficiency = energyGained / (migrationCost + basalCost);

  return {
    energyGained,
    migrationCost,
    basalCost,
    netEnergy,
    efficiency,
    sustainable: netEnergy > 0,
    status: netEnergy > 20 ? 'thriving' : netEnergy > 0 ? 'surviving' : 'stressed'
  };
}

/**
 * Calculate biodiversity impact from light pollution
 * @param {number} lightPollutionLux - Artificial light level
 * @param {number} originalScore - Original biodiversity score (0-100)
 * @param {number} duration - Exposure duration (hours)
 * @returns {object} Impact assessment
 */
export function calculateBiodiversityImpact(lightPollutionLux, originalScore, duration = 12) {
  // Impact factor based on light intensity
  // Research shows effects at very low light levels
  let impactFactor = 0;

  if (lightPollutionLux > 100) {
    impactFactor = 0.4; // Severe - 40% reduction
  } else if (lightPollutionLux > 10) {
    impactFactor = 0.25; // High - 25% reduction
  } else if (lightPollutionLux > 1) {
    impactFactor = 0.15; // Moderate - 15% reduction
  } else if (lightPollutionLux > 0.1) {
    impactFactor = 0.08; // Low - 8% reduction
  } else if (lightPollutionLux > 0.01) {
    impactFactor = 0.03; // Minimal - 3% reduction
  }

  // Duration multiplier (longer exposure = worse impact)
  const durationMultiplier = Math.min(duration / 12, 1.5);

  const totalImpact = impactFactor * durationMultiplier;
  const adjustedScore = originalScore * (1 - totalImpact);

  return {
    originalScore,
    adjustedScore: Math.round(adjustedScore),
    impactPercentage: Math.round(totalImpact * 100),
    severity: totalImpact > 0.3 ? 'critical' : totalImpact > 0.15 ? 'high' : totalImpact > 0.05 ? 'moderate' : 'low',
    dvmSuppressionDepth: calculateDVMSuppressionFromLight(lightPollutionLux),
    affectedRadius: calculateSuppressionRadius(lightPollutionLux)
  };
}

/**
 * Calculate DVM suppression depth from light level
 * @param {number} lightLux - Light intensity (lux)
 * @returns {number} Suppression depth in meters
 */
export function calculateDVMSuppressionFromLight(lightLux) {
  // Based on research: light can suppress DVM up to 400m
  if (lightLux > 100) return 400;
  if (lightLux > 10) return 200;
  if (lightLux > 1) return 100;
  if (lightLux > 0.1) return 50;
  if (lightLux > 0.01) return 20;
  return 0;
}

/**
 * Simulate 24-hour DVM cycle for a species
 * @param {object} species - Species data
 * @param {number} artificialLight - Artificial light level
 * @param {string} waterClarity - Water clarity
 * @returns {Array} Array of hourly migration data
 */
export function simulate24HourCycle(species, artificialLight = 0, waterClarity = 'moderate') {
  const cycle = [];

  for (let hour = 0; hour < 24; hour++) {
    const migration = calculateMigrationDepth(hour, artificialLight, species, waterClarity);
    const feeding = calculateFeedingProbability(
      migration.currentDepth,
      migration.lightAtDepth,
      species,
      hour
    );

    cycle.push({
      hour,
      ...migration,
      feedingProbability: feeding.probability,
      feedingPhase: feeding.phase,
      inOptimalZone: feeding.inOptimalZone
    });
  }

  // Calculate daily summary
  const feedingHours = cycle.filter(h => h.feedingProbability > 0.5).length;
  const avgDepth = cycle.reduce((sum, h) => sum + h.currentDepth, 0) / 24;
  const maxSuppression = Math.max(...cycle.map(h => h.suppressionDepth));

  return {
    hourlyData: cycle,
    summary: {
      effectiveFeedingHours: feedingHours,
      averageDepth: Math.round(avgDepth),
      maxSuppressionDepth: maxSuppression,
      isDisrupted: maxSuppression > 50
    }
  };
}

/**
 * Calculate carbon sequestration impact
 * DVM is responsible for significant carbon transport to deep ocean
 * @param {number} dvmReduction - Percentage reduction in DVM activity
 * @param {number} areaKm2 - Affected area in square kilometers
 * @returns {object} Carbon impact data
 */
export function calculateCarbonImpact(dvmReduction, areaKm2) {
  // DVM transports approximately 1-2 grams of carbon per m² per day to deep ocean
  const baseTransportPerM2 = 1.5; // grams C per m² per day
  const areaM2 = areaKm2 * 1000000;

  const normalDailyTransport = baseTransportPerM2 * areaM2; // grams
  const reducedTransport = normalDailyTransport * (1 - dvmReduction / 100);
  const lostTransport = normalDailyTransport - reducedTransport;

  // Convert to tons
  const lostTransportTons = lostTransport / 1000000;
  const annualLossTons = lostTransportTons * 365;

  return {
    normalDailyTransportKg: normalDailyTransport / 1000,
    reducedDailyTransportKg: reducedTransport / 1000,
    dailyLossKg: lostTransport / 1000,
    annualLossTons: Math.round(annualLossTons),
    percentReduction: dvmReduction,
    equivalentCars: Math.round(annualLossTons / 4.6) // Average car emits 4.6 tons CO2/year
  };
}

/**
 * Get DVM status description
 * @param {object} migrationData - Data from calculateMigrationDepth
 * @returns {object} Status description
 */
export function getDVMStatus(migrationData) {
  const { suppressionDepth, phase, isDisrupted } = migrationData;

  let status, description, color;

  if (suppressionDepth === 0) {
    status = 'Natural';
    description = 'DVM occurring at natural depths';
    color = '#3BE8B0';
  } else if (suppressionDepth < 30) {
    status = 'Minor Disruption';
    description = `Organisms pushed ${suppressionDepth}m deeper than normal`;
    color = '#58B1F0';
  } else if (suppressionDepth < 100) {
    status = 'Moderate Disruption';
    description = `Significant depth change of ${suppressionDepth}m affecting feeding`;
    color = '#FFA500';
  } else if (suppressionDepth < 200) {
    status = 'Severe Disruption';
    description = `Major disruption: ${suppressionDepth}m suppression reducing food access`;
    color = '#FF6B35';
  } else {
    status = 'Critical Disruption';
    description = `Extreme ${suppressionDepth}m suppression, DVM effectively blocked`;
    color = '#F25C54';
  }

  return { status, description, color, phase };
}
