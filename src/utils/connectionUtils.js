export const checkConnection = async () => {
  try {
    const API_URL = import.meta.env.VITE_MASTER_SERVER_URL;
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Server is not responding');
    }
    
    return { ok: true };
  } catch (error) {
    return { 
      ok: false, 
      error: error.message || 'Unable to connect to server'
    };
  }
}; 