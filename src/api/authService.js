import api from './axios';

export const authService = {
  async login(email, password) {
    try {
      const data = await api.post('/auth/login', {
        email,
        password
      });
      
      return data; // Should contain { token, admin } if successful
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const data = await api.get('/auth/me');
      return data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};

export default authService;
