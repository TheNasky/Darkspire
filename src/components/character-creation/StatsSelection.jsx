import { motion } from "framer-motion";
import { BASE_STATS } from "../../constants/characterStats";
import { useEffect } from 'react';
import useGameStore from '../../store/gameStore';

export default function StatsSelection({ stats, derivedStats, pointsRemaining, handleStatChange }) {
  useEffect(() => {
    useGameStore.getState().setCharacterCreation({
      stats: stats
    });
    console.log('Stats Selection - Stored Data:', useGameStore.getState().characterCreation);
  }, [stats]);

  const getStatColor = (stat) => {
    if (stats[stat] > BASE_STATS[stat].base) return "text-emerald-600 font-bold";
    if (stats[stat] < BASE_STATS[stat].base) return "text-red-600 font-bold";
    return "text-[#2A160C]";
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Base Stats Column */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] w-[40%] lg:w-[50%]">
            Ability Scores
          </h3>
          <div className="relative">
            <span className="text-[0.7rem] lg:text-[1rem] text-[#8B4513] bg-[#2A160C]/5 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#2A160C]/10">
              Points: <span className="font-bold text-[#2A160C]">{pointsRemaining}</span>
            </span>
          </div>
        </div>
        
        <div className="space-y-2 lg:space-y-2.5">
          {Object.keys(BASE_STATS).map((stat) => (
            <div 
              key={stat} 
              className="flex items-center justify-between bg-[#E6D5BC] rounded-lg lg:rounded-xl p-2 lg:p-2.5 border-2 border-[#2A160C]/20 hover:bg-[#D4C3AA] transition-all duration-200"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-[#2A160C]/5 flex items-center justify-center">
                  <span className="text-[0.7rem] lg:text-[0.9rem] font-bold text-[#2A160C]">
                    {BASE_STATS[stat].name.charAt(0)}
                  </span>
                </div>
                <span className="text-[0.7rem] lg:text-[0.9rem] font-medium text-[#2A160C]">
                  {BASE_STATS[stat].name}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 lg:gap-2 bg-[#2A160C]/5 rounded-lg p-1">
                <button
                  onClick={() => handleStatChange(stat, -1)}
                  className={`w-5 h-5 lg:w-6 lg:h-6 rounded-md flex items-center justify-center transition-all duration-200
                    ${stats[stat] > BASE_STATS[stat].min 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  disabled={stats[stat] <= BASE_STATS[stat].min}
                >
                  <span className="text-xs lg:text-sm">-</span>
                </button>
                
                <span className={`w-8 lg:w-10 text-center text-[0.7rem] lg:text-[0.9rem] ${getStatColor(stat)}`}>
                  {stats[stat]}
                </span>
                
                <button
                  onClick={() => handleStatChange(stat, 1)}
                  className={`w-5 h-5 lg:w-6 lg:h-6 rounded-md flex items-center justify-center transition-all duration-200
                    ${pointsRemaining > 0 && stats[stat] < BASE_STATS[stat].max
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  disabled={pointsRemaining <= 0 || stats[stat] >= BASE_STATS[stat].max}
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
          {Object.entries(derivedStats).map(([stat, value]) => (
            <div 
              key={stat} 
              className="bg-[#E6D5BC] rounded-lg lg:rounded-xl p-2 lg:p-3 border-2 border-[#2A160C]/20 hover:bg-[#D4C3AA] transition-all duration-200"
            >
              <div className="text-[0.6rem] lg:text-[0.8rem] text-[#8B4513] mb-0.5 lg:mb-1">
                {stat.replace(/([A-Z])/g, ' $1').trim()}
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