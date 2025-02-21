import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCharacterStore from "../../store/characterStore";
import { contractService } from "../../services/contractService";
import useGameStore from "../../store/gameStore.js"
import { matchService } from "../../services/matchService";

const BIOMES = {
  FOREST: {
    id: "forest",
    name: "Forest",
    icon: "🌲",
    description: "A dense woodland teeming with wildlife and ancient mysteries.",
  },
  DESERT: {
    id: "desert",
    name: "Desert",
    icon: "🏜️",
    description: "Vast sandy expanses hiding ancient ruins and dangerous creatures.",
  },
  CAVE: {
    id: "cave",
    name: "Cave",
    icon: "⛰️",
    description:
      "Dark underground networks filled with valuable minerals and lurking dangers.",
  },
};

const DIFFICULTY_COLORS = {
  easy: "bg-emerald-500/20 text-emerald-700",
  normal: "bg-blue-500/20 text-blue-700",
  hard: "bg-amber-500/20 text-amber-700",
  extreme: "bg-red-500/20 text-red-700",
};

const CONTRACT_TYPE_COLORS = {
  main: "bg-purple-500/20 text-purple-700",
  adventure: "bg-blue-500/20 text-blue-700",
  incursion: "bg-red-500/20 text-red-700",
};

const CONTRACT_FILTERS = {
  ALL: "all",
  MAIN: "main",
  ADVENTURE: "adventure",
  INCURSION: "incursion",
};

const CONTRACT_TYPES = {
  main: { name: "Main Quest", color: "purple" },
  adventure: { name: "Adventure", color: "blue" },
  incursion: { name: "Incursion", color: "red" },
};

const OBJECTIVES = {
  exploration: { name: "Exploration", icon: "🔍" },
  hunt: { name: "Hunt", icon: "🏹" },
  breach: { name: "Breach", icon: "🏴‍☠️" },
  survival: { name: "Survival", icon: "⚔️" },
};

const LENGTHS = {
  tiny: { name: "Tiny", duration: "5-10min" },
  short: { name: "Short", duration: "10-20min" },
  medium: { name: "Medium", duration: "20-30min" },
  long: { name: "Long", duration: "30-45min" },
  epic: { name: "Epic", duration: "45min+" },
  one_shot: { name: "One Shot", duration: "15-20min" },
};

const CONTRACT_COLORS = {
  main_quest: "text-amber-500 border-amber-500/50",
  incursion: "text-red-500 border-red-500/50",
  adventure: "text-emerald-500 border-emerald-500/50",
};

function BiomeSelector({ biomes, selectedBiome, onSelect, contracts }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {Object.values(biomes).map((biome) => {
        const biomeContracts = contracts.filter(
          (c) => c.biome?.toLowerCase() === biome.id.toLowerCase()
        );
        const hasMainQuest = biomeContracts.some(
          (c) => c.type?.toLowerCase() === "main_quest"
        );
        const hasIncursion = biomeContracts.some((c) => c.type?.toLowerCase() === "incursion");

        return (
          <button
            key={biome.id}
            onClick={() => onSelect(biome)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 ${
              selectedBiome?.id === biome.id
                ? "bg-[#2A160C] text-[#E6D5BC]"
                : "bg-[#E6D5BC] text-[#2A160C] hover:bg-[#D4C3AA]"
            }`}
          >
            <span className="text-[1.5rem] relative bottom-[0.3rem]">{biome.icon}</span>
            <span className="font-medium">{biome.name}</span>
            <div className="flex gap-1 font-bold">
              {hasMainQuest && (
                <span className="text-amber-500" title="Main Quest Available">
                  !
                </span>
              )}
              {hasIncursion && (
                <span className="text-red-500" title="Incursion Available">
                  !
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ContractCard({ contract, isExpanded, onToggle, onAccept }) {
  const contractRef = useRef(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const contractType = contract.type?.toLowerCase();
  const difficulties = contract.difficulties;

  // When expanded, wait 300ms before scrolling into view
  useEffect(() => {
    if (isExpanded && contractRef.current) {
      setTimeout(() => {
        contractRef.current.scrollIntoView();
      }, 75);
    }
  }, [isExpanded]);

  return (
    <div
      ref={contractRef}
      className="bg-[#E6D5BC] rounded-lg border-2 border-[#2A160C]/20 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-[#D4C3AA] transition-all duration-200"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">
            {OBJECTIVES[contract.objective?.toLowerCase()]?.icon || "📜"}
          </span>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[#2A160C]">{contract.name}</h3>
                <div className="flex items-center gap-2 text-xs text-[#8B4513] mt-1">
                  <span className={CONTRACT_COLORS[contractType]?.split(" ")[0]}>
                    {contractType === "main_quest"
                      ? "Main Quest"
                      : contractType === "incursion"
                      ? "Incursion"
                      : "Adventure"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {OBJECTIVES[contract.objective?.toLowerCase()]?.name || contract.objective}
                  </span>
                  <span>•</span>
                  <span>
                    {LENGTHS[contract.length?.toLowerCase()]?.name || 
                     (contract.length?.charAt(0) + contract.length?.slice(1).toLowerCase())}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-[#8B4513]">
                    Level{" "}
                    <span className="font-medium text-[#2A160C]">{contract.level || 1}</span>
                  </div>
                </div>
                <motion.span
                  className="text-[#2A160C] text-sm"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.002, ease: "easeInOut" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-[1rem] h-[1rem]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.05, ease: "easeInOut" }}
          className="px-4 pb-4 border-t border-[#2A160C]/10"
        >
          {/* Contract Details Section */}
          <p className="text-[#8B4513] text-sm mt-4 mb-6">{contract.description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-[#2A160C] mb-2">Rewards</h4>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500">🪙</span>
                  <span className="text-[#2A160C]">{contract.rewards?.gold || 0} Gold</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-500">✨</span>
                  <span className="text-[#2A160C]">
                    {contract.rewards?.experience || 0} XP
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-[#2A160C] mb-2">Select Difficulty</h4>
              <div className="grid grid-cols-2 gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedDifficulty === difficulty
                        ? "bg-[#2A160C] text-[#E6D5BC]"
                        : "bg-[#2A160C]/10 text-[#2A160C] hover:bg-[#2A160C]/20"
                    }`}
                  >
                    {difficulty.replace('_', ' ').charAt(0) + 
                     difficulty.replace('_', ' ').slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => selectedDifficulty && onAccept(selectedDifficulty)}
              disabled={!selectedDifficulty}
              className={`w-full p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedDifficulty
                  ? "bg-[#2A160C] text-[#E6D5BC] hover:bg-[#2A160C]/80"
                  : "bg-[#2A160C]/20 text-[#2A160C]/40 cursor-not-allowed"
              }`}
            >
              Accept Contract
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ContractResetTimer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(nextHour.getHours() + 1);
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);

      const diff = nextHour - now;
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg w-fit">
      <span className="pixel-font text-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-[1rem] h-[1rem] lg:w-[1.3rem] lg:h-[1.3rem] relative bottom-[0.05rem]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.3}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </span>
      <span className="font-medium text-center text-md">{timeLeft}</span>
    </div>
  );
}

export default function JobBoard() {
  const [selectedBiome, setSelectedBiome] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentCharacter = useCharacterStore((state) => state.currentCharacter);

  // Add these new state variables and functions
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const contractsRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - contractsRef.current.offsetTop);
    setScrollTop(contractsRef.current.scrollTop);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const y = e.pageY - contractsRef.current.offsetTop;
    const walk = (y - startY) * 1.5;
    contractsRef.current.scrollTop = scrollTop - walk;
  };

  useEffect(() => {
    const fetchContracts = async () => {
      if (!currentCharacter?.id) {
        console.log("No character ID found!");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await contractService.getContracts(currentCharacter.id);

        console.log("Contract response:", response);

        if (response.success) {
          if (!response.payload) {
            console.error("No payload in response");
            setError("Invalid response format");
            return;
          }

          // Flatten the nested contract structure
          const flattenedContracts = [];
          Object.values(response.payload).forEach((biomeContracts) => {
            // If the biomeContracts is an object with numeric keys, extract those contracts
            Object.entries(biomeContracts).forEach(([key, contract]) => {
              if (!isNaN(key) && typeof contract === "object") {
                flattenedContracts.push({
                  ...contract,
                  biome: contract.biome || "forest",
                });
              }
            });
          });

          console.log("Processed contracts:", flattenedContracts);
          setContracts(flattenedContracts);

          // Set initial biome if we have contracts
          if (flattenedContracts.length > 0) {
            setSelectedBiome(BIOMES.FOREST);
          }
        } else {
          setError(response.message || "Failed to fetch contracts");
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError("An error occurred while fetching contracts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [currentCharacter?.id]);

  const handleAcceptContract = async (difficulty) => {
    try {
      const response = await matchService.acceptContract(
        currentCharacter.id,
        selectedContract._id,
        difficulty.toUpperCase()
      );

      if (response.success) {
        const game = useGameStore.getState().game;
        if (game) {
          // Create the stage data with the complete match object
          const stageData = {
            contract: selectedContract,
            difficulty,
            mapData: {
              grid: response.payload.match.grid,
              match: response.payload.match
            }
          };

          useGameStore.getState().setCurrentStage(stageData);
          
          game.events.emit('changeScene', 'StageBackground', { 
            biome: selectedContract.biome?.toUpperCase() || 'FOREST',
            stage: stageData
          });
        }
        setSelectedContract(null);
      }
    } catch (error) {
      console.error("Error accepting contract:", error);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 bg-[#2A160C]/5">
      <div className="flex gap-6 mb-6">
        {/* Job Board Header Section */}
        <div className="w-64 h-64 bg-[#E6D5BC] rounded-lg border-2 border-[#2A160C]/20 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[12rem] relative bottom-8">📜</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#2A160C] ">Job Board</h2>
            <ContractResetTimer />
          </div>

          <p className="text-[#8B4513] mb-6">
            Take on contracts to earn rewards and build your reputation. Choose wisely,
            adventurer!
          </p>

          <BiomeSelector
            biomes={BIOMES}
            selectedBiome={selectedBiome}
            onSelect={setSelectedBiome}
            contracts={contracts}
          />
        </div>
      </div>

      {/* Contracts Section */}
      <div className="flex-1 bg-[#D4C3AA] border-2 border-[#2A160C]/20 p-4 rounded-lg overflow-hidden">
        {!loading && !error}
        {loading ? (
          <div className="flex items-center justify-center h-full text-[#8B4513]">
            Loading contracts...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">{error}</div>
        ) : (
          <div 
            ref={contractsRef}
            className="space-y-2 h-full overflow-y-auto noscroll cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {selectedBiome &&
              Array.isArray(contracts) &&
              contracts
                .filter(
                  (contract) =>
                    contract.biome?.toUpperCase() === selectedBiome.id.toUpperCase()
                )
                .map((contract) => (
                  <ContractCard
                    key={contract._id}
                    contract={contract}
                    isExpanded={selectedContract?._id === contract._id}
                    onToggle={() =>
                      setSelectedContract(
                        selectedContract?._id === contract._id ? null : contract
                      )
                    }
                    onAccept={(difficulty) => {
                      handleAcceptContract(difficulty);
                    }}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
