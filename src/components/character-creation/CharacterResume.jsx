import { useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import { CHARACTER_CLASSES } from '../../constants/characters';
import { CHARACTER_COLORS } from '../../constants/characterColors';
import { BASE_STATS } from '../../constants/characterStats';
import CharacterSprite from '../CharacterSprite';

export default function CharacterResume() {
  const characterData = useGameStore.getState().characterCreation;
  const selectedClass = CHARACTER_CLASSES.find(c => c.id === characterData.selectedClassId);

  const getColorMap = () => {
    if (!selectedClass?.spritesheet?.baseColors) return {};

    const colorMap = {};
    Object.entries(selectedClass.spritesheet.baseColors).forEach(([part, baseColors]) => {
      const selectedScheme = characterData.colorSchemes[part];
      
      const newColors = selectedScheme === "default" 
        ? baseColors
        : CHARACTER_COLORS[part][selectedScheme];

      if (baseColors && newColors) {
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = selectedScheme === "default" 
            ? baseColor
            : newColors[index];
        });
      }
    });

    return colorMap;
  };

  useEffect(() => {
    console.log('Character Resume Data:', characterData);
  }, []);

  if (!characterData.stats || !selectedClass) {
    return <div>Loading character data...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Character Preview */}
      <div className="flex-1 bg-[#E6D5BC] rounded-lg p-4 border-2 border-[#2A160C]/20">
        <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] mb-4">
          Character Preview
        </h3>
        <div className="flex justify-center">
          <CharacterSprite
            characterId={selectedClass.id}
            action="idle"
            size="8rem"
            colorMap={getColorMap()}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="flex-1 bg-[#E6D5BC] rounded-lg p-4 border-2 border-[#2A160C]/20">
        <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] mb-4">
          Final Stats
        </h3>
        <div className="space-y-2">
          {Object.entries(characterData.stats || {}).map(([stat, value]) => (
            <div key={stat} className="flex justify-between items-center">
              <span className="text-[0.7rem] lg:text-[0.9rem] text-[#8B4513]">
                {BASE_STATS[stat].name}
              </span>
              <span className="text-[0.7rem] lg:text-[0.9rem] font-bold text-[#2A160C]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 