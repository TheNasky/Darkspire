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
  setCurrentCharacter: (character) => set({ currentCharacter: character }),
}));

export default useCharacterStore;
