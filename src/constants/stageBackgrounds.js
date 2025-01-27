export const STAGE_BIOMES = {
  FOREST: {
    key: 'forest',
    layers: [
      { key: 'back', path: '/assets/background/Forest1/back.png', speed: 0.02 },
      { key: 'middle', path: '/assets/background/Forest1/middle.png', speed: 0.1 },
      { key: 'front', path: '/assets/background/Forest1/front.png', speed: 0.3 },
    ]
  },
  DESERT: {
    key: 'desert',
    layers: [
      { key: '1', path: '/assets/background/Desert/sky.png', speed: 0.02 },
      { key: '2', path: '/assets/background/Desert/clouds.png', speed: 0.1 },
      { key: '3', path: '/assets/background/Desert/dunes-bg.png', speed: 0.3 },
      { key: '4', path: '/assets/background/Desert/dunes.png', speed: 0.55 }
    ]
  }
  // Add more biomes as needed
}; 