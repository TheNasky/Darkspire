import { useState } from "react";
import useCharacterStore from "../../store/characterStore";
import CharacterSprite from "../CharacterSprite";
import ItemSprite from "../ItemSprite";

const EQUIPMENT_SLOTS = {
  // Left side slots
  HELMET: { id: "helmet", name: "Helmet", position: "left-top" },
  ARMOR: { id: "armor", name: "Armor", position: "left-middle" },
  BOOTS: { id: "boots", name: "Boots", position: "left-center" },
  AMULET: { id: "amulet", name: "Amulet", position: "left-bottom" },
  RING_1: { id: "ring_1", name: "Ring", position: "left-footer" },
  RING_2: { id: "ring_2", name: "Ring", position: "left-footer-2" },
  // Right side slots
  BAG_1: { id: "bag_1", name: "Bag", position: "right-top" },
  BAG_2: { id: "bag_2", name: "Bag", position: "right-middle" },
  BAG_3: { id: "bag_3", name: "Bag", position: "right-center" },

  // Bottom slots
  WEAPON_1: { id: "weapon_1", name: "Weapon", position: "bottom-left" },
  WEAPON_2: { id: "weapon_2", name: "Weapon", position: "bottom-right" },
};

const TABS = {
  EQUIPMENT: "equipment",
  SKILLS: "skills",
  STATS: "stats",
  SKILLTREE: "skilltree",
};

export default function CharacterPanel() {
  const [activeTab, setActiveTab] = useState(TABS.EQUIPMENT);
  const currentCharacter = useCharacterStore((state) => state.currentCharacter);

  const getSlotPosition = (position) => {
    switch (position) {
      // Left column
      case "left-top":
        return "top-[1rem] left-[1rem]";
      case "left-middle":
        return "top-[5.5rem] left-[1rem]";
      case "left-center":
        return "top-[10rem] left-[1rem]";
      case "left-bottom":
        return "top-[14.5rem] left-[1rem]";
      case "left-footer":
        return "top-[19rem] left-[1rem]";
      case "left-footer-2":
        return "top-[23.5rem] left-[1rem]";
      // Right column
      case "right-top":
        return "top-[1rem] right-[1rem]";
      case "right-middle":
        return "top-[5.5rem] right-[1rem]";
      case "right-center":
        return "top-[10rem] right-[1rem]";
      case "right-bottom":
        return "top-[14.5rem] right-[1rem]";
      case "right-footer":
        return "top-[19rem] right-[1rem]";
      // Bottom row - using percentage-based positioning
      case "bottom-left":
        return "bottom-[1rem] left-[37.5%]";
      case "bottom-right":
        return "bottom-[1rem] right-[37.5%]";
      default:
        return "";
    }
  };

  const renderEquipmentSlot = (slot) => {
    let spritesheet = "/assets/Items/Weapons and Equipment/Raven.png";
    let row = 5;
    let col = 4;
    let isIcon = false;

    // Set specific sprites for equipment slots
    switch (slot.id) {
      case "weapon_1":
        spritesheet = "/assets/Items/Weapons and Equipment/Equipment_07.png";
        isIcon = true;
        break;
      case "weapon_2":
        spritesheet = "/assets/Items/Weapons and Equipment/Shield_01.png";
        isIcon = true;
        break;
      case "helmet":
        spritesheet = "/assets/Items/Weapons and Equipment/Equipment_1807.png";
        isIcon = true;
        break;
      case "armor":
        spritesheet = "/assets/Items/Weapons and Equipment/Equipment_1823.png";
        isIcon = true;
        break;
      case "boots":
        spritesheet = "/assets/Items/Weapons and Equipment/Equipment_1839.png";
        isIcon = true;
        break;
      case "bag_1":
      case "bag_2":
      case "bag_3":
        spritesheet = "/assets/Items/Accesories/Bag_01.png";
        isIcon = true;
        break;
      case "ring_1":
      case "ring_2":
        spritesheet = "/assets/Items/Accesories/Equipment_2218.png";
        isIcon = true;
        break;
      case "amulet":
        spritesheet = "/assets/Items/Accesories/Equipment_2222.png";
        isIcon = true;
        break;
      default:
        // Keep Raven spritesheet as default placeholder
        break;
    }

    return (
      <div
        key={slot.id}
        className={`absolute w-16 h-16 bg-[#2A160C]/10 rounded-lg border-2 border-[#2A160C]/20
          hover:bg-[#2A160C]/15 transition-all duration-200 cursor-pointer
          ${getSlotPosition(slot.position)}`}
      >
        <div className="w-full h-full opacity-40">
          <ItemSprite
            spritesheet={spritesheet}
            row={row}
            col={col}
            size="4rem"
            opacity={0.3}
            isIcon={isIcon}
          />
        </div>
      </div>
    );
  };

  const renderEquipmentTab = () => {
    if (!currentCharacter) {
      return (
        <div className="flex items-center justify-center h-full text-[#2A160C]/50 font-pixel">
          No character loaded
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Equipment Section - 58% height */}
        <div className="h-[60%] relative bg-[#D4C3AA] border-2 border-[#2A160C]/20 p-[1rem] overflow-hidden">
          {/* Character Sprite */}
          <div className="absolute left-[53%] top-[38%] -translate-x-1/2 -translate-y-1/2">
            <div className="scale-x-[-1] overflow-hidden">
              <CharacterSprite
                characterId={currentCharacter.id}
                action="idle"
                size="40rem"
                colorMap={currentCharacter.colorMap}
                shadow={1}
              />
            </div>
          </div>

          {/* Equipment Slots */}
          {Object.values(EQUIPMENT_SLOTS).map(renderEquipmentSlot)}
        </div>

        {/* Inventory Section - 42% height */}
        <div className="h-[40%] bg-[#D4C3AA] border-2 border-[#2A160C]/20 p-4 flex flex-col items-center">
          <h3 className="text-[#2A160C] font-bold mb-3 font-pixel text-sm w-full">
            Inventory
          </h3>
          <div className="inline-grid grid-cols-8 grid-rows-4 overflow-hidden border-4 border-[#2A160C]/20 rounded-lg">
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-[#E6D5BC] border border-[#2A160C]/20 
                         hover:bg-[#C4B39A] transition-all duration-200 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.EQUIPMENT:
        return renderEquipmentTab();
      // Add other tab contents as needed
      default:
        return <div className="p-4 text-[#2A160C]/50 font-pixel">Coming soon...</div>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b-2 border-[#2A160C]/20 p-2">
        <div className="flex gap-1">
          {Object.entries(TABS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(value)}
              className={`px-3 py-1.5 rounded text-xs font-pixel transition-all duration-200 ${
                activeTab === value
                  ? "bg-[#2A160C] text-[#E6D5BC]"
                  : "text-[#2A160C] hover:bg-[#2A160C]/10"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">{renderTabContent()}</div>
    </div>
  );
}
