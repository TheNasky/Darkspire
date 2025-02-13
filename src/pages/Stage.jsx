import { useState } from "react";
import useGameStore from "../store/gameStore";
import BattleGrid from "../components/BattleGrid";

export default function Stage() {
  const [currentView, setCurrentView] = useState('battle'); // 'battle' or 'map'
  const { currentStage } = useGameStore();

  const renderView = () => {
    switch(currentView) {
      case 'battle':
        return <BattleGrid gridSize={currentStage?.gridSize || { rows: 10, cols: 10 }} />;
      case 'map':
        // We'll implement the map view later
        return <div>Map View (Coming Soon)</div>;
      default:
        return <BattleGrid gridSize={{ rows: 10, cols: 10 }} />;
    }
  };

  return ( 
    <div className="absolute inset-0 flex flex-col mt-16 items-center p-4">
      {/* Header */}
      <div className="max-w-5xl w-full flex items-center justify-between mb-6">
        <h1 className="text-5xl font-bold text-emerald-400">Battle Grid</h1>
        
        {/* View Toggle Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView('battle')}
            className={`px-4 py-2 rounded ${
              currentView === 'battle' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Battle
          </button>
          <button
            onClick={() => setCurrentView('map')}
            className={`px-4 py-2 rounded ${
              currentView === 'map' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {/* Container with controlled width */}
      <div className="max-w-5xl w-full h-[80vh]">
        {renderView()}
      </div>
    </div>
  );
} 