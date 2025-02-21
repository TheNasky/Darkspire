import { motion } from "framer-motion";

export default function BagSection({ currentBag, onBagChange }) {
  // Placeholder data for demonstration
  const bagContents = {
    1: ["🗡️", "🛡️", "🧪", "💊"],
    2: ["📜", "💎", "🔮", "⚔️"],
    3: ["🏹", "🪄", "🧬", "🎭"]
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Current Bag Slots */}
      <div className="grid grid-cols-4 gap-1">
        {bagContents[currentBag].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[3rem] h-[3rem] bg-[#1f1f20]/80 rounded-md border border-[#32342f]
                     hover:bg-[#252526]/80 transition-all duration-200 cursor-pointer
                     flex items-center justify-center text-xl"
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* Bag Selection */}
      <div className="flex gap-1 justify-center">
        {[1, 2, 3].map((bagNum) => (
          <motion.button
            key={bagNum}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBagChange(bagNum)}
            className={`w-[3rem] h-[3rem] rounded-md border border-[#32342f]
                     transition-all duration-200 cursor-pointer flex items-center justify-center text-xl
                     ${currentBag === bagNum ? 'bg-[#252526]/80 border-[#4a4c46]' : 'bg-[#1f1f20]/80'}`}
          >
            👜
          </motion.button>
        ))}
      </div>
    </div>
  );
} 