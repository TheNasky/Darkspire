import { useState, useEffect } from "react";
import useGameStore from "../../store/gameStore";
import { CHARACTER_CLASSES } from "../../constants/characters";
import { CHARACTER_COLORS } from "../../constants/characterColors";
import { BASE_STATS } from "../../constants/characterStats";
import CharacterSprite from "../CharacterSprite";

export default function CharacterResume() {
  const [characterName, setCharacterName] = useState("");
  const characterData = useGameStore.getState().characterCreation;
  const selectedClass = CHARACTER_CLASSES.find((c) => c.id === characterData.selectedClassId);
  const isNameValid = characterName.length >= 1;

  useEffect(() => {
    useGameStore.getState().setCharacterCreation({
      ...characterData,
      characterName,
    });
  }, [characterName]);

  const getColorMap = () => {
    if (!selectedClass?.spritesheet?.baseColors) return {};

    const colorMap = {};
    Object.entries(selectedClass.spritesheet.baseColors).forEach(([part, baseColors]) => {
      const selectedScheme = characterData.colorSchemes[part];

      const newColors =
        selectedScheme === "default" ? baseColors : CHARACTER_COLORS[part][selectedScheme];

      if (baseColors && newColors) {
        baseColors.forEach((baseColor, index) => {
          colorMap[baseColor] = selectedScheme === "default" ? baseColor : newColors[index];
        });
      }
    });

    return colorMap;
  };

  useEffect(() => {
    console.log("Character Resume Data:", characterData);
  }, []);

  if (!characterData.stats || !selectedClass) {
    return <div>Loading character data...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full">
      {/* Left Column - Character Preview */}
      <div className="lg:w-1/3">
        <div className="bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 p-4 h-full  overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <div className="relative bottom-14">
              <CharacterSprite
                characterId={selectedClass.id}
                action="idle"
                size="43rem"
                colorMap={getColorMap()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Stats */}
      <div className="lg:w-2/3 space-y-4">
        {/* Name Input */}
        <div className="bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 p-4">
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/50 border-2 border-[#2A160C]/20 
                      text-[1rem] lg:text-[1.2rem] text-[#2A160C] placeholder-[#8B4513]/50
                      focus:outline-none focus:border-[#2A160C]/40"
            placeholder="Enter character name..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Ability Scores */}
          <div className="bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 p-4">
            <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] mb-4">
              Ability Scores
            </h3>
            <div className="space-y-2">
              {Object.entries(characterData.stats).map(([stat, value]) => (
                <div
                  key={stat}
                  className="flex justify-between items-center p-2 bg-[#2A160C]/5 rounded-lg"
                >
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

          {/* Final Stats */}
          <div className="bg-[#E6D5BC] rounded-xl border-2 border-[#2A160C]/20 p-4">
            <h3 className="text-[0.8rem] lg:text-[1.2rem] font-bold text-[#2A160C] mb-4">
              Final Stats
            </h3>
            <div className="space-y-2">
              <StatBlock name="Health" value={characterData.stats.CON * 5} />
              <StatBlock name="Mana" value={characterData.stats.INT * 3} />
              <StatBlock
                name="Physical Damage"
                value={Math.floor(characterData.stats.STR * 1.5)}
              />
              <StatBlock
                name="Magical Damage"
                value={Math.floor(characterData.stats.INT * 1.5)}
              />
              <StatBlock name="Defense" value={Math.floor(characterData.stats.CON * 0.8)} />
              <StatBlock name="Speed" value={Math.floor(characterData.stats.DEX * 1.2)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ name, value }) {
  return (
    <div className="flex justify-between items-center p-2 bg-[#2A160C]/5 rounded-lg">
      <span className="text-[0.7rem] lg:text-[0.9rem] text-[#8B4513]">{name}</span>
      <span className="text-[0.7rem] lg:text-[0.9rem] font-bold text-[#2A160C]">{value}</span>
    </div>
  );
}
