import { useEffect, useState } from 'react';
import Phaser from 'phaser';
import StageScene from '../game/scenes/StageScene';
import BattleGrid from './BattleGrid';
import MapGrid from './MapGrid';

export default function Stage({ config, mode = 'battle' }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!game) {
      const phaserConfig = {
        type: Phaser.AUTO,
        parent: 'stage-container',
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        scene: new StageScene({ 
          biome: config?.biome,
          mode
        })
      };

      const newGame = new Phaser.Game(phaserConfig);
      setGame(newGame);
    }

    return () => {
      game?.destroy(true);
    };
  }, [mode]); // Add mode to dependencies

  const handleCellClick = (row, col) => {
    if (mode === 'map') {
      // Handle map cell click - potentially trigger battle
      console.log(`Map cell clicked: ${row}, ${col}`);
    } else {
      // Handle battle cell click
      console.log(`Battle cell clicked: ${row}, ${col}`);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div id="stage-container" className="absolute inset-0" />
      <div className="absolute inset-0 z-10">
        {mode === 'map' ? (
          <MapGrid config={config} onCellClick={handleCellClick} />
        ) : (
          <BattleGrid config={config} onCellClick={handleCellClick} />
        )}
      </div>
    </div>
  );
} 