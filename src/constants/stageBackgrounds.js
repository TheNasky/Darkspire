export const STAGE_BIOMES = {
  FOREST: {
    key: 'forest',
    layers: [
      { key: 'back', path: '/assets/background/Forest1/back.png', speed: 0.02, yOffsetMod: 0 },
      { key: 'middle', path: '/assets/background/Forest1/middle.png', speed: 0.1, yOffsetMod: 0 },
      { key: 'front', path: '/assets/background/Forest1/front.png', speed: 0.3, yOffsetMod: 0 },
    ]
  },
  DESERT: {
    key: 'desert',
    layers: [
      { key: '1', path: '/assets/background/Desert/sky.png', speed: 0.02, yOffsetMod: 0 },
      { key: '2', path: '/assets/background/Desert/clouds.png', speed: 0.1, yOffsetMod: 0 },
      { key: '3', path: '/assets/background/Desert/dunes-bg.png', speed: 0.3, yOffsetMod: 0 },
      { key: '4', path: '/assets/background/Desert/dunes.png', speed: 0.55, yOffsetMod: 0 }
    ]
  },
  FOREST2: {
    key: 'forest2',
    layers: [
      { key: 'back', path: '/assets/background/Forest2/back.png', speed: 0.02, yOffsetMod: 0.2 },
      { key: 'middle', path: '/assets/background/Forest2/middle.png', speed: 0.1, yOffsetMod: 0 },
    ]
  },
  // Add more biomes as needed
}; 