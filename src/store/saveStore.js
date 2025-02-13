import { create } from 'zustand';
import { openDB } from 'idb';

const DB_NAME = 'gameSaves';
const STORE_NAME = 'saves';

// Initialize the database
const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
  return db;
};

// Create the store
const useSaveStore = create((set, get) => ({
  saves: [],
  addSave: async (saveData) => {
    const db = await initDB();
    const save = {
      id: Date.now(), // Use timestamp as a unique ID
      name: `SAVE FILE ${Date.now()}`,
      playTime: "0:00:00",
      character: saveData,
      createdAt: new Date().toISOString(),
    };
    await db.put(STORE_NAME, save);
    const allSaves = await db.getAll(STORE_NAME);
    set({ saves: allSaves });
  },
  deleteSave: async (saveId) => {
    const db = await initDB();
    await db.delete(STORE_NAME, saveId);
    const allSaves = await db.getAll(STORE_NAME);
    set({ saves: allSaves });
  },
  getSaves: async () => {
    const db = await initDB();
    const allSaves = await db.getAll(STORE_NAME);
    set({ saves: allSaves });
    return allSaves;
  },
}));

export default useSaveStore; 