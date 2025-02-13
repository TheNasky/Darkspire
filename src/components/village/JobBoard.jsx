import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTRACT_TYPES = {
  ALL: 'all',
  MAIN: 'main',
  EXPLORATION: 'exploration',
  RAID: 'raid'
};

const SAMPLE_CONTRACTS = [
  {
    id: 1,
    type: CONTRACT_TYPES.MAIN,
    title: "The Dark Forest Menace",
    description: "Clear the ancient forest of corrupted creatures threatening nearby villages.",
    reward: { 
      gold: 1000, 
      exp: 500, 
      items: ["Rare Potion", "Forest Medallion", "Ancient Scroll", "Magic Dust", "Dragon Scale"] 
    },
    level: 5,
    difficulty: "Medium",
    icon: "🌲"
  },
  {
    id: 2,
    type: CONTRACT_TYPES.EXPLORATION,
    title: "Lost Library of Arcane",
    description: "Explore the recently discovered ancient library and recover valuable tomes.",
    reward: { gold: 800, exp: 400, items: ["Mysterious Scroll"] },
    level: 3,
    difficulty: "Easy",
    expiresAt: Date.now() + 1000 * 60 * 60 * 48, // 48 hours from now
    icon: "📚"
  },
  {
    id: 3,
    type: CONTRACT_TYPES.RAID,
    title: "Dragon's Lair Assault",
    description: "Lead a group of adventurers to clear out a dragon's lair. Time-sensitive mission!",
    reward: { 
      gold: 2000, 
      exp: 1000, 
      items: ["Dragon Scale", "Ancient Relic", "Mystic Gem"] 
    },
    level: 10,
    difficulty: "Hard",
    expiresAt: Date.now() + 1000 * 60 * 60 * 2, // 2 hours from now
    icon: "🐉"
  },
  // Add more sample contracts...
];

function RewardsModal({ rewards, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#E6D5BC] rounded-lg w-[32rem] shadow-xl font-pixel"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-[#2A160C]/10">
          <h3 className="text-[#2A160C] text-[1.25rem]">Contract Rewards</h3>
          <button 
            onClick={onClose}
            className="w-[2rem] h-[2rem] flex items-center justify-center rounded-lg
                     text-[#2A160C]/60 hover:text-[#2A160C] hover:bg-[#2A160C]/10 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Main Rewards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#2A160C]/5 rounded-lg p-3 flex items-center gap-3">
              <span className="text-[1.5rem]">💰</span>
              <div>
                <div className="text-[#8B4513] text-[1.25rem]">{rewards.gold}</div>
                <div className="text-[#2A160C]/60 text-[0.875rem]">Gold</div>
              </div>
            </div>
            <div className="bg-[#2A160C]/5 rounded-lg p-3 flex items-center gap-3">
              <span className="text-[1.5rem]">✨</span>
              <div>
                <div className="text-[#8B4513] text-[1.25rem]">{rewards.exp}</div>
                <div className="text-[#2A160C]/60 text-[0.875rem]">Experience</div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h4 className="text-[#2A160C] mb-3 text-[1rem]">ITEMS ({rewards.items.length})</h4>
            <div className="space-y-2">
              {rewards.items.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-[#2A160C]/5 p-3 rounded-lg flex items-center gap-3"
                >
                  <span className="text-[1.25rem]">🎁</span>
                  <span className="text-[#8B4513] text-[1rem]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function JobBoard() {
  const [selectedType, setSelectedType] = useState(CONTRACT_TYPES.ALL);
  const [showRewardsFor, setShowRewardsFor] = useState(null);
  const [timers, setTimers] = useState({});

  // Timer display component to prevent card reanimation
  const Timer = ({ contractId, expiresAt }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const updateTimer = () => {
        const remaining = Math.max(0, expiresAt - Date.now());
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }, [expiresAt]);

    return (
      <div className="text-[#8B0000] text-[0.875rem] font-medium">
        Expires in: {timeLeft}
      </div>
    );
  };

  const QuestCard = ({ contract }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }}
      className="group"
    >
      <div className="bg-[#E6D5BC] rounded-lg border-2 border-[#2A160C]/20 p-[1.5rem]
                   group-hover:bg-[#D4C3AA] group-hover:scale-[102%] transition-all duration-200 transform-gpu ">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[2.5rem]">{contract.icon}</span>
              <div>
                <h3 className="text-[#2A160C] font-bold text-[1.25rem]">{contract.title}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-1 rounded bg-[#2A160C]/10 text-[#8B4513] text-[0.75rem]">
                    Lvl {contract.level}
                  </span>
                  <span className={`px-2 py-1 rounded text-[0.75rem] ${
                    contract.type === CONTRACT_TYPES.MAIN 
                      ? 'bg-[#FFD700]/20 text-[#B8860B]'
                      : contract.type === CONTRACT_TYPES.EXPLORATION
                        ? 'bg-[#98FB98]/20 text-[#228B22]'
                        : 'bg-[#FF4500]/20 text-[#8B0000]'
                  }`}>
                    {contract.type.charAt(0).toUpperCase() + contract.type.slice(1)}
                  </span>
                  <span className="px-2 py-1 rounded bg-[#2A160C]/10 text-[#8B4513] text-[0.75rem]">
                    ⚔️ {contract.difficulty}
                  </span>
                </div>
              </div>
            </div>
            {contract.type === CONTRACT_TYPES.RAID && (
              <Timer contractId={contract.id} expiresAt={contract.expiresAt} />
            )}
          </div>

          {/* Description */}
          <p className="text-[#8B4513] text-[0.875rem]">{contract.description}</p>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-[#2A160C]/10">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowRewardsFor(contract);
              }}
              className="px-4 py-2 bg-[#2A160C]/10 hover:bg-[#2A160C]/20 text-[#2A160C] 
                       rounded-lg transition-colors duration-200 text-[0.875rem] font-medium"
            >
              View Rewards
            </button>
            <button 
              className="px-4 py-2 bg-[#2A160C] hover:bg-[#2A160C]/80 text-[#E6D5BC] 
                       rounded-lg transition-colors duration-200 text-[0.875rem] font-medium"
            >
              Accept Contract
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full flex flex-col p-6 pr-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#2A160C]">Available Contracts</h2>
        <div className="flex gap-2">
          {Object.values(CONTRACT_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedType === type
                  ? 'bg-[#2A160C] text-[#E6D5BC]'
                  : 'bg-[#2A160C]/10 text-[#2A160C] hover:bg-[#2A160C]/20'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts List */}
      <div className="space-y-4  flex-1 pr-2">
        <AnimatePresence mode="popLayout" presenceAffectsLayout={false}>
          {SAMPLE_CONTRACTS
            .filter(contract => selectedType === CONTRACT_TYPES.ALL || selectedType === contract.type)
            .map((contract) => (
              <QuestCard key={contract.id} contract={contract} />
            ))}
        </AnimatePresence>
      </div>

      {/* Rewards Modal */}
      <AnimatePresence>
        {showRewardsFor && (
          <RewardsModal 
            rewards={showRewardsFor.reward} 
            onClose={() => setShowRewardsFor(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 