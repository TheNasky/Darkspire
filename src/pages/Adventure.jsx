import { useState } from 'react';
import Stage from '../components/Stage';
import { STAGE_CONFIGS } from '../constants/stages';

export default function Battle() {
  const [mode, setMode] = useState('map');
  const [currentBattle, setCurrentBattle] = useState(null);

  const handleBattleComplete = () => {
    setMode('map');
    setCurrentBattle(null);
  };

  const handleEncounterSelect = (battleConfig) => {
    setCurrentBattle(battleConfig);
    setMode('battle');
  };

  return (
    <Stage 
      config={mode === 'map' ? STAGE_CONFIGS.TUTORIAL : currentBattle} 
      mode={mode}
      onBattleComplete={handleBattleComplete}
      onEncounterSelect={handleEncounterSelect}
    />
  );
} 