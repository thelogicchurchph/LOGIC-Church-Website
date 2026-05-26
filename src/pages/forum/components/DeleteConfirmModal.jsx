import React from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn animate__faster">
      <div className="bg-[#151515] border border-white/10 rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-3">{title || 'Delete Item'}</h3>
        <p className="text-gray-400 mb-8">{message || 'Are you sure you want to delete this item? This action cannot be undone.'}</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-600/20 hover:bg-red-500 active:scale-95 transition-all disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
