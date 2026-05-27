import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Mail, DateRange, Delete } from '@mui/icons-material';
import { toast } from 'sonner';

export default function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const data = await api.get('/admin/newsletter/subscribers');
      setSubscribers(data);
    } catch (error) {
      toast.error('Failed to load subscribers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    try {
      await api.delete(`/admin/newsletter/subscribers/${id}`);
      setSubscribers(subscribers.filter(s => s.id !== id));
      toast.success('Subscriber deleted');
    } catch (error) {
      toast.error('Failed to delete subscriber');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="text-red-500" /> Newsletter Subscribers
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage email subscriptions for updates and inspiration.</p>
        </div>
        <div className="text-white text-lg font-bold bg-gray-900 px-4 py-2 rounded-xl border border-gray-700">
          Total: {subscribers.length}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <Mail className="text-4xl mb-2 opacity-50" />
            <p>No subscribers yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscribers.map((sub) => (
              <div key={sub.id} className="bg-gray-900 border border-gray-700 p-5 rounded-xl flex flex-col gap-3 group">
                <div className="flex justify-between items-start">
                  <div className="truncate pr-2">
                    <h3 className="font-bold text-lg text-white truncate" title={sub.email}>{sub.email}</h3>
                    <span className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <DateRange fontSize="small" /> {new Date(sub.subscribed_at).toLocaleDateString()}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDelete(sub.id)}
                    className="p-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg transition-colors border border-red-500/20 opacity-0 group-hover:opacity-100"
                    title="Remove Subscriber"
                  >
                    <Delete fontSize="small" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
