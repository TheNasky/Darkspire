const API_URL = import.meta.env.VITE_MASTER_SERVER_URL;

export const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.payload.message || data.message || 'Login failed');
      }

      return {
        ok: true,
        payload: data.payload,
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Server error. Please try again later.');
      }
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.payload.message || data.message || 'Registration failed');
      }

      return {
        ok: true,
        message: data.message,
        payload: data.payload,
      };
    } catch (error) {
      throw error;
    }
  },
}; 