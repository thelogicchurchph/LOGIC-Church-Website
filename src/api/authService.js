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
      const data = await api.get('/user/profile');
      return data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      // No backend logout required for JWT, client just deletes token.
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};

export default authService;
