import { create } from 'zustand';

const useCharacterStore = create((set) => ({
  characterCreation: {
    selectedClassId: null,
    colorSchemes: {},
    stats: null,
  },
  currentCharacter: null,
  setCharacterCreation: (data) => set((state) => ({
    characterCreation: {
      ...state.characterCreation,
      ...data
    }
  })),
  setCurrentCharacter: (character) => set({ 
    currentCharacter: {
      id:  character._id || character.id ,
      userId: character.userId,
      name: character.name,
      class: character.class.toLowerCase(),
      level: character.level,
      experience: character.experience,
      stats: character.stats,
      customization: character.customization,
      completedMainContracts: character.completedMainContracts
    }
  }),
}));

export default useCharacterStore;
