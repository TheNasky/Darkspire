import axios from "axios";
import useUserDataStore from "../store/userDataStore";

const API_URL = import.meta.env.VITE_MASTER_SERVER_URL;

export const contractService = {
  getContracts: async (characterId) => {
    try {
      const storedToken = localStorage.getItem("token") || useUserDataStore.getState().token;

      const response = await axios.get(`${API_URL}/contracts/${characterId}`, {
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