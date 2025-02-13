import { useState } from "react";
import useGameStore from "../store/gameStore";
import JobBoard from "../components/village/JobBoard";
import GeneralStore from "../components/village/GeneralStore";
import VillageMenu from "../components/village/VillageMenu";
import CharacterPanel from "../components/character/CharacterPanel";

const VILLAGE_LOCATIONS = {
  JOB_BOARD: {
    id: 'job_board',
    name: 'Job Board',
    icon: '📜',
    description: 'Find contracts and adventures'
  },
  GENERAL_STORE: {
    id: 'general_store',
    name: 'Store',
    icon: '🏪',
    description: 'Adventuring supplies'
  },
  BLACKSMITH: {
    id: 'blacksmith',
    name: 'Blacksmith',
    icon: '⚒️',
    description: 'Armors and Weapons',
    disabled: true
  },
  MAGIC_EMPORIUM: {
    id: 'magic_emporium',
    name: 'Magic Emporium',
    icon: '✨',
    description: 'Magical items and ingredients',
    disabled: true
  },
  TAVERN: {
    id: 'tavern',
    name: 'Tavern',
    icon: '🍺',
    description: 'Rest and gather information',
    disabled: true
  },
  AUCTION_HOUSE: {
    id: 'auction_house',
    name: 'Auction House',
    icon: '🏛️',
    description: 'Trade with other adventurers',
    disabled: true
  },
  BANK: {
    id: 'bank',
    name: 'Bank',
    icon: '💰',
    description: 'Store your wealth',
    disabled: true
  }
};

export default function Village() {
  const { currentStage } = useGameStore();
  const [activeLocation, setActiveLocation] = useState(null);

  const renderLocation = () => {
    switch (activeLocation?.id) {
      case 'job_board':
        return <JobBoard />;
      case 'general_store':
        return <GeneralStore />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-[#2A160C]/50 font-pixel">
            Select a location to begin
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
      <div className="max-w-[95vw] w-full h-[54rem]">
        <div className="bg-[#D4C3AA] rounded-lg border-4 border-[#2A160C]/40 p-4 h-full flex gap-4">
          <VillageMenu
            locations={VILLAGE_LOCATIONS}
            activeLocation={activeLocation}
            onLocationSelect={setActiveLocation}
          />
          
          <div className="w-[60%] bg-[#E6D5BC] rounded-lg border-4 border-[#2A160C]/20 overflow-hidden">
            {renderLocation()}
          </div>

          <div className="w-[40%] bg-[#E6D5BC] rounded-lg border-4 border-[#2A160C]/20 overflow-hidden">
            <CharacterPanel />
          </div>
        </div>
      </div>
    </div>
  );
} 