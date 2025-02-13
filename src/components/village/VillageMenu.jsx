import { motion } from "framer-motion";

export default function VillageMenu({ locations, activeLocation, onLocationSelect }) {
  return (
    <div className="w-80 bg-[#e6d5bc] rounded-lg border-4 border-[#2A160C]/40 overflow-hidden">
      <h2 className="text-[1.1rem] font-pixel text-[#2A160C] px-4 py-3 border-b-2 border-[#2A160C]/20">
        Village
      </h2>
      <div 
        className="py-2 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A160C]/20 scrollbar-track-[#2A160C]/5"
      >
        <div className="px-2 space-y-1.5">
          {Object.values(locations).map((location) => (
            <motion.button
              key={location.id}
              onClick={() => !location.disabled && onLocationSelect(location)}
              className={`w-full p-2.5 rounded transition-all duration-200 group flex items-center justify-between
                ${location.disabled 
                  ? 'bg-[#2A160C]/5 cursor-not-allowed' 
                  : activeLocation?.id === location.id
                    ? 'bg-[#2A160C]'
                    : 'hover:bg-[#2A160C]/10'
                }
              `}

            >
              <div className="text-left flex-1">
                <div className={`font-pixel text-sm ${
                  location.disabled 
                    ? 'text-[#2A160C]/40' 
                    : activeLocation?.id === location.id
                      ? 'text-[#E6D5BC]'
                      : 'text-[#2A160C]'
                }`}>
                  {location.name}
                </div>
                <div className={`text-xs mt-1 font-pixel ${
                  location.disabled 
                    ? 'text-[#2A160C]/30' 
                    : activeLocation?.id === location.id
                      ? 'text-[#E6D5BC]/70'
                      : 'text-[#2A160C]/70'
                }`}>
                  {location.description}
                </div>
              </div>
              <span className="text-lg ml-3">{location.icon}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 