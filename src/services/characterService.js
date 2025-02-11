import axios from "axios";
import useUserDataStore from "../store/userDataStore";

const API_URL = import.meta.env.VITE_MASTER_SERVER_URL;

export const characterService = {
  createCharacter: async (characterData) => {
    try {
      // Try to get token from localStorage first, then from userDataStore
      const storedToken = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData")).token
        : useUserDataStore.getState().token;

      const response = await axios.post(`${API_URL}/characters/create`, characterData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCharacters: async () => {
    try {
      const storedToken = localStorage.getItem("token") || useUserDataStore.getState().token;

      const response = await axios.get(`${API_URL}/characters`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
