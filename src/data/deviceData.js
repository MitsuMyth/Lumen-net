// Lumenet L1 Device Fleet Data
// Real-time monitoring data for Authority Dashboard

export const l1Devices = [
  {
    id: 'L1-001',
    name: 'Lumenet L1-001',
    location: 'Beirut Marina',
    coordinates: { lat: 33.9010, lng: 35.36 },
    type: 'water', // water or land
    status: 'normal', // normal, warning, offline
    lastUpdate: new Date().toISOString(),

    // Device Health
    health: {
      batteryVoltage: 12.4,
      batteryPercent: 87,
      motorStatus: 'active',
      solarCharging: true,
      uptime: '47h 23m',
      signalStrength: -45, // dBm
    },

    // Sensor Readings
    sensors: {
      // Chemical Sensors
      co2Level: 412, // ppm
      co2Trend: 'stable', // rising, stable, falling

      // Spectral Light Sensors
      lightIntensity: 0.08, // lux
      lightWavelength: 520, // nm (dominant wavelength)
      dayNightStatus: 'night',
      lightDirection: 'NW', // compass direction
      lightPollutionIndex: 'low', // low, medium, high, critical

      // Sonar Biomass Detection
      biomassDensity: 245, // relative units
      dvmMigrationActive: true,
      dvmDepth: 180, // meters
      verticalMovement: 'ascending', // ascending, descending, stable
    },

    // Impact Metrics
    impact: {
      dvmProtectionStatus: 'protected',
      carbonRemovalDaily: 2.4, // tons
      fisheryHealth: 'good',
    }
  },

  {
    id: 'L1-002',
    name: 'Lumenet L1-002',
    location: 'Jounieh Bay',
    coordinates: { lat: 33.9808, lng: 35.47 },
    type: 'water',
    status: 'normal',
    lastUpdate: new Date().toISOString(),

    health: {
      batteryVoltage: 12.1,
      batteryPercent: 82,
      motorStatus: 'active',
      solarCharging: true,
      uptime: '52h 11m',
      signalStrength: -52,
    },

    sensors: {
      co2Level: 418,
      co2Trend: 'rising',

      lightIntensity: 0.12,
      lightWavelength: 515,
      dayNightStatus: 'night',
      lightDirection: 'N',
      lightPollutionIndex: 'medium',

      biomassDensity: 198,
      dvmMigrationActive: true,
      dvmDepth: 165,
      verticalMovement: 'ascending',
    },

    impact: {
      dvmProtectionStatus: 'protected',
      carbonRemovalDaily: 1.9,
      fisheryHealth: 'good',
    }
  },

  {
    id: 'L1-003',
    name: 'Lumenet L1-003',
    location: 'Byblos Coast',
    coordinates: { lat: 34.1184, lng: 35.52 },
    type: 'water',
    status: 'warning',
    lastUpdate: new Date().toISOString(),

    health: {
      batteryVoltage: 11.2,
      batteryPercent: 64,
      motorStatus: 'active',
      solarCharging: false,
      uptime: '28h 45m',
      signalStrength: -68,
    },

    sensors: {
      co2Level: 428,
      co2Trend: 'rising',

      lightIntensity: 0.35,
      lightWavelength: 510,
      dayNightStatus: 'night',
      lightDirection: 'NE',
      lightPollutionIndex: 'high',

      biomassDensity: 142,
      dvmMigrationActive: false,
      dvmDepth: 95,
      verticalMovement: 'stable',
    },

    impact: {
      dvmProtectionStatus: 'at-risk',
      carbonRemovalDaily: 0.8,
      fisheryHealth: 'moderate',
    }
  },

  {
    id: 'L1-004',
    name: 'Lumenet L1-004',
    location: 'Tripoli Harbor',
    coordinates: { lat: 34.4360, lng: 35.69 },
    type: 'water',
    status: 'normal',
    lastUpdate: new Date().toISOString(),

    health: {
      batteryVoltage: 12.6,
      batteryPercent: 91,
      motorStatus: 'active',
      solarCharging: true,
      uptime: '96h 02m',
      signalStrength: -41,
    },

    sensors: {
      co2Level: 408,
      co2Trend: 'stable',

      lightIntensity: 0.05,
      lightWavelength: 525,
      dayNightStatus: 'night',
      lightDirection: 'W',
      lightPollutionIndex: 'low',

      biomassDensity: 312,
      dvmMigrationActive: true,
      dvmDepth: 220,
      verticalMovement: 'ascending',
    },

    impact: {
      dvmProtectionStatus: 'protected',
      carbonRemovalDaily: 3.2,
      fisheryHealth: 'excellent',
    }
  },

  {
    id: 'L1-005',
    name: 'Lumenet L1-005',
    location: 'Tyre Coast',
    coordinates: { lat: 33.2704, lng: 35.07 },
    type: 'water',
    status: 'normal',
    lastUpdate: new Date().toISOString(),

    health: {
      batteryVoltage: 12.3,
      batteryPercent: 85,
      motorStatus: 'active',
      solarCharging: true,
      uptime: '63h 17m',
      signalStrength: -49,
    },

    sensors: {
      co2Level: 415,
      co2Trend: 'stable',

      lightIntensity: 0.09,
      lightWavelength: 518,
      dayNightStatus: 'night',
      lightDirection: 'NW',
      lightPollutionIndex: 'low',

      biomassDensity: 267,
      dvmMigrationActive: true,
      dvmDepth: 195,
      verticalMovement: 'ascending',
    },

    impact: {
      dvmProtectionStatus: 'protected',
      carbonRemovalDaily: 2.7,
      fisheryHealth: 'good',
    }
  },

  // Land-based reference stations
  {
    id: 'REF-001',
    name: 'Beach Station - Beirut',
    location: 'Ramlet al-Baida',
    coordinates: { lat: 33.8938, lng: 35.35 },
    type: 'land',
    status: 'normal',
    lastUpdate: new Date().toISOString(),

    health: {
      batteryVoltage: 13.1,
      batteryPercent: 95,
      motorStatus: 'n/a',
      solarCharging: true,
      uptime: '120h 45m',
      signalStrength: -38,
    },

    sensors: {
      co2Level: 425,
      co2Trend: 'stable',

      lightIntensity: 42.5, // much higher on land
      lightWavelength: 580,
      dayNightStatus: 'night',
      lightDirection: 'ambient',
      lightPollutionIndex: 'critical',

      biomassDensity: null,
      dvmMigrationActive: null,
      dvmDepth: null,
      verticalMovement: null,
    },

    impact: {
      dvmProtectionStatus: null,
      carbonRemovalDaily: null,
      fisheryHealth: null,
    }
  },

  {
    id: 'REF-002',
    name: 'Beach Station - Jounieh',
    location: 'Jounieh Beach',
    coordinates: { lat: 33.9782, lng: 35.49 },
    type: 'land',
    status: 'normal',
    lastUpdate: new Date().toISOString(),

    health: {
      batteryVoltage: 12.9,
      batteryPercent: 92,
      motorStatus: 'n/a',
      solarCharging: true,
      uptime: '108h 22m',
      signalStrength: -42,
    },

    sensors: {
      co2Level: 422,
      co2Trend: 'stable',

      lightIntensity: 38.2,
      lightWavelength: 575,
      dayNightStatus: 'night',
      lightDirection: 'ambient',
      lightPollutionIndex: 'high',

      biomassDensity: null,
      dvmMigrationActive: null,
      dvmDepth: null,
      verticalMovement: null,
    },

    impact: {
      dvmProtectionStatus: null,
      carbonRemovalDaily: null,
      fisheryHealth: null,
    }
  }
];

// Helper function to generate realistic variations
const getRandomVariation = (base, range) => {
  const variation = (Math.random() - 0.5) * 2 * range;
  return parseFloat((base + variation).toFixed(2));
};

// Determine light pollution index based on light intensity
const getLightPollutionIndex = (lightIntensity) => {
  if (lightIntensity < 0.1) return 'low';
  if (lightIntensity < 0.25) return 'medium';
  if (lightIntensity < 0.5) return 'high';
  return 'critical';
};

// Update sensor readings with realistic variations and logical correlations
export const updateSensorData = () => {
  l1Devices.forEach(device => {
    if (device.type === 'water') {
      // Update CO2 levels (±1 ppm variation for 1-second updates)
      const baseCO2 = device.id === 'L1-001' ? 412 :
                      device.id === 'L1-002' ? 418 :
                      device.id === 'L1-003' ? 428 :
                      device.id === 'L1-004' ? 408 : 415;
      const newCO2 = Math.round(getRandomVariation(baseCO2, 1));

      // Update CO2 trend based on actual change
      const co2Change = newCO2 - device.sensors.co2Level;
      device.sensors.co2Level = newCO2;
      device.sensors.co2Trend = co2Change > 0.5 ? 'rising' : co2Change < -0.5 ? 'falling' : 'stable';

      // Update light intensity (±0.01 lux variation)
      const baseLight = device.id === 'L1-001' ? 0.08 :
                        device.id === 'L1-002' ? 0.12 :
                        device.id === 'L1-003' ? 0.35 :
                        device.id === 'L1-004' ? 0.05 : 0.09;
      device.sensors.lightIntensity = getRandomVariation(baseLight, 0.01);

      // Update light pollution index based on intensity (logical correlation)
      device.sensors.lightPollutionIndex = getLightPollutionIndex(device.sensors.lightIntensity);

      // Update light wavelength (±2 nm variation)
      const baseWavelength = device.id === 'L1-001' ? 520 :
                             device.id === 'L1-002' ? 515 :
                             device.id === 'L1-003' ? 510 :
                             device.id === 'L1-004' ? 525 : 518;
      device.sensors.lightWavelength = Math.round(getRandomVariation(baseWavelength, 2));

      // DVM migration active depends on light pollution (logical correlation)
      const isLowPollution = device.sensors.lightPollutionIndex === 'low' ||
                             device.sensors.lightPollutionIndex === 'medium';
      device.sensors.dvmMigrationActive = isLowPollution;

      // Update biomass density (±5 units variation) - higher when DVM is active
      const baseBiomass = device.id === 'L1-001' ? 245 :
                          device.id === 'L1-002' ? 198 :
                          device.id === 'L1-003' ? 142 :
                          device.id === 'L1-004' ? 312 : 267;
      const biomassBoost = device.sensors.dvmMigrationActive ? 1.0 : 0.7;
      device.sensors.biomassDensity = Math.round(getRandomVariation(baseBiomass * biomassBoost, 5));

      // Update DVM depth (±3 meters variation) - correlates with migration activity
      const baseDepth = device.id === 'L1-001' ? 180 :
                        device.id === 'L1-002' ? 165 :
                        device.id === 'L1-003' ? 95 :
                        device.id === 'L1-004' ? 220 : 195;
      const depthAdjustment = device.sensors.dvmMigrationActive ? 1.0 : 0.6;
      device.sensors.dvmDepth = Math.round(getRandomVariation(baseDepth * depthAdjustment, 3));

      // Vertical movement only when DVM is active (logical correlation)
      if (device.sensors.dvmMigrationActive) {
        const movementRandom = Math.random();
        device.sensors.verticalMovement = movementRandom > 0.6 ? 'ascending' :
                                          movementRandom > 0.3 ? 'stable' : 'descending';
      } else {
        device.sensors.verticalMovement = 'stable';
      }

      // Update DVM protection status based on migration activity
      device.impact.dvmProtectionStatus = device.sensors.dvmMigrationActive ? 'protected' : 'at-risk';

      // Update carbon removal based on biomass and DVM activity (logical correlation)
      const carbonBase = device.id === 'L1-001' ? 2.4 :
                         device.id === 'L1-002' ? 1.9 :
                         device.id === 'L1-003' ? 0.8 :
                         device.id === 'L1-004' ? 3.2 : 2.7;
      const carbonMultiplier = (device.sensors.biomassDensity / 200) * (device.sensors.dvmMigrationActive ? 1.0 : 0.5);
      device.impact.carbonRemovalDaily = parseFloat((carbonBase * carbonMultiplier).toFixed(1));

      // Update fishery health based on biomass and DVM status
      if (device.sensors.biomassDensity > 250 && device.sensors.dvmMigrationActive) {
        device.impact.fisheryHealth = 'excellent';
      } else if (device.sensors.biomassDensity > 180 && device.sensors.dvmMigrationActive) {
        device.impact.fisheryHealth = 'good';
      } else if (device.sensors.biomassDensity > 120) {
        device.impact.fisheryHealth = 'moderate';
      } else {
        device.impact.fisheryHealth = 'poor';
      }

      // Update last update timestamp
      device.lastUpdate = new Date().toISOString();
    } else if (device.type === 'land') {
      // Update land station sensors (smaller variations)
      const baseCO2 = device.id === 'REF-001' ? 425 : 422;
      device.sensors.co2Level = Math.round(getRandomVariation(baseCO2, 0.5));

      const baseLight = device.id === 'REF-001' ? 42.5 : 38.2;
      device.sensors.lightIntensity = getRandomVariation(baseLight, 0.5);

      const baseWavelength = device.id === 'REF-001' ? 580 : 575;
      device.sensors.lightWavelength = Math.round(getRandomVariation(baseWavelength, 1));

      device.lastUpdate = new Date().toISOString();
    }
  });
};

// Fleet Summary Statistics
export const getFleetSummary = () => {
  const waterDevices = l1Devices.filter(d => d.type === 'water');

  return {
    totalDevices: l1Devices.length,
    waterDevices: waterDevices.length,
    landDevices: l1Devices.filter(d => d.type === 'land').length,
    activeDevices: l1Devices.filter(d => d.status === 'normal').length,
    warningDevices: l1Devices.filter(d => d.status === 'warning').length,
    offlineDevices: l1Devices.filter(d => d.status === 'offline').length,
    totalCarbonRemoval: waterDevices.reduce((sum, d) => sum + (d.impact.carbonRemovalDaily || 0), 0).toFixed(1),
    avgBatteryLevel: (waterDevices.reduce((sum, d) => sum + d.health.batteryPercent, 0) / waterDevices.length).toFixed(0),
    dvmProtectedSites: waterDevices.filter(d => d.impact.dvmProtectionStatus === 'protected').length,
  };
};
