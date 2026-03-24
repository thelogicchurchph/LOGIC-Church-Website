import React, { useState, useEffect } from 'react';
import AdminDetailsModal from './AdminDetailsModal';
import CreateAdminModal from './CreateAdminModal';
import api from '../../api/axios';
import { toast } from 'sonner';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await api.get('/users');
      // Map name to the format expected by the UI if necessary
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to load admin accounts');
    } finally {
      setLoading(false);
    }
  };

  const openDetailsModal = (admin) => {
    setSelectedAdmin(admin);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAdmin(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateAdmin = async (newAdmin) => {
    try {
      // CreateAdminModal likely provides { name, email, password, role }
      const response = await api.post('/auth/register', newAdmin);
      setAdmins([...admins, response]);
      toast.success('Admin account created successfully');
      closeCreateModal();
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('Failed to create admin account');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Management</h1>
        <p className="text-gray-400 mt-2">
          View and manage church admin accounts.
        </p>
      </header>

      <div className="mb-6">
        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-[#CE1F2F] to-[#541616] text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity active:scale-95"
        >
          + Add New Admin
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">{admin.name}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#a82031]/20 text-[#a82031] rounded-full text-xs capitalize">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openDetailsModal(admin)}
                      className="text-[#a82031] hover:underline font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">No admin accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isDetailsModalOpen && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={closeDetailsModal}
        />
      )}

      {isCreateModalOpen && (
        <CreateAdminModal
          onCreate={handleCreateAdmin}
          onClose={closeCreateModal}
        />
      )}
    </div>
  );
};

export default AdminManagement;