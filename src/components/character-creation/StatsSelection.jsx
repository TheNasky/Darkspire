import { motion } from "framer-motion";
import { getDisplayStats } from "../../constants/characterStats";
import { useEffect } from "react";
import useGameStore from "../../store/characterStore";
import { CHARACTER_CLASSES } from "../../constants/characters";

export default function StatsSelection({ stats, pointsRemaining, handleStatChange }) {
  const characterData = useGameStore((state) => state.characterCreation);
  const selectedClass = CHARACTER_CLASSES.find((c) => c.id === characterData.selectedClassId);

  const handleReset = () => {
    const initialStats = { ...selectedClass.baseStats };
    handleStatChange(null, null, initialStats);
  };

  useEffect(() => {
    useGameStore.getState().setCharacterCreation({
      ...characterData,
      stats: stats,
      canProceed: pointsRemaining === 0,
    });
  }, [stats, pointsRemaining]);

  const getStatColor = (stat) => {
    if (stats[stat] > selectedClass.baseStats[stat]) return "text-emerald-600 font-bold";
    if (stats[stat] < selectedClass.baseStats[stat]) return "text-red-600 font-bold";
    return "text-[#2A160C]";
  };

  const displayStats = getDisplayStats(stats);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Base Stats Column */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 lg:mb-6 relative top-1">
          <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] w-[40%] lg:w-[50%]">
            Ability Scores
          </h3>
          <div className="flex items-center gap-2">
          <div className="relative">
              <span className="text-[0.7rem] lg:text-[1rem] text-[#8B4513] bg-[#2A160C]/5 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#2A160C]/10">
                Points: <span className="font-bold text-[#2A160C]">{pointsRemaining}</span>
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-2 lg:px-3 py-0.5 lg:py-1 text-sm font-semibold text-[#2A160C] bg-[#ebdbc9] rounded-full
                       hover:bg-[#cbbdad] transition-colors duration-200 border border-[#2A160C]/10 relative -bottom-0.5 lg:bottom-[0.05rem]"
              title="Reset stats"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-[1rem] h-[1rem] lg:w-[1.28rem] lg:h-[1.28rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.3}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

          </div>
        </div>

        <div className="space-y-2 lg:space-y-2.5">
          {Object.entries(selectedClass.baseStats).map(([stat, baseValue]) => (
            <div
              key={stat}
              className="flex items-center justify-between bg-[#E6D5BC] rounded-lg lg:rounded-xl p-2 lg:p-2.5 border-2 border-[#2A160C]/20 hover:bg-[#D4C3AA] transition-all duration-200"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-[#2A160C]/5 flex items-center justify-center">
                  <span className="text-[0.7rem] lg:text-[0.9rem] font-bold text-[#2A160C]">
                    {stat.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-[0.7rem] lg:text-[0.9rem] font-medium text-[#2A160C]">
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-2 bg-[#2A160C]/5 rounded-lg p-1">
                <button
                  onClick={() => handleStatChange(stat, -1)}
                  className={`w-5 h-5 lg:w-6 lg:h-6 rounded-md flex items-center justify-center transition-all duration-200
                    ${
                      stats[stat] > baseValue - 2
                        ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  disabled={stats[stat] <= baseValue - 2}
                >
                  <span className="text-xs lg:text-sm">-</span>
                </button>

                <span
                  className={`w-8 lg:w-10 text-center text-[0.7rem] lg:text-[0.9rem] ${getStatColor(
                    stat
                  )}`}
                >
                  {stats[stat]}
                </span>

                <button
                  onClick={() => handleStatChange(stat, 1)}
                  className={`w-5 h-5 lg:w-6 lg:h-6 rounded-md flex items-center justify-center transition-all duration-200
                    ${
                      pointsRemaining > 0 && stats[stat] < baseValue + 5
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  disabled={pointsRemaining <= 0 || stats[stat] >= baseValue + 5}
                >
                  <span className="text-xs lg:text-sm">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Derived Stats Column */}
      <div className="flex-1">
        <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] mb-4 lg:mb-6">
          Resulting Stats
        </h3>
        <div className="grid grid-cols-2 gap-2 lg:gap-3">
          {Object.entries(displayStats).map(([stat, value]) => (
            <div
              key={stat}
              className="bg-[#E6D5BC] rounded-lg lg:rounded-xl p-2 lg:p-3 border-2 border-[#2A160C]/20 hover:bg-[#D4C3AA] transition-all duration-200"
            >
              <div className="text-[0.6rem] lg:text-[0.8rem] text-[#8B4513] mb-0.5 lg:mb-1">
                {stat}
              </div>
              <div className="text-[0.8rem] lg:text-[1.1rem] font-bold text-[#2A160C]">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
