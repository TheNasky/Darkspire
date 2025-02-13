export const NPCS = [
  {
    id: "general_merchant",
    name: "General Merchant",
    spritesheet: {
      path: "/assets/NPCS/GeneralMerchant/GeneralMerchant.png",
      frameWidth: 32,
      frameHeight: 32,
      animations: {
        idle: {
          row: 0,
          frameCount: 4,
          frameRate: 4
        }
      },
      baseColors: {
        clothes: ["b07040", "b07040"],
        skin: ["f8c090", "c88850"]
      }
    }
  }
  // Add more NPCs as needed
];

export const getNpcById = (id) => NPCS.find(npc => npc.id === id); 