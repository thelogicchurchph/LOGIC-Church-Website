import React from 'react';
import { useAuth } from '../../context/AdminAuthContext';
import { User, Mail, Shield } from 'lucide-react';

const AdminProfile = () => {
  const { admin } = useAuth();

  return (
    <div className="text-white p-6 max-w-4xl mx-auto animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold mb-8">Admin Profile</h1>
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
        <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-700">
          <div className="h-24 w-24 bg-red-900/50 rounded-full flex items-center justify-center text-4xl font-bold text-red-400 border border-red-800">
            {admin?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{admin?.name || 'Administrator'}</h2>
            <p className="text-gray-400 flex items-center mt-1"><Shield className="w-4 h-4 mr-2"/> {admin?.role || 'Super Admin'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email Address</label>
            <div className="flex items-center text-lg"><Mail className="w-5 h-5 mr-3 text-red-500"/> {admin?.email || 'admin@logic.church'}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Account ID</label>
            <div className="flex items-center text-lg"><User className="w-5 h-5 mr-3 text-red-500"/> {admin?.id || 'sys-admin-01'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfile;
