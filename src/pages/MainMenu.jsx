import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUserDataStore from "../store/userDataStore";
import { authService } from "../services/authService";
import PixelButton from "../components/buttons/PixelButton";
import PixelButton2 from "../components/buttons/PixelButton2";
import SaveSlotModal from "../components/SaveSlotModal";
import CharacterCreator from "../components/CharacterCreator";

export default function MainMenu() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const { setUserData, isAuthenticated, logout } = useUserDataStore();
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio] = useState(new Audio("/assets/music/menu.mp3"));
  const [isSaveSlotModalOpen, setIsSaveSlotModalOpen] = useState(false);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [selectedSaveSlot, setSelectedSaveSlot] = useState(null);

  useEffect(() => {
    audio.volume = 0.2; // Set volume to 20%
    if (isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMusicPlaying, audio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = isLoginMode
        ? await authService.login({
            username: formData.field_usrnm,
            password: formData.field_pswr,
            rememberMe,
          })
        : await authService.register({
            username: formData.field_usrnm,
            email: formData.email,
            password: formData.field_pswr,
          });

      if (response.ok) {
        if (!isLoginMode) {
          setSuccessMessage(response.payload.message);
        } else {
          setUserData(response.payload.user, response.payload.token, rememberMe);
          setShowMenu(true);
          setIsMusicPlaying(true);
        }
      } else {
        throw new Error(response.message || "An error occurred");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Connection error. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      window.addEventListener("keydown", handleKeyPress);
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
    };
  }, [showMenu]);

  useEffect(() => {
    let timeoutId;
    if (error) {
      timeoutId = setTimeout(() => {
        setError("");
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [error]);

  const handleSuccessMessageClick = () => {
    setIsLoginMode(true);
    setSuccessMessage("");
  };

  const handleStartGame = () => {
    setIsSaveSlotModalOpen(true);
  };

  const handleSaveSlotSelect = (slot) => {
    setSelectedSaveSlot(slot);
    setIsSaveSlotModalOpen(false);

    if (!slot.character) {
      setIsCharacterModalOpen(true);
    }
  };

  const handleCharacterSelect = (characterId) => {
    console.log(`Selected character ${characterId} for save slot ${selectedSaveSlot.id}`);
    setIsCharacterModalOpen(false);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // const toggleFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     document.documentElement.requestFullscreen();
  //   } else if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   }
  // };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User Authenticated");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key="menu-controls"
          className="absolute top-4 right-4 flex space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <img
              src={
                isMusicPlaying
                  ? "/assets/buttons/126_button UI.png"
                  : "/assets/buttons/127_button UI.png"
              }
              alt="Toggle Music"
              onClick={toggleMusic}
              className="w-8 h-8 lg:w-12 lg:h-12 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </motion.div>
          {/* <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <img
              src="/assets/buttons/125_button UI.png"
              alt="Toggle Fullscreen"
              onClick={toggleFullscreen}
              className="w-8 h-8 lg:w-12 lg:h-12 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </motion.div> */}
        </motion.div>

        <AnimatePresence mode="wait">
          {!showMenu ? (
            <motion.div
              key="press-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                times: [0, 0.5, 1],
              }}
              className="text-white pixel-font text-xl lg:text-4xl"
            >
              Press Any Key
            </motion.div>
          ) : isAuthenticated ? (
            <>
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
                <PixelButton onClick={logout} text="Logout" imageSrc="red" />
              </motion.div>
            </>
          ) : (
            <>
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-32 left-0 right-0 mx-auto w-fit z-50 bg-red-900/80 text-red-100 px-6 py-3 rounded-lg text-sm font-medium border border-red-500/50 shadow-lg min-w-[20rem] text-center pixel-font"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {successMessage ? (
                <div
                  onClick={handleSuccessMessageClick}
                  className=" bg-[#E6D5BC] py-4 px-0 lg:p-4 lg:px-2 rounded-xl border-2 border-[#2A160C] shadow-lg text-center cursor-pointer w-full max-w-[48rem]"
                >
                  <h2 className="text-sm lg:text-2xl text-[#2A160C] font-bold mb-4 pixel-font tracking-wide">
                    {successMessage}
                  </h2>
                  <p className="text-xs lg:text-base text-[#2A160C]/80">
                    Click here to go to the login page.
                  </p>
                </div>
              ) : (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <div
                    className={`w-[30rem] bg-[#E6D5BC] p-8 py-4 rounded-xl border-2 border-[#2A160C] shadow-[0_0_20px_rgba(230,213,188,0.15)] opacity-95 ${
                      isLoginMode ? "pt-0" : ""
                    }`}
                  >
                    <h2 className="text-2xl text-[#2A160C] font-bold mb-8 text-center pixel-font tracking-wide">
                      {isLoginMode ? "" : "Register"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm text-center text-[#8b4513] block font-medium tracking-wide">
                          Username
                        </label>
                        <input
                          type="text"
                          name="field_usrnm"
                          value={formData.field_usrnm}
                          autoComplete="off"
                          spellCheck="false"
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-[#f3eade] border-2 border-[#2A160C]/20 focus:border-[#2A160C]/40 focus:outline-none
                                    transition-all duration-200 text-[#2A160C] placeholder-[#bf9879] shadow-inner"
                        />
                      </div>
                      {!isLoginMode && (
                        <div className="space-y-2">
                          <label className="text-sm text-center text-[#8b4513] block font-medium tracking-wide">
                            Email Adress
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            autoComplete="off"
                            spellCheck="false"
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#f3eade] border-2 border-[#2A160C]/20 focus:border-[#2A160C]/40 focus:outline-none
                                      transition-all duration-200 text-[#2A160C] placeholder-[#bf9879] shadow-inner"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <input
                          type="password"
                          name="password"
                          readOnly
                          value={formData.password}
                          className="hidden"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-center text-[#8b4513] block font-medium tracking-wide">
                          Password
                        </label>
                        <input
                          type="password"
                          name="field_pswr"
                          value={formData.field_pswr}
                          autoComplete="new-password"
                          spellCheck="false"
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg bg-[#f3eade] order-[#2A160C]/20 focus:border-[#2A160C]/40 focus:outline-none
                                    transition-all duration-200 text-[#2A160C] placeholder-[#bf9879] shadow-inner"
                        />
                      </div>

                      {isLoginMode && (
                        <div className="flex items-center justify-between text-sm">
                          <label className="flex items-center space-x-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="w-4 h-4 rounded border-2 border-[#2A160C]/20 text-[#2A160C] focus:ring-[#2A160C]/40 cursor-pointer"
                            />
                            <span className="text-[#2A160C]/80 group-hover:text-[#2A160C] transition-colors duration-200 relative top-[0.06rem]">
                              Stay logged in
                            </span>
                          </label>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-[#2A160C] text-white py-4 rounded-lg hover:bg-[#2A160C]/90 transition-all duration-200 font-medium mt-8 border-2 border-[#2A160C] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                      >
                        {isLoginMode ? "Login" : "Register"}
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
              <motion.div
                className="flex flex-row lg:flex-col absolute bottom-4 lg:bottom-8 lg:left-8 lg:space-y-2 space-x-12 lg:space-x-0 mx-2 lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <button
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="min-h-[3.65rem] block w-full lg:w-48 bg-[#2A160C] text-[#E6D5BC] px-4 py-2
                            rounded text-sm hover:bg-[#2A160C]/90 transition-all duration-200 border border-[#E6D5BC]/20 hover:shadow-lg
                            hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                >
                  {isLoginMode ? "Create Account" : "Login"}
                </button>
                <button
                  onClick={() => {
                    /* Implement forgot password */
                  }}
                  className="min-h-[3.65rem] block h-full w-full lg:w-48 bg-[#2A160C] text-[#E6D5BC] px-4 py-2
                            rounded text-sm hover:bg-[#2A160C]/90 transition-all duration-200 border border-[#E6D5BC]/20 hover:shadow-lg
                            hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                >
                  Forgot Password
                </button>
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
      />
    </>
  );
}
