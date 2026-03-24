// AdminDetailsModal.jsx
import React from 'react';

const AdminDetailsModal = ({ admin, onClose }) => {
  if (!admin) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        className="bg-gray-900 rounded-xl w-full max-w-md p-6 relative animate__animated animate__fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4">Admin Details</h2>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-white">{admin.name}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white">{admin.email}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Role</p>
            <p className="text-white">{admin.role}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-white">{admin.phone}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Joined</p>
            <p className="text-white">{admin.joined}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailsModal;