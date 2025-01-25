import { useState } from "react";
import { motion } from "framer-motion";
import CharacterCreationPanel from "./character-creation/CharacterCreationPanel";
import StatsSelection from "./character-creation/StatsSelection";
import CharacterResume from "./character-creation/CharacterResume";
import { CHARACTER_CLASSES } from "../constants/characters";
import { BASE_STATS } from "../constants/characterStats.js";
import useGameStore from "../store/gameStore";

export default function CharacterCreator({ isOpen, onClose, onSelect }) {
  const [stage, setStage] = useState(1);
  const [selectedClass, setSelectedClass] = useState(CHARACTER_CLASSES[0]);
  const [selectedColorScheme, setSelectedColorScheme] = useState(() => {
    const schemes = {};
    if (CHARACTER_CLASSES[0]?.spritesheet?.baseColors) {
      Object.keys(CHARACTER_CLASSES[0].spritesheet.baseColors).forEach(part => {
        schemes[part] = "default";
      });
    }
    return schemes;
  });

  const [stats, setStats] = useState(() => {
    const initialStats = {};
    Object.keys(BASE_STATS).forEach((stat) => {
      initialStats[stat] = BASE_STATS[stat].base;
    });
    return initialStats;
  });

  const [pointsRemaining, setPointsRemaining] = useState(10);

  if (!isOpen) return null;

  const handleStatChange = (stat, change) => {
    const newValue = stats[stat] + change;
    if (
      newValue >= BASE_STATS[stat].min &&
      newValue <= BASE_STATS[stat].max &&
      (change < 0 || pointsRemaining > 0)
    ) {
      setStats((prev) => ({ ...prev, [stat]: newValue }));
      setPointsRemaining((prev) => prev - change);
    }
  };

  const derivedStats = {
    MaxHP: stats.CON * 5,
    MaxMP: stats.INT * 3,
    PhysicalDamage: Math.floor(stats.STR * 1.5),
    MagicalDamage: Math.floor(stats.INT * 1.5),
    Defense: Math.floor(stats.CON * 0.8),
    Speed: Math.floor(stats.DEX * 1.2),
  };

  const handleNext = () => {
    if (stage === 1) {
      useGameStore.getState().setCharacterCreation({
        selectedClass: selectedClass,
        colorSchemes: selectedColorScheme
      });
    }
    if (stage < 2) setStage((prev) => prev + 1);
    else onSelect(selectedClass.id);
  };

  const handleBack = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 px-2 lg:p-4 lg:px-4z-50 "
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#F5E6D3] rounded-lg p-4 lg:p-8 border-4 border-[#2A160C] w-full lg:w-[75rem] h-[95vh] lg:h-[54rem] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <div>
            <h2 className="text-[1.2rem] lg:text-[2rem] font-bold text-[#2A160C]">
              {stage === 1 ? 'Create Character' : stage === 2 ? 'Choose Stats' : 'Character Resume'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#2A160C] hover:text-red-600 text-[1.2rem] lg:text-[2rem] font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto">
          {stage === 1 ? (
            <CharacterCreationPanel
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedColorScheme={selectedColorScheme}
              setSelectedColorScheme={setSelectedColorScheme}
            />
          ) : stage === 2 ? (
            <StatsSelection
              stats={stats}
              derivedStats={derivedStats}
              pointsRemaining={pointsRemaining}
              handleStatChange={handleStatChange}
            />
          ) : (
            <CharacterResume />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center pt-2 lg:pt-4 border-t border-[#2A160C]/20 mt-2 lg:mt-4">
          {/* Left button in its own container */}
          <div className="w-[7rem] lg:w-[12rem]">
            <button
              onClick={() => setStage((prev) => Math.max(1, prev - 1))}
              className={`px-1 lg:px-3 py-1.5 lg:py-2.5 rounded-lg text-[0.55rem] lg:text-[1rem] font-medium transition-all duration-200
                ${stage === 1 
                  ? 'text-[#2A160C]/40 cursor-not-allowed' 
                  : 'text-[#2A160C] hover:bg-[#2A160C]/10 active:bg-[#2A160C]/20'
                }`}
              disabled={stage === 1}
            >
              Previous
            </button>
          </div>

          {/* Stage Indicators in centered container */}
          <div className="flex-1 flex justify-center">
            <div className="flex gap-2 lg:gap-3">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-[0.25rem] lg:h-[0.4rem] w-[1.5rem] lg:w-[3rem] rounded-full transition-all duration-200 ${
                    s === stage 
                      ? "bg-[#2A160C] scale-110" 
                      : s < stage 
                        ? "bg-[#2A160C]/40" 
                        : "bg-[#2A160C]/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right button in its own container */}
          <div className="w-[7rem] lg:w-[12rem] flex justify-end">
            <button
              onClick={() => setStage((prev) => Math.min(3, prev + 1))}
              className={`px-3 lg:px-6 py-[0.45rem] lg:py-2.5 rounded-lg text-[0.55rem] lg:text-[1rem] font-medium transition-all duration-200
                ${stage === 3 
                  ? 'bg-[#2A160C]/40 text-white/50 cursor-not-allowed' 
                  : 'bg-[#2A160C] text-white hover:bg-[#2A160C]/80 active:bg-[#2A160C]/90'
                }`}
              disabled={stage === 3}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
