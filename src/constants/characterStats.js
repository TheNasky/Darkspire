export const BASE_STATS = {
  toughness: { base: 10, min: 8, max: 15, name: "Toughness", description: "HP" },
  endurance: { base: 10, min: 8, max: 15, name: "Endurance", description: "Stamina" },
  strength: { base: 10, min: 8, max: 15, name: "Strength", description: "Physical Power" },
  potency: { base: 10, min: 8, max: 15, name: "Potency", description: "Spell Power" },
  spirit: { base: 10, min: 8, max: 15, name: "Spirit", description: "Mana Regeneration" },
  mind: { base: 10, min: 8, max: 15, name: "Mind", description: "Mana" },
  dexterity: { base: 10, min: 8, max: 15, name: "Dexterity", description: "Critical Chance" },
  lethality: { base: 10, min: 8, max: 15, name: "Lethality", description: "Armor Penetration" },
  resistance: { base: 10, min: 8, max: 15, name: "Resistance", description: "Armor & Magic Resist" },
};

// Base values for derived stats
export const BASE_VALUES = {
  health: 50,
  stamina: 50,
  mana: 0,
  manaRegen: -20, // -20% base mana regen
  staminaRegen: 0,
  physicalPower: 10,
  spellPower: 10,    // Changed to 0 base
  criticalChance: 5, // 5% base crit
  armorPen: 0,
  armor: 20,        // 20 flat armor
  magicResist: 0,   // 0 flat magic resist
};

// Multipliers for stat calculations
export const STAT_MULTIPLIERS = {
  health: 5,        // 5 HP per toughness
  stamina: 5,       // 5 stamina per endurance
  mana: 3,          // 3 mana per mind
  physicalPower: {
    strength: 0.02, // 2% physical damage per strength
    dexterity: 0.01 // 1% physical damage per dexterity
  },
  spellPower: 1,    // 1 flat spell power per potency
  manaRegen: 0.02,  // 2% mana regen per spirit
  criticalChance: 0.5, // 0.5% crit chance per dexterity
  armorPen: 2,      // 2 armor pen per lethality
  armor: 0.02,      // 2% armor per resistance
  magicResist: 2,   // 2 flat magic resist per resistance
};

export const calculateDerivedStats = (stats) => {
  const maxHealth = BASE_VALUES.health + Math.floor(stats.toughness * STAT_MULTIPLIERS.health);
  const maxStamina = BASE_VALUES.stamina + Math.floor(stats.endurance * STAT_MULTIPLIERS.stamina);
  const maxMana = BASE_VALUES.mana + Math.floor(stats.mind * STAT_MULTIPLIERS.mana);

  // Physical power from both strength and dexterity
  const physicalPowerMod = 1 + (stats.strength * STAT_MULTIPLIERS.physicalPower.strength) 
                            + (stats.dexterity * STAT_MULTIPLIERS.physicalPower.dexterity);
  
  return {
    maxHealth,
    maxStamina,
    maxMana,
    staminaRegen: Math.floor(maxStamina * 0.1),
    manaRegen: BASE_VALUES.manaRegen + Math.floor(stats.spirit * STAT_MULTIPLIERS.manaRegen * 100),
    physicalPower: Math.floor(BASE_VALUES.physicalPower * physicalPowerMod),
    spellPower: BASE_VALUES.spellPower + Math.floor(stats.potency * STAT_MULTIPLIERS.spellPower),
    criticalChance: BASE_VALUES.criticalChance + Math.floor(stats.dexterity * STAT_MULTIPLIERS.criticalChance),
    armorPen: BASE_VALUES.armorPen + Math.floor(stats.lethality * STAT_MULTIPLIERS.armorPen),
    armor: Math.floor(BASE_VALUES.armor * (1 + stats.resistance * STAT_MULTIPLIERS.armor)),
    magicResist: BASE_VALUES.magicResist + Math.floor(stats.resistance * STAT_MULTIPLIERS.magicResist)
  };
};

// Add a new function for displaying stats with proper formatting
export const getDisplayStats = (stats) => {
  const derived = calculateDerivedStats(stats);
  return {
    "Max Health": derived.maxHealth,
    "Max Stamina": derived.maxStamina,
    "Max Mana": derived.maxMana,
    "Physical Power": derived.physicalPower,
    "Spell Power": derived.spellPower,
    "Mana Regen": `${derived.manaRegen}%`,
    "Critical Chance": `${derived.criticalChance}%`,
    "Armor Pen": derived.armorPen,
    "Armor": derived.armor,
    "Magic Resist": derived.magicResist
  };
};

