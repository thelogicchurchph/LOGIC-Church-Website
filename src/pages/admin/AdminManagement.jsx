import React, { useState, useEffect } from 'react';
import AdminDetailsModal from './AdminDetailsModal';
import CreateAdminModal from './CreateAdminModal';
import api from '../../api/axios';
import { toast } from 'sonner';
import DeleteConfirmModal from '../forum/components/DeleteConfirmModal';


const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
      const response = await api.post('/admin/users', newAdmin);
      setAdmins([...admins, response]);
      toast.success('Admin account created successfully');
      closeCreateModal();
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error('Failed to create admin account');
    }
  };

  const handleDeleteAdminClick = (admin) => {
    setDeleteTarget(admin);
    setDeleteModalOpen(true);
  };

  const confirmDeleteAdmin = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/admin/users/${deleteTarget.id}`);
      setAdmins(admins.filter(a => a.id !== deleteTarget.id));
      toast.success('Admin deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to delete admin');
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-10">
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

      <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto hide-scrollbar">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5 font-semibold">{admin.name}</td>
                    <td className="px-6 py-5 text-gray-400">{admin.email}</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => openDetailsModal(admin)}
                          className="text-gray-400 hover:text-white text-sm font-semibold transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDeleteAdminClick(admin)}
                          className="text-red-500 hover:text-red-400 text-sm font-semibold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
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
          </div>
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

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteAdmin}
        loading={deleteLoading}
        title="Delete Admin"
        message={`Are you sure you want to delete ${deleteTarget?.name}? They will lose all administrative access.`}
      />
    </div>
  );
};

export default AdminManagement;