import { create } from 'zustand';

const useMapStore = create((set) => ({
  mapData: null,
  setMapData: (data) => set({ mapData: data }),
}));

export default useMapStore; 