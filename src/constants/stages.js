export const STAGE_BIOMES = {
  FOREST: {
    name: "Forest",
    backgrounds: {
      sky: '/assets/background/Forest/sky.png',
      farClouds: '/assets/background/Forest/far-clouds.png',
      nearClouds: '/assets/background/Forest/near-clouds.png',
      farTrees: '/assets/background/Forest/far-trees.png',
      trees: '/assets/background/Forest/trees.png'
    }
  },
  DESERT: {
    name: "Desert",
    backgrounds: {
      sky: '/assets/background/Desert/sky.png',
      farClouds: '/assets/background/Desert/far-clouds.png',
      nearClouds: '/assets/background/Desert/near-clouds.png',
      farDunes: '/assets/background/Desert/far-dunes.png',
      dunes: '/assets/background/Desert/dunes.png'
    }
  }
  // Add more biomes as needed
};

export const STAGE_CONFIGS = {
  TUTORIAL: {
    id: 'tutorial',
    name: 'Tutorial Stage',
    biome: STAGE_BIOMES.FOREST,
    map: {
      grid: {
        rows: 8,
        cols: 8
      },
      encounters: [
        {
          type: 'battle',
          position: { row: 2, col: 3 },
          battleConfig: {
            grid: {
              rows: 6,
              cols: 6
            },
            enemies: [
              {
                type: 'goblin',
                position: { row: 0, col: 0 }
              }
            ]
          }
        }
      ]
    }
  }
  // Add more stage configurations
}; 