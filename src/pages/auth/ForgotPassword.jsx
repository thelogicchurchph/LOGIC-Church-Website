import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email) {
      toast.success('Password reset link sent to your email!');
      setEmail('');
      // To wire with backend: api.post('/logic/auth/reset-password', { email })
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 animate__animated animate__fadeIn">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">Enter your email and we'll send you a recovery link</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" 
                placeholder="admin@logic.church" 
              />
            </div>
          </div>
          
          <button type="submit" className="w-full flex justify-center py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-700 transition duration-300 shadow-lg transform hover:-translate-y-1">
            Send Reset Link
          </button>
          
          <div className="text-center mt-6">
            <Link to="/admin/login" className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
