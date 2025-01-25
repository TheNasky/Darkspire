import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSaveStore = create(
  persist(
    (set, get) => ({
      saves: [],
      addSave: (saveData) => set((state) => ({
        saves: [...state.saves, {
          id: state.saves.length + 1,
          name: `SAVE FILE ${state.saves.length + 1}`,
          playTime: "0:00:00",
          character: saveData,
          createdAt: new Date().toISOString()
        }]
      })),
      deleteSave: (saveId) => set((state) => ({
        saves: state.saves.filter(save => save.id !== saveId)
      })),
      getSaves: () => get().saves
    }),
    {
      name: 'game-saves'
    }
  )
);

export default useSaveStore; 