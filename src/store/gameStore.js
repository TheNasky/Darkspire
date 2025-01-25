import { create } from 'zustand';

const useGameStore = create((set) => ({
  characterCreation: {
    selectedClassId: null,
    colorSchemes: {},
    stats: null,
  },
  setCharacterCreation: (data) => set((state) => ({
    characterCreation: {
      ...state.characterCreation,
      ...data
    }
  })),
}));

export default useGameStore;
