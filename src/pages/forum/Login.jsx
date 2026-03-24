import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import api from "../../api/axios"
import { getCookie, setCookie } from '../../api/cookies';
import { useAuth } from '../../context/AdminAuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true)
    try {
      // Axios interceptor already returns response.data, so `response` IS the payload
      const response = await api.post('/auth/login', formData);
      const { admin: user, token } = response; // e.g. { token, admin: {...} }
      setCookie('token', token, { expires: 7 }); // must be synchronous before navigate
      setUser(user);
      navigate('/forum');
    } catch (err) {
      setError((err.response?.data?.detail) || err.message || 'Failed to log in');
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Close Button */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <Close />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Log in to access the forum</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              {/* <Link to="/forgot-password" className="text-xs text-red-400 hover:text-red-300">
                Forgot password?
              </Link> */}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
          disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
           {loading ? "Loading..." :  "Log In"}
          </button>

          <div className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to="/forum/signup" className="text-red-400 hover:text-red-300 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
