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
