import axios from 'axios';

const API_URL = import.meta.env.VITE_MASTER_SERVER_URL;

export const characterService = {
  createCharacter: async (characterData) => {
    try {
      const response = await axios.post(`${API_URL}/characters/create`, characterData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}; 