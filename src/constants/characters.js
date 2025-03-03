export const CHARACTER_CLASSES = [
  {
    id: "wizard",
    name: "Wizard",
    description: "A powerful spellcaster who excels at area damage and buffs, unleashing devastating spells to eliminate threats and empower allies.",
    unlocked: true,
    portrait: "/assets/characters/Wizard/WizardPortrait.png",
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
    },
    baseStats: {
      toughness: 5,
      endurance: 5,
      strength: 4,
      potency: 15,
      spirit: 12,
      mind: 15,
      dexterity: 6,
      lethality: 4,
      resistance: 6
    }
  },
  {
    id: "ranger",
    name: "Ranger",
    description: "A versatile hunter skilled in tracking and survival, adept at ranged combat and setting traps to control the battlefield.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Ranger/Ranger.png",
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
        shoot: {
          row: 2,
          frameCount: 7,
          frameRate: 5
        },
        hit: {
          row: 3,
          frameCount: 2,
          frameRate: 2
        },
        death: {
          row: 4,
          frameCount: 6,
          frameRate: 4
        }
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        skin: ["f8c090", "c88850"]
      } 
    },
    baseStats: {
      toughness: 7,
      endurance: 10,
      strength: 8,
      potency: 5,
      spirit: 8,
      mind: 6,
      dexterity: 15,
      lethality: 8,
      resistance: 5
    }
  },
  {
    id: "knight",
    name: "Knight",
    description: "A heavily armored defender who mitigates damage while protecting allies and punishing aggressive foes with counterattacks.",
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
    },
    baseStats: {
      toughness: 15,
      endurance: 12,
      strength: 12,
      potency: 3,
      spirit: 5,
      mind: 4,
      dexterity: 6,
      lethality: 5,
      resistance: 10
    }
  },
  {
    id: "lumberjack",
    name: "Lumberjack",
    description: "A rugged woodsman who wields an axe with great strength, capable of dealing heavy damage and clearing paths through obstacles.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Lumberjack/Lumberjack.png",
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
        attack: {
          row: 2,
          frameCount: 8,
          frameRate: 5
        },
        hit: {
          row: 3,
          frameCount: 2,
          frameRate: 2
        },
        death: {
          row: 4,
          frameCount: 6,
          frameRate: 4
        }
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        hair: ["e09128", "e0540d"],
        skin: ["f8c090", "c88850"]
      } 
    },
    baseStats: {
      toughness: 12,
      endurance: 15,
      strength: 15,
      potency: 2,
      spirit: 4,
      mind: 3,
      dexterity: 8,
      lethality: 8,
      resistance: 5
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
        skin: ["f8c090", "c88850"]

      } 
    },
    baseStats: {
      toughness: 8,
      endurance: 10,
      strength: 10,
      potency: 4,
      spirit: 6,
      mind: 5,
      dexterity: 12,
      lethality: 12,
      resistance: 5
    }
  },
  {
    id: "duelist",
    name: "Duelist",
    description: "A swift blade master who excels in agility and precision, outmaneuvering opponents with feints and critical strikes.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Duelist/Duelist.png",
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
        attack: {
          row: 2,
          frameCount: 8,
          frameRate: 5
        },
        hit: {
          row: 3,
          frameCount: 2,
          frameRate: 2
        },
        death: {
          row: 4,
          frameCount: 6,
          frameRate: 4
        }
      },
      baseColors: {
        clothes: ["6098e8", "4058c0","92d0ef"],
        hair: ["b07040", "705030","623f2a"],
        skin: ["f8c090", "c88850"],
        cape: ["d01000","901000"],
      }
    },
    baseStats: {
      toughness: 6,
      endurance: 8,
      strength: 8,
      potency: 5,
      spirit: 7,
      mind: 6,
      dexterity: 15,
      lethality: 15,
      resistance: 2
    }
  },
  {
    id: "cleric",
    name: "Cleric",
    description: "A divine healer and protector, skilled in restoring health and shielding allies from harm while wielding holy magic.",
    unlocked: true,
    spritesheet: {
      path: "/assets/characters/Cleric/Cleric.png",
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
        cast: {
          row: 2,
          frameCount: 5,
          frameRate: 5
        },
        hit: {
          row: 3,
          frameCount: 2,
          frameRate: 2
        },
        death: {
          row: 4,
          frameCount: 6,
          frameRate: 4
        }
      },
      baseColors: {
        clothes: ["6098e8", "4058c0"],
        hair: ["e5e9de", "aeb6a1"],
        skin: ["f8c090", "c88850"]
      }
    },
    baseStats: {
      toughness: 10,
      endurance: 8,
      strength: 6,
      potency: 12,
      spirit: 15,
      mind: 12,
      dexterity: 4,
      lethality: 2,
      resistance: 3
    }
  },
];

// Helper function to get only unlocked classes
export const getUnlockedClasses = () => CHARACTER_CLASSES.filter(c => c.unlocked);

// Helper function to get a specific class by ID
export const getClassById = (id) => CHARACTER_CLASSES.find(c => c.id === id);
  