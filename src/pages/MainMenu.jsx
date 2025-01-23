import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PixelButton from "../components/buttons/PixelButton.jsx";
import PixelButton2 from "../components/buttons/PixelButton2.jsx";
import SaveSlotModal from "../components/SaveSlotModal";
import CharacterCreator from "../components/CharacterCreator.jsx";

export default function MainMenu() {
  const navigate = useNavigate();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [audio] = useState(new Audio("/assets/music/menu.mp3"));
  const [isSaveSlotModalOpen, setIsSaveSlotModalOpen] = useState(false);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [selectedSaveSlot, setSelectedSaveSlot] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    audio.volume = volume;
    if (isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMusicPlaying, volume]);

  const handleStartGame = () => {
    setIsSaveSlotModalOpen(true);
  };

  const handleOptions = () => {
    console.log("Options clicked");
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSaveSlotSelect = (slot) => {
    setSelectedSaveSlot(slot);
    setIsSaveSlotModalOpen(false);
    
    if (!slot.character) {
      setIsCharacterModalOpen(true);
    } else {
      navigate("/game");
    }
  };

  const handleCharacterSelect = (characterId) => {
    console.log(`Selected character ${characterId} for save slot ${selectedSaveSlot.id}`);
    setIsCharacterModalOpen(false);
    navigate("/game");
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleAnyInput = () => {
    if (!showMenu) {
      setShowMenu(true);
      setIsMusicPlaying(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = () => handleAnyInput();
    const handleClick = () => handleAnyInput();

    if (!showMenu) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
    };
  }, [showMenu]);

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!showMenu ? (
            <motion.div
              key="press-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                times: [0, 0.5, 1]
              }}
              className="text-white pixel-font text-xl lg:text-4xl"
            >
              Press Any Key
            </motion.div>
          ) : (
            <>
              <motion.div 
                key="menu-controls"
                className="absolute top-4 right-4 flex space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={isMusicPlaying ? "/assets/buttons/126_button UI.png" : "/assets/buttons/127_button UI.png"}
                    alt="Toggle Music"
                    onClick={toggleMusic}
                    className="w-8 h-8 lg:w-12 lg:h-12 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-200"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/assets/buttons/125_button UI.png"
                    alt="Toggle Fullscreen"
                    onClick={toggleFullscreen}
                    className="w-8 h-8 lg:w-12 lg:h-12 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-200"
                  />
                </motion.div>
              </motion.div>

              <motion.h1
                key="title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="pixel-font text-4xl lg:text-7xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-wide mb-12 lg:mb-16 mt-56"
              >
                Darkspire
              </motion.h1>  

              <motion.div
                key="menu-buttons"
                className="space-y-8 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <PixelButton2 onClick={handleStartGame} text="Start Game" imageSrc="red" />
                <PixelButton onClick={handleOptions} text="Options" imageSrc="red" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <SaveSlotModal
        isOpen={isSaveSlotModalOpen}
        onClose={() => setIsSaveSlotModalOpen(false)}
        onSelectSlot={handleSaveSlotSelect}
      />
      <CharacterCreator
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        onSelect={handleCharacterSelect}
        selectedCharacter={null}
      />
    </>
  );
}
