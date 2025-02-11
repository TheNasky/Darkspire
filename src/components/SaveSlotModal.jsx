import { motion } from "framer-motion";
import CharacterSprite from "./CharacterSprite";
import useSaveStore from "../store/saveStore";
import { CHARACTER_CLASSES } from "../constants/characters";
import { CHARACTER_COLORS } from "../constants/characterColors";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import useGameStore from "../store/gameStore";
import { characterService } from '../services/characterService';

export default function SaveSlotModal({ isOpen, onClose, onSelectSlot, mode = "load" }) {
  if (!isOpen) return null;

  const saves = useSaveStore((state) => state.saves);
  const deleteSave = useSaveStore((state) => state.deleteSave);
  const getSaves = useSaveStore((state) => state.getSaves);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, slot: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await characterService.getCharacters();
        setCharacters(response.payload || []);
      } catch (error) {
        setError(error.message || "Failed to fetch characters");
        console.error("Error fetching characters:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const getColorMap = (character) => {
    if (!character) return {};

    const selectedClass = CHARACTER_CLASSES.find((c) => c.id === character.id);
    if (!selectedClass?.spritesheet?.baseColors) return {};

    const colorMap = {};
    Object.entries(character.colorSchemes).forEach(([part, colors]) => {
      if (colors && colors.length > 0) {
        const baseColors = selectedClass.spritesheet.baseColors[part] || [];
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = colors[index] || baseColor;
        });
      }
    });

    return colorMap;
  };

  // Create slots using characters data instead of saves
  const saveSlots = [...Array(3)].map((_, index) => {
    const character = characters[index];
    return {
      id: index + 1,
      saveId: character?._id,
      name: `SAVE FILE ${index + 1}`,
      playTime: null, // You might want to add this to your character data later
      character: character ? {
        id: character.class, // This maps to the character class id for sprites
        name: character.name,
        level: character.level,
        class: CHARACTER_CLASSES.find(c => c.id === character.class)?.name || character.class,
        location: "Tutorial Area",
        colorSchemes: Object.fromEntries(
          Object.entries(character.customization.colors).map(([part, colors]) => [part, colors])
        )
      } : null
    };
  });

  const handleDelete = (e, slot) => {
    e.stopPropagation();
    setDeleteConfirmation({ isOpen: true, slot });
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmation.slot?.saveId) {
      try {
        await characterService.deleteCharacter(deleteConfirmation.slot.saveId);
        const response = await characterService.getCharacters();
        setCharacters(response.payload || []);
      } catch (error) {
        console.error("Error deleting character:", error);
      }
    }
    setDeleteConfirmation({ isOpen: false, slot: null });
  };

  const handleSlotSelect = (slot) => {
    onClose();
    
    const game = useGameStore.getState().game;
    
    if (slot.character && game) {
      game.events.emit('changeScene', 'StageBackground', { 
        biome: 'FOREST',
        stage: {
          name: 'Tutorial',
          gridSize: { rows: 5, cols: 5 },
          character: slot.character,
          enemies: [],
          hazards: []
        }
      });
    } else {
      onSelectSlot(slot);
    }
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
              <motion.div
                key={slot.id} 
                onClick={(e) => handleSlotSelect(slot)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="h-[7.5rem] lg:h-[12.5rem] relative w-full p-3 lg:p-6 bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 
                        hover:bg-[#D4C3AA] transition-all duration-200 group cursor-pointer justify-center"
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

                <div className="flex items-center gap-3 lg:gap-6 py-2">
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
                    <div className="flex flex-col gap-2 lg:gap-3 text-center">
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, slot: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Character"
        message="This action cannot be undone. Please type the character's name to confirm deletion."
        confirmationName={deleteConfirmation.slot?.character?.name}
      />
    </>
  );
}
