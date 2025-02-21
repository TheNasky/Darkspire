import { useState } from "react";
import useCharacterStore from "../../store/characterStore";
import CharacterSprite from "../CharacterSprite";
import { motion } from "framer-motion";
import StatusBars from "./StatusBars";
import { CHARACTER_CLASSES } from "../../constants/characters.js";
import BagSection from "./BagSection";

const CONSUMABLE_SLOTS = 4;
const ABILITY_SLOTS = 16;

export default function PlayerHUD() {
  const [currentBag, setCurrentBag] = useState(1);
  const currentCharacter = useCharacterStore((state) => state.currentCharacter);

  const handleBagSwitch = () => {
    setCurrentBag((prev) => (prev % 3) + 1);
  };

  const getColorMap = () => {
    if (!currentCharacter?.customization?.colors) return {};

    const colorMap = {};
    Object.entries(currentCharacter.customization.colors).forEach(([part, colors]) => {
      if (colors && colors.length > 0) {
        const baseColors =
          CHARACTER_CLASSES.find((c) => c.id === currentCharacter.class)?.spritesheet
            ?.baseColors[part] || [];
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = colors[index] || baseColor;
        });
      }
    });
    return colorMap;
  };

  return (
    <div className="px-4 py-2 bg-black/70 border-t-2 border-[#32342f] bg-opacity-80 overflow-visible h-[10rem]">
      <div className="max-w-[90rem]  flex items-center gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-4 pr-[92.2rem] pb-[0.1rem]  rounded-lg absolute bottom-[0.7rem] bg-black/20">
          {/* Character Portrait */}
          <div className="w-[8.6rem] h-[8.6rem] bg-black/20 rounded-lg border-[0.2rem] border-[#32342f] overflow-hidden">
            <div className="relative bottom-[8.6rem] right-[8.8rem] p-2">
              <CharacterSprite
                characterId={currentCharacter?.class}
                action="idle"
                size="25rem"
                colorMap={getColorMap()}
                noOutline={true}
              />
            </div>
          </div>

          <StatusBars stats={currentCharacter?.stats} />
        </div>

        {/* Middle Section - Abilities */}
        <div className="flex flex-col absolute left-[32rem] bottom-2.5 gap-1 rounded-lg overflow-hidden p-1">
          {[0, 1].map((row) => (
            <div key={row} className="flex gap-0.5">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[4rem] h-[4rem] bg-[#1f1f20]/80 rounded-md border border-[#32342f]
                           hover:bg-[#252526]/80 transition-all duration-200 cursor-pointer
                           flex items-center justify-center focus:outline-none focus:outline-0"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 absolute left-[68rem] bottom-2.5">
        <BagSection currentBag={currentBag} onBagChange={setCurrentBag} />

          {/* Loot Section */}
          <div className="grid grid-cols-3 gap-1 p-2 bg-[#1f1f20]/60 rounded-lg border border-[#32342f]">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[3rem] h-[3rem] bg-[#252526]/80 rounded-md border border-[#32342f]
                         hover:bg-[#2a2a2b]/80 transition-all duration-200 cursor-pointer
                         flex items-center justify-center"
              >
                💎
              </motion.div>
            ))}
          </div>

          {/* Menu Buttons */}
          <div className="flex gap-1 p-2 bg-[#1f1f20]/60 rounded-lg border border-[#32342f]">
            {[
              { icon: "📦", label: "Inventory" },
              { icon: "⚔️", label: "Skills" },
              { icon: "📊", label: "Stats" },
              { icon: "🌳", label: "Skill Tree" },
            ].map((button) => (
              <motion.button
                key={button.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[3rem] h-[3rem] bg-[#252526]/80 rounded-md border border-[#32342f]
                         hover:bg-[#2a2a2b]/80 transition-all duration-200 flex items-center justify-center"
                title={button.label}
              >
                <span className="text-lg">{button.icon}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
