import { motion } from "framer-motion";
import CharacterSprite from "./CharacterSprite";
import useSaveStore from "../store/saveStore";
import { CHARACTER_CLASSES } from "../constants/characters";
import { CHARACTER_COLORS } from "../constants/characterColors";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function SaveSlotModal({ isOpen, onClose, onSelectSlot, mode = "load" }) {
  if (!isOpen) return null;

  const saves = useSaveStore((state) => state.saves);
  const deleteSave = useSaveStore((state) => state.deleteSave);
  const getSaves = useSaveStore((state) => state.getSaves);

  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, slot: null });

  useEffect(() => {
    const fetchSaves = async () => {
      await getSaves();
    };

    if (isOpen) {
      fetchSaves();
    }
  }, [isOpen, getSaves]);

  const getColorMap = (character) => {
    if (!character) return {};

    const selectedClass = CHARACTER_CLASSES.find((c) => c.id === character.id);
    if (!selectedClass?.spritesheet?.baseColors) return {};

    const colorMap = {};
    Object.entries(selectedClass.spritesheet.baseColors).forEach(([part, baseColors]) => {
      const selectedScheme = character.colorSchemes[part];

      const newColors =
        selectedScheme === "default" ? baseColors : CHARACTER_COLORS[part][selectedScheme];

      if (baseColors && newColors) {
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = selectedScheme === "default" ? baseColor : newColors[index];
        });
      }
    });

    return colorMap;
  };

  // Create empty slots with static names "1", "2", "3"
  const saveSlots = [...Array(3)].map((_, index) => {
    const existingSave = saves[index];
    return {
      id: index + 1, // Slot number for display
      saveId: existingSave?.id, // Actual save ID from database
      name: `SAVE FILE ${index + 1}`,
      playTime: existingSave ? existingSave.playTime : null,
      character: existingSave ? existingSave.character : null,
    };
  });

  const handleDelete = (e, slot) => {
    e.stopPropagation();
    setDeleteConfirmation({ isOpen: true, slot });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.slot?.saveId) {
      deleteSave(deleteConfirmation.slot.saveId);
    }
    setDeleteConfirmation({ isOpen: false, slot: null });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#F5E6D3] rounded-xl p-6 lg:p-8 lg:max-w-4xl w-full border-4 border-[#2A160C]/20"
        >
          <div className="flex justify-between items-center mb-6 lg:mb-8 border-b-2 border-[#2A160C]/20 pb-4">
            <h2 className="text-[0.8rem] lg:text-2xl font-bold text-[#2A160C]">
              {mode === "save" ? "Select Save Slot" : "Load Game"}
            </h2>
            <button
              onClick={onClose}
              className="text-[#2A160C] hover:text-red-600 text-[0.95rem] lg:text-[1.6rem] font-bold transition-colors duration-200"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {saveSlots.map((slot) => (
              <motion.button
                key={slot.id} 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelectSlot(slot)}
                className="relative w-full p-3 lg:p-6 bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 
                        hover:bg-[#D4C3AA] transition-all duration-200 group"
              >
                {slot.character && (
                  <button
                    onClick={(e) => handleDelete(e, slot)}
                    className="absolute top-2 right-2 w-6 h-6 lg:w-9 lg:h-9 rounded-full bg-red-500/10 
                             hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center text-center
                             transition-all duration-200 lg:opacity-0 lg:group-hover:opacity-100 p-2"
                  >
                    <div className="text-center relative left-[0.05rem] lg:top-[0.1rem] text-xs lg:text-xl">
                    ×
                    </div>
                  </button>
                )}

                <div className="flex items-center gap-3 lg:gap-6">
                  {/* Left side - Character sprite and basic info */}
                  <div className="flex-shrink-0 w-16 lg:w-32 text-center">
                    {slot.character ? (
                      <>
                        <div className="h-16 lg:h-32 flex items-center justify-center bg-[#2A160C]/5 rounded-lg overflow-hidden group-hover:bg-[#2A160C]/10 transition-colors duration-200">
                          <div className="scale-100 group-hover:scale-110 transition-transform duration-200">
                            <CharacterSprite
                              characterId={slot.character.id}
                              action="idle"
                              size="15rem"
                              colorMap={getColorMap(slot.character)}
                            />
                          </div>
                        </div>
                        <div className="mt-2 text-[#2A160C] font-medium text-[0.45rem] lg:text-[1.1rem]">
                          {slot.character.name}
                        </div>
                      </>
                    ) : (
                      <div className="h-16 lg:h-32 flex items-center justify-center bg-[#2A160C]/5 rounded-lg group-hover:bg-[#2A160C]/10 transition-colors duration-200">
                        <span className="text-[#8B4513]/50 text-2xl lg:text-5xl">?</span>
                      </div>
                    )}
                  </div>

                  {/* Right side - Save info and character details */}
                  <div className="flex-grow">
                    <div className="flex flex-col gap-2 lg:gap-3">
                      <span className="text-[#2A160C] font-bold text-[0.6rem] lg:text-[1.2rem]">
                        {slot.name}
                      </span>

                      {slot.character ? (
                        <>
                          {slot.playTime && (
                            <span className="text-[#8B4513] text-[0.4rem] lg:text-[0.9rem]">
                              Play Time:{" "}
                              <span className="text-[#2A160C] font-medium">{slot.playTime}</span>
                            </span>
                          )}
                          <div className="flex items-center justify-center gap-4 text-[0.4rem] lg:text-[0.9rem]">
                            <span className="text-[#8B4513]">
                              Level:{" "}
                              <span className="text-[#2A160C] font-medium">
                                {slot.character.level}
                              </span>
                            </span>
                            <span className="text-[#8B4513] font-medium">
                              {slot.character.class}
                            </span>
                          </div>
                          <span className="text-[#8B4513] text-[0.4rem] lg:text-[0.9rem]">
                            Location:{" "}
                            <span className="text-[#2A160C] font-medium">
                              {slot.character.location}
                            </span>
                          </span>
                        </>
                      ) : (
                        <span className="text-[#8B4513] text-[0.5rem] lg:text-[1rem] font-medium">
                          START A NEW GAME
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, slot: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Save"
        message="Are you sure you want to delete this save file? This action cannot be undone."
      />
    </>
  );
}
