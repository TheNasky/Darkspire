import { motion } from "framer-motion";

export default function StatusBars({ stats }) {
  const bars = [
    {
      id: 'health',
      label: 'HP',
      current: stats?.health || 120,
      max: 120,
      color: 'from-red-600 to-red-700',
      bgColor: 'bg-red-950/30'
    },
    {
      id: 'stamina',
      label: 'SP',
      current: stats?.stamina || 90,
      max: 110,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-950/30'
    },
    {
      id: 'mana',
      label: 'MP',
      current: stats?.mana || 45,
      max: 80,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-950/30'
    }
  ];

  return (
    <div className="flex flex-col gap-2 pb-6 relative bottom-1.5"> {// top-8
      }
      {bars.map(bar => (
        <div key={bar.id} className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-300 w-8">{bar.label}</span>
          <div className={`relative w-[16rem] h-[1.2rem] ${bar.bgColor} rounded-sm overflow-hidden bottom-0.5`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(bar.current / bar.max) * 100}%` }}
              className={`absolute inset-0 bg-gradient-to-r ${bar.color}`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[0.7rem] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {bar.current}/{bar.max}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 