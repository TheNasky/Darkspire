import { useState, useEffect } from "react";
import useGameStore from "../store/gameStore";
import useMapStore from "../store/mapStore"; // Import the map store
import BattleGrid from "../components/BattleGrid";
import PlayerHUD from "../components/match/PlayerHUD";
import MapView from "../components/match/MapView";




export default function Stage() {
  const [currentView, setCurrentView] = useState('map');
  const { currentStage } = useGameStore();
  const setMapData = useMapStore((state) => state.setMapData);

  useEffect(() => {
    const game = useGameStore.getState().game;
    if (game && currentStage?.mapData?.grid) {
      // Set both grid and match data
      setMapData({
        grid: currentStage.mapData.grid,
        match: currentStage.mapData.match
      });
      
      game.events.emit('changeScene', 'StageBackground', { 
        biome: currentStage.contract.biome?.toUpperCase() || 'FOREST',
      });
    }
  }, [currentStage, setMapData]);

  if (!currentStage?.mapData?.grid) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  const renderView = () => {
    switch(currentView) {
      case 'battle':
        return <BattleGrid gridSize={currentStage?.gridSize || { rows: 10, cols: 10 }} />;
      case 'map':
        return <MapView />;
      default:
        return <MapView />;
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">          
          {/* View Toggle Buttons */}
          <div className="flex gap-2">
            {/* <button
              onClick={() => setCurrentView('map')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'map' 
                  ? 'bg-[#2A160C] text-[#E6D5BC]' 
                  : 'bg-[#2A160C]/10 text-[#2A160C] hover:bg-[#2A160C]/20'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setCurrentView('battle')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'battle' 
                  ? 'bg-[#2A160C] text-[#E6D5BC]' 
                  : 'bg-[#2A160C]/10 text-[#2A160C] hover:bg-[#2A160C]/20'
              }`}
            >
              Battle
            </button> */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {renderView()}
        </div>
      </div>

      {/* Player HUD */}
      <PlayerHUD />
    </div>
  );
} 