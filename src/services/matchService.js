import axios from "axios";
import useUserDataStore from "../store/userDataStore";

const API_URL = import.meta.env.VITE_MASTER_SERVER_URL;

export const matchService = {
  generateMatch: async (contractId, characterId, difficulty, size) => {
    try {
      const storedToken = localStorage.getItem("token") || useUserDataStore.getState().token;

      const response = await axios.post(
        `${API_URL}/matches/test-generate?size=${size}`,
        {
          contractId,
          characterId,
          difficulty
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  acceptContract: async (characterId, contractId, difficulty) => {
    try {
      const storedToken = localStorage.getItem("token") || useUserDataStore.getState().token;

      const response = await axios.post(
        `${API_URL}/matches/${characterId}/accept-contract/${contractId}`,
        { difficulty },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  moveCharacter: async (characterId, matchId, position) => {
    try {
      const storedToken = localStorage.getItem("token") || useUserDataStore.getState().token;

      const response = await axios.post(
        `${API_URL}/matches/${characterId}/matches/${matchId}/move`,
        { position },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
}; 