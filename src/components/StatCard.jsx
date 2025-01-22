import CharacterSprite from "./CharacterSprite";

export default function StatCard({ player, isEnemy = false }) {
  const accentColor = isEnemy ? "red" : "emerald";
  
  // Default max values (you can pass these as props later if needed)
  const maxHealth = 100;
  const maxStamina = 100;
  const maxMana = 100;
  
  return (
    <div className={`w-[22rem] bg-gray-800/30 rounded-lg border border-gray-700/30 p-4 backdrop-blur-sm`}>
      <div className={`flex gap-4 ${isEnemy ? 'flex-row-reverse' : ''}`}>
        {/* Portrait Side */}
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 mb-2 bg-gray-900/50 rounded-lg border border-${accentColor}-500/30 overflow-hidden`}>
            <div className={`scale-150 origin-center ${isEnemy ? 'scale-x-[-1.5]' : ''}`}>
              <CharacterSprite
                character={player.character}
                size="6rem"
                scale={1.5}
              />
            </div>
          </div>
          <h3 className={`text-${accentColor}-400 font-medium text-sm`}>{player.name || "Unknown"}</h3>
        </div>

        {/* Stats Side */}
        <div className="flex-1 flex flex-col">
          {/* Stats Bars */}
          <div className="space-y-2">
            {/* Health Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-red-400 w-6">HP</span>
              <div className="flex-1 h-2 bg-black/60 rounded-sm overflow-hidden border border-gray-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-sm transition-all duration-300" 
                  style={{ width: `${(player.stats?.health || 100) / maxHealth * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-12 text-right">{player.stats?.health || 100}/{maxHealth}</span>
            </div>
            
            {/* Stamina Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-yellow-400 w-6">SP</span>
              <div className="flex-1 h-2 bg-black/60 rounded-sm overflow-hidden border border-gray-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-sm transition-all duration-300" 
                  style={{ width: `${(player.stats?.stamina || 80) / maxStamina * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-12 text-right">{player.stats?.stamina || 80}/{maxStamina}</span>
            </div>
            
            {/* Mana Bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-blue-400 w-6">MP</span>
              <div className="flex-1 h-2 bg-black/60 rounded-sm overflow-hidden border border-gray-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm transition-all duration-300" 
                  style={{ width: `${(player.stats?.mana || 60) / maxMana * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-12 text-right">{player.stats?.mana || 60}/{maxMana}</span>
            </div>
          </div>

          {/* Space for charges/additional info */}
          <div className="mt-4 pt-3 border-t border-gray-700/30">
            <div className="flex gap-2">
              {/* Placeholder for charges/abilities */}
              <div className="w-8 h-8 rounded-md bg-black/60 border border-gray-700/50"></div>
              <div className="w-8 h-8 rounded-md bg-black/60 border border-gray-700/50"></div>
              <div className="w-8 h-8 rounded-md bg-black/60 border border-gray-700/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 