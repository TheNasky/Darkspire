export const BASE_STATS = {
  toughness: { base: 10, min: 8, max: 20, name: "Toughness", description: "HP" },
  endurance: { base: 10, min: 8, max: 20, name: "Endurance", description: "Stamina" },
  strength: { base: 10, min: 8, max: 20, name: "Strength", description: "Physical Power" },
  potency: { base: 10, min: 8, max: 20, name: "Potency", description: "Spell Power" },
  spirit: { base: 10, min: 8, max: 20, name: "Spirit", description: "Magic Regeneration" },
  mind: { base: 10, min: 8, max: 20, name: "Mind", description: "Mana" },
  dexterity: { base: 10, min: 8, max: 20, name: "Dexterity", description: "Critical Chance" },
  lethality: { base: 10, min: 8, max: 20, name: "Lethality", description: "Armor Penetration" },
  resistance: { base: 10, min: 8, max: 20, name: "Resistance", description: "Armor & Magic Resistance" },
};

export const calculateDerivedStats = (stats, characterClass) => {
  return {
    maxHealth: 50+Math.floor(stats.toughness * 5),
    maxStamina: 50+Math.floor(stats.endurance * 5),
    maxMana: 50+Math.floor(stats.mind * 5),
    physicalPower: Math.floor(stats.strength * 5),
    spellPower: Math.floor(stats.potency * 5),
    magicRegen: Math.floor(stats.spirit * 0.5),
    criticalChance: Math.floor(stats.dexterity * 0.5),
    armorPen: Math.floor(stats.lethality * 2),
    defense: Math.floor(stats.resistance * 3),
  };
}; 