import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterCreationPanel from "./character-creation/CharacterCreationPanel";
import StatsSelection from "./character-creation/StatsSelection";
import CharacterResume from "./character-creation/CharacterResume";
import ConfirmationModal from "./ConfirmationModal";
import { CHARACTER_CLASSES } from "../constants/characters";
import { CHARACTER_COLORS } from "../constants/characterColors";
import useGameStore from "../store/characterStore.js";
import useSaveStore from '../store/saveStore';
import { characterService } from '../services/characterService';

export default function CharacterCreator({ isOpen, onClose, onSelect }) {
  const [stage, setStage] = useState(1);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const characterData = useGameStore((state) => state.characterCreation);
  const [selectedClass, setSelectedClass] = useState(CHARACTER_CLASSES[0]);
  const [isInitialized, setIsInitialized] = useState(false);
  

  const [selectedColorScheme, setSelectedColorScheme] = useState(() => {
    
    if (characterData.colorSchemes && Object.keys(characterData.colorSchemes).length > 0) {
      return characterData.colorSchemes;
    }

    const schemes = {};
    if (CHARACTER_CLASSES[0]?.spritesheet?.baseColors) {
      Object.keys(CHARACTER_CLASSES[0].spritesheet.baseColors).forEach(part => {
        schemes[part] = "default";
      });
    }
    return schemes;
  });

  const [stats, setStats] = useState(() => {
    const selectedClass = CHARACTER_CLASSES.find(c => c.id === CHARACTER_CLASSES[0].id);
    const initialStats = {};
    Object.entries(selectedClass.baseStats).forEach(([stat, value]) => {
      initialStats[stat] = value;
    });
    return initialStats;
  });

  const [pointsRemaining, setPointsRemaining] = useState(8);

  const addSave = useSaveStore((state) => state.addSave);

  // Initialize only once when modal is first opened
  useEffect(() => {
    if (isOpen && !isInitialized) {
      const storedData = useGameStore.getState().characterCreation;
      
      // Set the initial class
      const initialClass = storedData.selectedClassId 
        ? CHARACTER_CLASSES.find(c => c.id === storedData.selectedClassId)
        : CHARACTER_CLASSES[0];
      setSelectedClass(initialClass);

      // Set color schemes from store or initialize defaults
      if (storedData.colorSchemes && Object.keys(storedData.colorSchemes).length > 0) {
        setSelectedColorScheme(storedData.colorSchemes);
      } else {
        const schemes = {};
        if (initialClass?.spritesheet?.baseColors) {
          Object.keys(initialClass.spritesheet.baseColors).forEach(part => {
            schemes[part] = "default";
          });
        }
        setSelectedColorScheme(schemes);
      }

      // Reset stats
      setStats(() => {
        const initialStats = {};
        Object.entries(initialClass.baseStats).forEach(([stat, value]) => {
          initialStats[stat] = value;
        });
        return initialStats;
      });
      setPointsRemaining(8);
      
      setIsInitialized(true);
    }
  }, [isOpen, isInitialized]);

  // Reset initialization when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatChange = (stat, change, newStats = null) => {
    // If newStats is provided, it's a reset
    if (newStats) {
      setStats(newStats);
      setPointsRemaining(8);
      return;
    }

    const newValue = stats[stat] + change;
    const baseValue = selectedClass.baseStats[stat];
    const minAllowed = Math.max(0, baseValue - 2);
    const maxAllowed = baseValue + 5;

    if (
      newValue >= minAllowed &&
      newValue <= maxAllowed &&
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
    if (stage > 1) {
      setStage(prev => prev - 1);
    }
  };

  const isCreateButtonDisabled = 
    (stage === 3 && (!characterData.characterName || characterData.characterName.length < 1)) ||
    (stage === 2 && pointsRemaining > 0);

  const handleConfirmCreate = async () => {
    try {
      setError("");
      // Prepare the character data in the required format
      const characterPayload = {
        name: characterData.characterName,
        class: selectedClass.id,
        stats: stats,
        customization: {
          colors: {}
        }
      };

      // Convert color schemes to the required format
      Object.entries(selectedClass.spritesheet.baseColors).forEach(([part, baseColors]) => {
        const selectedScheme = selectedColorScheme[part];
        characterPayload.customization.colors[part] = selectedScheme === "default" 
          ? baseColors 
          : CHARACTER_COLORS[part][selectedScheme];
      });

      // Send to server
      await characterService.createCharacter(characterPayload);

      // Create local save
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
    } catch (error) {
      setError(error.payload.message || 'Failed to create character');
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
    }
  };

  const handleClose = () => {
    // Reset store
    useGameStore.getState().setCharacterCreation({
      selectedClassId: null,
      colorSchemes: {},
      stats: null,
      canProceed: false,
      characterName: ''
    });
    
    // Reset local state
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
      Object.entries(CHARACTER_CLASSES[0].baseStats).forEach(([stat, value]) => {
        initialStats[stat] = value;
      });
      return initialStats;
    });
    setPointsRemaining(8);
    setIsInitialized(false);
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed top-32 left-0 right-0 mx-auto w-fit z-50 bg-red-900/80 text-red-100 px-6 py-3 rounded-lg text-sm font-medium border border-red-500/50 shadow-lg min-w-[320px] text-center pixel-font"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 px-2 lg:p-4 lg:px-4z-50"
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
                  onClick={handleClose}
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
                    setStats={setStats}
                    setPointsRemaining={setPointsRemaining}
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
                    onClick={handleBack}
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
        </>
      )}
    </AnimatePresence>
  );
}
