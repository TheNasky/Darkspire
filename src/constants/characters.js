export const CHARACTER_CLASSES = [
  {
    id: "wizard",
    name: "Wizard",
    description: "A powerful spellcaster who excels at area damage and buffs, unleashing devastating spells and empowering allies.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Wizard/Wizard.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4
        },
        walk: {
          row: 1,
          frameCount: 6,
          frameRate: 6
        },
        jump: {
          row: 2,
          frameCount: 3,
          frameRate: 3
        },
        attack: {
          row: 3,
          frameCount: 11,
          frameRate: 5.5
        },
        attack2: {
          row: 4,
          frameCount: 9,
          frameRate: 4.5
        },
        spell: {
          row: 5,
          frameCount: 9,
          frameRate: 4.5
        },
        hit: {
          row: 6,
          frameCount: 2,
          frameRate: 2
        },
        death: {
          row: 7,
          frameCount: 9,
          frameRate: 4.5
        }
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        hair: ["4e4b49", "3e3b39"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
  // {
  //   id: "cleric",
  //   name: "Cleric",
  //   description: "Divine healer and protector",
  //   unlocked: true,
  //   spriteInfo: {
  //     idle: {
  //       path: "/assets/characters/Cleric/idle",
  //       frameCount: 4,
  //       frameRate: 4,
  //     },
  //   },
  // },
  // {
  //   id: "duelist",
  //   name: "Duelist",
  //   description: "Swift blade master",
  //   unlocked: true,
  //   spriteInfo: {
  //     idle: {
  //       path: "/assets/characters/Duelist/idle",
  //       frameCount: 4,
  //       frameRate: 4,
  //     },
  //   },
  // },
  // {
  //   id: "archer",
  //   name: "Archer",
  //   description: "Master of the bow",
  //   unlocked: true,
  //   spriteInfo: {
  //     idle: {
  //       path: "/assets/characters/Archer/idle",
  //       frameCount: 4,
  //       frameRate: 4,
  //     },
  //   },
  // },
  {
    id: "spearman",
    name: "Spearman",
    description: "A tactical fighter who excels at zone control, using precise positioning and sweeping attacks to keep enemies at bay.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Spearman/Spearman.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4,
        },
        // Add other animations if needed
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        hair: ["4e4b49", "3e3b39"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
  {
    id: "knight",
    name: "Knight",
    description: "A heavily armored defender who mitigates damage while protecting allies and punishing aggressive foes.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Knight/Knight.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4,
        },
        // Add other animations if needed
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
  {
    id: "spearman",
    name: "Spearman",
    description: "A tactical fighter who excels at zone control, using precise positioning and sweeping attacks to keep enemies at bay.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Spearman/Spearman.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4,
        },
        // Add other animations if needed
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        hair: ["4e4b49", "3e3b39"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
  {
    id: "knight",
    name: "Knight",
    description: "A heavily armored defender who mitigates damage while protecting allies and punishing aggressive foes.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Knight/Knight.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4,
        },
        // Add other animations if needed
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
  {
    id: "spearman",
    name: "Spearman",
    description: "A tactical fighter who excels at zone control, using precise positioning and sweeping attacks to keep enemies at bay.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Spearman/Spearman.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4,
        },
        // Add other animations if needed
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        hair: ["4e4b49", "3e3b39"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
  {
    id: "knight",
    name: "Knight",
    description: "A heavily armored defender who mitigates damage while protecting allies and punishing aggressive foes.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Knight/Knight.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4,
        },
        // Add other animations if needed
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        skin: ["f8c090", "c88850"]
      }
    }
  },
];

// Helper function to get only unlocked classes
export const getUnlockedClasses = () => CHARACTER_CLASSES.filter(c => c.unlocked);

// Helper function to get a specific class by ID
export const getClassById = (id) => CHARACTER_CLASSES.find(c => c.id === id);
  