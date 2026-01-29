/**
 * Marine Species Data for DVM Simulation
 * Includes species-specific behavioral parameters
 */

export const marineSpecies = {
  copepods: {
    id: 'copepods',
    name: 'Copepods',
    scientificName: 'Calanus finmarchicus',
    dvmParticipant: true,
    lightSensitivity: 0.001, // lux threshold - very sensitive
    dayDepth: [200, 400],    // meters - daytime refuge depth
    nightDepth: [0, 50],     // meters - nighttime surface feeding
    migrationSpeed: 50,      // meters/hour
    size: '1-5mm',
    feedingGuild: 'herbivore',
    feedingRate: 0.8,        // relative feeding efficiency
    metabolicRate: 0.02,     // relative metabolic cost
    predators: ['small fish', 'jellyfish', 'larval fish'],
    importance: 'Keystone DVM species, primary food source for many fish',
    icon: '🦐',
    color: '#FF6B9D',
    distribution: 'global'
  },

  krill: {
    id: 'krill',
    name: 'Antarctic Krill',
    scientificName: 'Euphausia superba',
    dvmParticipant: true,
    lightSensitivity: 0.005,
    dayDepth: [150, 300],
    nightDepth: [0, 80],
    migrationSpeed: 60,
    size: '6cm',
    feedingGuild: 'herbivore',
    feedingRate: 1.0,
    metabolicRate: 0.03,
    predators: ['whales', 'seals', 'penguins', 'fish'],
    importance: 'Critical to Antarctic food web, supports whale populations',
    icon: '🦐',
    color: '#FF8C94',
    distribution: 'antarctic'
  },

  lanternfish: {
    id: 'lanternfish',
    name: 'Lanternfish',
    scientificName: 'Myctophidae family',
    dvmParticipant: true,
    lightSensitivity: 0.01,
    dayDepth: [300, 600],
    nightDepth: [50, 150],
    migrationSpeed: 100,
    size: '5-15cm',
    feedingGuild: 'carnivore',
    feedingRate: 0.7,
    metabolicRate: 0.05,
    predators: ['tuna', 'sharks', 'dolphins'],
    importance: 'Most abundant vertebrate on Earth, major carbon transporters',
    icon: '🐟',
    color: '#FFD93D',
    distribution: 'global'
  },

  jellyfishSmall: {
    id: 'jellyfishSmall',
    name: 'Small Jellyfish',
    scientificName: 'Various hydromedusae',
    dvmParticipant: true,
    lightSensitivity: 0.02,
    dayDepth: [100, 250],
    nightDepth: [0, 100],
    migrationSpeed: 30,
    size: '1-10cm',
    feedingGuild: 'carnivore',
    feedingRate: 0.5,
    metabolicRate: 0.01,
    predators: ['fish', 'sea turtles'],
    importance: 'Gelatinous zooplankton, increasing with ocean warming',
    icon: '🪼',
    color: '#A8E6CF',
    distribution: 'global'
  },

  squid: {
    id: 'squid',
    name: 'Market Squid',
    scientificName: 'Doryteuthis opalescens',
    dvmParticipant: true,
    lightSensitivity: 0.05,
    dayDepth: [200, 400],
    nightDepth: [20, 100],
    migrationSpeed: 120,
    size: '15-25cm',
    feedingGuild: 'carnivore',
    feedingRate: 0.9,
    metabolicRate: 0.08,
    predators: ['sharks', 'tuna', 'seals', 'whales'],
    importance: 'Commercial fishery species, preys on DVM organisms',
    icon: '🦑',
    color: '#B4A7D6',
    distribution: 'temperate'
  },

  larvaefish: {
    id: 'larvaefish',
    name: 'Fish Larvae',
    scientificName: 'Various teleost larvae',
    dvmParticipant: true,
    lightSensitivity: 0.008,
    dayDepth: [50, 150],
    nightDepth: [0, 40],
    migrationSpeed: 20,
    size: '2-10mm',
    feedingGuild: 'carnivore',
    feedingRate: 0.6,
    metabolicRate: 0.04,
    predators: ['jellyfish', 'small fish', 'copepods'],
    importance: 'Early life stage of most fish species, vulnerable to disruption',
    icon: '🐠',
    color: '#88CCF1',
    distribution: 'global'
  },

  salps: {
    id: 'salps',
    name: 'Salps',
    scientificName: 'Salpa fusiformis',
    dvmParticipant: true,
    lightSensitivity: 0.015,
    dayDepth: [100, 200],
    nightDepth: [0, 80],
    migrationSpeed: 40,
    size: '1-10cm',
    feedingGuild: 'herbivore',
    feedingRate: 0.7,
    metabolicRate: 0.015,
    predators: ['fish', 'sea turtles'],
    importance: 'Efficient filter feeders, form massive blooms',
    icon: '🫧',
    color: '#C7CEEA',
    distribution: 'global'
  },

  chaetognaths: {
    id: 'chaetognaths',
    name: 'Arrow Worms',
    scientificName: 'Sagitta elegans',
    dvmParticipant: true,
    lightSensitivity: 0.003,
    dayDepth: [150, 300],
    nightDepth: [20, 100],
    migrationSpeed: 45,
    size: '5-10mm',
    feedingGuild: 'carnivore',
    feedingRate: 0.65,
    metabolicRate: 0.025,
    predators: ['small fish', 'jellyfish'],
    importance: 'Important predators of copepods and larvae',
    icon: '🪱',
    color: '#FFDAC1',
    distribution: 'global'
  },

  pteropods: {
    id: 'pteropods',
    name: 'Sea Butterflies',
    scientificName: 'Limacina helicina',
    dvmParticipant: true,
    lightSensitivity: 0.006,
    dayDepth: [100, 250],
    nightDepth: [0, 60],
    migrationSpeed: 35,
    size: '3-8mm',
    feedingGuild: 'herbivore',
    feedingRate: 0.55,
    metabolicRate: 0.018,
    predators: ['fish', 'whales'],
    importance: 'Vulnerable to ocean acidification, food for salmon',
    icon: '🦋',
    color: '#B5EAD7',
    distribution: 'polar/temperate'
  },

  amphipods: {
    id: 'amphipods',
    name: 'Amphipods',
    scientificName: 'Various gammarid species',
    dvmParticipant: true,
    lightSensitivity: 0.004,
    dayDepth: [150, 350],
    nightDepth: [10, 70],
    migrationSpeed: 55,
    size: '5-20mm',
    feedingGuild: 'omnivore',
    feedingRate: 0.7,
    metabolicRate: 0.022,
    predators: ['fish', 'seabirds'],
    importance: 'Scavengers and detritivores in marine food web',
    icon: '🦐',
    color: '#FFB7B2',
    distribution: 'global'
  },

  medusae: {
    id: 'medusae',
    name: 'Jellyfish Medusae',
    scientificName: 'Pelagia noctiluca',
    dvmParticipant: true,
    lightSensitivity: 0.025,
    dayDepth: [80, 180],
    nightDepth: [0, 90],
    migrationSpeed: 35,
    size: '5-20cm',
    feedingGuild: 'carnivore',
    feedingRate: 0.6,
    metabolicRate: 0.012,
    predators: ['sea turtles', 'ocean sunfish'],
    importance: 'Bioluminescent, affected by light pollution',
    icon: '🪼',
    color: '#E2B0FF',
    distribution: 'mediterranean/atlantic'
  },

  siphonophores: {
    id: 'siphonophores',
    name: 'Siphonophores',
    scientificName: 'Nanomia bijuga',
    dvmParticipant: true,
    lightSensitivity: 0.012,
    dayDepth: [200, 500],
    nightDepth: [50, 150],
    migrationSpeed: 40,
    size: '10-40cm colonies',
    feedingGuild: 'carnivore',
    feedingRate: 0.75,
    metabolicRate: 0.02,
    predators: ['fish', 'sea turtles'],
    importance: 'Colonial organisms, important deep-sea predators',
    icon: '🎐',
    color: '#CFBAF0',
    distribution: 'global'
  },

  mysids: {
    id: 'mysids',
    name: 'Mysid Shrimp',
    scientificName: 'Mysis mixta',
    dvmParticipant: true,
    lightSensitivity: 0.007,
    dayDepth: [100, 200],
    nightDepth: [0, 50],
    migrationSpeed: 50,
    size: '5-15mm',
    feedingGuild: 'omnivore',
    feedingRate: 0.65,
    metabolicRate: 0.024,
    predators: ['fish', 'seabirds'],
    importance: 'Coastal DVM species, estuarine importance',
    icon: '🦐',
    color: '#FFE5B4',
    distribution: 'coastal'
  },

  decapodLarvae: {
    id: 'decapodLarvae',
    name: 'Crab/Lobster Larvae',
    scientificName: 'Various decapod larvae',
    dvmParticipant: true,
    lightSensitivity: 0.009,
    dayDepth: [80, 180],
    nightDepth: [0, 60],
    migrationSpeed: 30,
    size: '2-8mm',
    feedingGuild: 'omnivore',
    feedingRate: 0.6,
    metabolicRate: 0.03,
    predators: ['fish', 'jellyfish', 'other larvae'],
    importance: 'Larval stage of commercially important crustaceans',
    icon: '🦀',
    color: '#FF9AA2',
    distribution: 'global'
  },

  ctenophores: {
    id: 'ctenophores',
    name: 'Comb Jellies',
    scientificName: 'Mnemiopsis leidyi',
    dvmParticipant: true,
    lightSensitivity: 0.018,
    dayDepth: [60, 150],
    nightDepth: [0, 70],
    migrationSpeed: 25,
    size: '3-10cm',
    feedingGuild: 'carnivore',
    feedingRate: 0.7,
    metabolicRate: 0.015,
    predators: ['fish', 'sea turtles'],
    importance: 'Bioluminescent, invasive in some regions',
    icon: '✨',
    color: '#C7F0DB',
    distribution: 'global'
  }
};

// Species grouped by region
export const speciesByRegion = {
  mediterranean: ['copepods', 'lanternfish', 'jellyfishSmall', 'squid', 'medusae', 'larvaefish', 'pteropods'],
  atlantic: ['copepods', 'krill', 'lanternfish', 'squid', 'amphipods', 'siphonophores'],
  pacific: ['copepods', 'lanternfish', 'squid', 'salps', 'pteropods', 'siphonophores'],
  antarctic: ['krill', 'copepods', 'amphipods', 'salps'],
  coastal: ['mysids', 'decapodLarvae', 'jellyfishSmall', 'copepods']
};

// Get species array
export const getSpeciesArray = () => Object.values(marineSpecies);

// Get species by region
export const getSpeciesByRegion = (region) => {
  const speciesIds = speciesByRegion[region] || speciesByRegion.mediterranean;
  return speciesIds.map(id => marineSpecies[id]);
};

// Get DVM participant species only
export const getDVMSpecies = () => {
  return getSpeciesArray().filter(species => species.dvmParticipant);
};

export default marineSpecies;
