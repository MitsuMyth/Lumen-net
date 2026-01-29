/**
 * Light Pollution Sources Data
 * Global and Lebanon-specific artificial light sources affecting marine DVM
 */

// Lebanese coastal light pollution sources
export const lebanonLightSources = [
  {
    id: 'beirut-port',
    name: 'Beirut Port',
    coords: [33.9010, 35.5200],
    type: 'port',
    intensity: 80000, // lux at source
    radius: 3000, // meters affected
    operational: '24/7',
    impact: 'critical',
    description: 'Major commercial port with extensive nighttime operations'
  },
  {
    id: 'tripoli-port',
    name: 'Tripoli Port',
    coords: [34.4492, 35.8217],
    type: 'port',
    intensity: 60000,
    radius: 2500,
    operational: '24/7',
    impact: 'high',
    description: 'Second largest port, significant industrial lighting'
  },
  {
    id: 'beirut-corniche',
    name: 'Beirut Corniche',
    coords: [33.8938, 35.4818],
    type: 'coastal_city',
    intensity: 30000,
    radius: 2000,
    operational: '18:00-06:00',
    impact: 'high',
    description: 'Popular waterfront promenade with extensive street lighting'
  },
  {
    id: 'jounieh-bay',
    name: 'Jounieh Bay',
    coords: [33.9808, 35.6178],
    type: 'coastal_city',
    intensity: 25000,
    radius: 1800,
    operational: '18:00-02:00',
    impact: 'moderate',
    description: 'Tourist area with restaurants, clubs, and marina lighting'
  },
  {
    id: 'tyre-fishing',
    name: 'Tyre Fishing Port',
    coords: [33.2720, 35.2030],
    type: 'fishing',
    intensity: 45000,
    radius: 1500,
    operational: '20:00-04:00',
    impact: 'moderate',
    description: 'Active fishing port with boat lights attracting fish'
  },
  {
    id: 'sidon-port',
    name: 'Sidon Port',
    coords: [33.5630, 35.3730],
    type: 'port',
    intensity: 50000,
    radius: 2000,
    operational: '24/7',
    impact: 'high',
    description: 'Historical port with modern cargo operations'
  },
  {
    id: 'batroun-coast',
    name: 'Batroun Coastal Strip',
    coords: [34.2553, 35.6583],
    type: 'coastal_city',
    intensity: 15000,
    radius: 1000,
    operational: '19:00-01:00',
    impact: 'low',
    description: 'Growing tourist destination with beach clubs'
  },
  {
    id: 'byblos-harbor',
    name: 'Byblos Old Harbor',
    coords: [34.1213, 35.6483],
    type: 'fishing',
    intensity: 20000,
    radius: 800,
    operational: '18:00-23:00',
    impact: 'low',
    description: 'Ancient harbor, now tourist attraction with ambient lighting'
  }
];

// Global major light pollution sources
export const globalLightSources = [
  // Mediterranean hotspots
  {
    id: 'suez-canal',
    name: 'Suez Canal Shipping Route',
    coords: [30.0, 32.5],
    type: 'shipping',
    intensity: 100000,
    radius: 5000,
    operational: '24/7',
    impact: 'critical',
    description: 'One of busiest shipping routes, constant ship traffic'
  },
  {
    id: 'gibraltar',
    name: 'Strait of Gibraltar',
    coords: [36.0, -5.5],
    type: 'shipping',
    intensity: 90000,
    radius: 4000,
    operational: '24/7',
    impact: 'critical',
    description: 'Major maritime chokepoint with heavy traffic'
  },
  {
    id: 'marseille',
    name: 'Port of Marseille',
    coords: [43.3, 5.4],
    type: 'port',
    intensity: 120000,
    radius: 4000,
    operational: '24/7',
    impact: 'critical',
    description: 'Largest port in France and Mediterranean'
  },
  {
    id: 'barcelona',
    name: 'Barcelona Port',
    coords: [41.38, 2.18],
    type: 'port',
    intensity: 100000,
    radius: 3500,
    operational: '24/7',
    impact: 'critical',
    description: 'Major cruise and cargo port'
  },
  {
    id: 'haifa',
    name: 'Haifa Port',
    coords: [32.82, 34.98],
    type: 'port',
    intensity: 95000,
    radius: 3500,
    operational: '24/7',
    impact: 'critical',
    description: 'Major Mediterranean port with refinery'
  },

  // Offshore platforms
  {
    id: 'egypt-offshore',
    name: 'Egyptian Gas Fields',
    coords: [31.5, 33.0],
    type: 'oil_platform',
    intensity: 200000,
    radius: 6000,
    operational: '24/7',
    impact: 'critical',
    description: 'Offshore gas extraction platforms with intense lighting'
  },
  {
    id: 'cyprus-drilling',
    name: 'Cyprus Offshore Drilling',
    coords: [34.5, 33.0],
    type: 'oil_platform',
    intensity: 180000,
    radius: 5000,
    operational: '24/7',
    impact: 'critical',
    description: 'Natural gas exploration platforms'
  },

  // Fishing fleets
  {
    id: 'sicily-fishing',
    name: 'Sicilian Fishing Fleet',
    coords: [37.0, 14.0],
    type: 'fishing',
    intensity: 150000,
    radius: 4000,
    operational: '20:00-04:00',
    impact: 'high',
    description: 'Large-scale commercial fishing with light attraction'
  },
  {
    id: 'libya-fishing',
    name: 'Libyan Coast Fishing',
    coords: [32.5, 22.0],
    type: 'fishing',
    intensity: 130000,
    radius: 3500,
    operational: '19:00-05:00',
    impact: 'high',
    description: 'Industrial fishing operations'
  }
];

// Light source types metadata
export const lightSourceTypes = {
  port: {
    icon: '⚓',
    color: '#FF6B35',
    description: 'Commercial and cargo ports with 24/7 operations',
    avgIntensity: 80000,
    avgRadius: 3000
  },
  fishing: {
    icon: '🎣',
    color: '#FFD93D',
    description: 'Fishing vessels using lights to attract catch',
    avgIntensity: 100000,
    avgRadius: 2500
  },
  shipping: {
    icon: '🚢',
    color: '#F25C54',
    description: 'Major shipping lanes with constant vessel traffic',
    avgIntensity: 80000,
    avgRadius: 4000
  },
  oil_platform: {
    icon: '🛢️',
    color: '#C44569',
    description: 'Offshore oil/gas platforms with intense lighting',
    avgIntensity: 200000,
    avgRadius: 5000
  },
  coastal_city: {
    icon: '🏙️',
    color: '#58B1F0',
    description: 'Coastal urban areas with street and building lights',
    avgIntensity: 30000,
    avgRadius: 2000
  },
  cruise: {
    icon: '🛳️',
    color: '#A8E6CF',
    description: 'Cruise ships with extensive deck and cabin lighting',
    avgIntensity: 60000,
    avgRadius: 1500
  }
};

// Get all light sources combined
export const getAllLightSources = () => {
  return [...lebanonLightSources, ...globalLightSources];
};

// Get light sources by type
export const getLightSourcesByType = (type) => {
  return getAllLightSources().filter(source => source.type === type);
};

// Get light sources by impact level
export const getLightSourcesByImpact = (impactLevel) => {
  return getAllLightSources().filter(source => source.impact === impactLevel);
};

// Get light sources within radius of point
export const getLightSourcesNearPoint = (lat, lon, radiusKm) => {
  return getAllLightSources().filter(source => {
    const distance = calculateDistance(lat, lon, source.coords[0], source.coords[1]);
    return distance <= radiusKm;
  });
};

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Calculate total light pollution at a location
export const calculateTotalLightPollution = (lat, lon, depth = 0) => {
  const nearbySources = getLightSourcesNearPoint(lat, lon, 50); // Within 50km

  let totalLight = 0;
  const contributingSources = [];

  nearbySources.forEach(source => {
    const distance = calculateDistance(lat, lon, source.coords[0], source.coords[1]) * 1000; // to meters

    if (distance <= source.radius) {
      // Simplified light contribution calculation
      const lightContribution = source.intensity * Math.exp(-distance / source.radius);
      totalLight += lightContribution;

      contributingSources.push({
        ...source,
        distance,
        contribution: lightContribution
      });
    }
  });

  return {
    totalLight,
    contributingSources,
    dominantSource: contributingSources.length > 0
      ? contributingSources.reduce((max, source) =>
          source.contribution > max.contribution ? source : max
        )
      : null
  };
};

export default {
  lebanonLightSources,
  globalLightSources,
  lightSourceTypes,
  getAllLightSources,
  getLightSourcesByType,
  getLightSourcesByImpact,
  getLightSourcesNearPoint,
  calculateTotalLightPollution
};
