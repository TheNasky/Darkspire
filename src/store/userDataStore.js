import { create } from 'zustand';

const useUserDataStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUserData: (user, token, rememberMe = false) => {
    set({ user, token, isAuthenticated: true });
    
    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify({ user, token }));
    } else {
      // Clear localStorage in case it exists from a previous "remember me" session
      localStorage.removeItem('userData');
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('userData');
  },

  initializeAuth: () => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const { user, token } = JSON.parse(savedData);
      set({ user, token, isAuthenticated: true });
    }
  }
}));

// Initialize auth state when the store is created
useUserDataStore.getState().initializeAuth();

export default useUserDataStore;