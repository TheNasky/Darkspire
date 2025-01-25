import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CharacterCreationPanel from "./character-creation/CharacterCreationPanel";
import StatsSelection from "./character-creation/StatsSelection";
import CharacterResume from "./character-creation/CharacterResume";
import ConfirmationModal from "./ConfirmationModal";
import { CHARACTER_CLASSES } from "../constants/characters";
import { BASE_STATS } from "../constants/characterStats.js";
import useGameStore from "../store/gameStore";
import useSaveStore from '../store/saveStore';

export default function CharacterCreator({ isOpen, onClose, onSelect }) {
  const [stage, setStage] = useState(1);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const characterData = useGameStore((state) => state.characterCreation);
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

  const addSave = useSaveStore((state) => state.addSave);

  useEffect(() => {
    if (isOpen) {
      setStage(1);
      setSelectedClass(CHARACTER_CLASSES[0]);
      setSelectedColorScheme(() => {
        const schemes = {};
        if (CHARACTER_CLASSES[0]?.spritesheet?.baseColors) {
          Object.keys(CHARACTER_CLASSES[0].spritesheet.baseColors).forEach(part => {
            schemes[part] = "default";
          });
        }
        return schemes;
      });
      setStats(() => {
        const initialStats = {};
        Object.keys(BASE_STATS).forEach((stat) => {
          initialStats[stat] = BASE_STATS[stat].base;
        });
        return initialStats;
      });
      setPointsRemaining(10);
    }
  }, [isOpen]);

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
    if (stage < 3) {
      setStage((prev) => prev + 1);
    } else {
      setIsConfirmationOpen(true);
    }
  };

  const handleBack = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const isCreateButtonDisabled = stage === 3 && (!characterData.characterName || characterData.characterName.length < 1);

  const handleConfirmCreate = () => {
    const saveData = {
      id: selectedClass.id,
      name: characterData.characterName,
      level: 1,
      gold: 0,
      class: selectedClass.name,
      location: "Tutorial Area",
      stats: stats,
      colorSchemes: selectedColorScheme,
      createdAt: new Date().toISOString()
    };

    addSave(saveData);
    setIsConfirmationOpen(false);
    onSelect(selectedClass.id);
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

          {/* Stage Indicators */}
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
              onClick={handleNext}
              disabled={isCreateButtonDisabled}
              className={`px-3 lg:px-6 py-[0.45rem] lg:py-2.5 rounded-lg text-[0.55rem] lg:text-[1rem] font-medium transition-all duration-200
                ${isCreateButtonDisabled
                  ? 'bg-[#2A160C]/40 text-white/50 cursor-not-allowed' 
                  : 'bg-[#2A160C] text-white hover:bg-[#2A160C]/80 active:bg-[#2A160C]/90'
                }`}
            >
              {stage === 3 ? 'Create Character' : 'Next'}
            </button>
          </div>
        </div>
      </motion.div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmCreate}
        title="Create Character"
        message="Are you done customizing your character? This will create your character and begin your journey."
      />
    </motion.div>
  );
}
