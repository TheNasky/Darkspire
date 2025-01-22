  import { motion } from "framer-motion";
  import CharacterSprite from "./CharacterSprite";
  export default function SaveSlotModal({ isOpen, onClose, onSelectSlot }) {
    if (!isOpen) return null;

    // Mock data - replace with actual save data
    const saveSlots = [
      {
        id: 1,
        name: "SAVE FILE 1",
        playTime: "10:25:56",
        character: {
          id: "knight",
          name: "Tharin",
          level: 12,
          gold: 1500,
          class: "Knight",
          location: "Forest of Myths",
          spriteInfo: {
            idle: {
              path: "/assets/characters/Knight/idle",
              frameCount: 4,
              scale: 1,
              frameRate: 4, // Slower animation
            },
          },
        },
      },
      { id: 2, name: "SAVE FILE 2", playTime: null, character: null },
      { id: 3, name: "SAVE FILE 3", playTime: null, character: null },
    ];

    return (
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
              Select Save File
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
                className="w-full p-3 lg:p-6 bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 
                        hover:bg-[#D4C3AA] transition-all duration-200 group"
              >
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
                              colorMap={{}}
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
                              Play Time: <span className="text-[#2A160C] font-medium">{slot.playTime}</span>
                            </span>
                          )}
                          <div className="flex items-center justify-center gap-4 text-[0.4rem] lg:text-[0.9rem]">
                            <span className="text-[#8B4513]">
                              Level: <span className="text-[#2A160C] font-medium">{slot.character.level}</span>
                            </span>
                            <span className="text-[#8B4513] font-medium">
                              {slot.character.class}
                            </span>
                          </div>
                          <span className="text-[#8B4513] text-[0.4rem] lg:text-[0.9rem]">
                            Location: <span className="text-[#2A160C] font-medium">{slot.character.location}</span>
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
    );
  }
  