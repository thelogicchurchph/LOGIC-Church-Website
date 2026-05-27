import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Mail, Person, Phone, DateRange, Delete } from '@mui/icons-material';
import { toast } from 'sonner';

export default function Inbox() {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'talk'
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages(activeTab);
  }, [activeTab]);

  const fetchMessages = async (type) => {
    setLoading(true);
    try {
      const endpoint = type === 'contact' ? '/admin/messages/contact' : '/admin/messages/talk-to-ppc';
      const data = await api.get(endpoint);
      setMessages(data);
    } catch (error) {
      toast.error('Failed to load messages');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mail className="text-red-500" /> Inbox
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage all incoming forms and messages.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            activeTab === 'contact' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Contact Form
        </button>
        <button
          onClick={() => setActiveTab('talk')}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            activeTab === 'talk' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Talk 2 PPC
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <Mail className="text-4xl mb-2 opacity-50" />
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-gray-900 border border-gray-700 p-5 rounded-xl flex flex-col gap-3">
                <div className="flex justify-between items-start border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="font-bold text-lg text-white">{msg.subject || msg.request_type || 'No Subject'}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Person fontSize="small" /> {msg.name}</span>
                      {msg.email && <span className="flex items-center gap-1"><Mail fontSize="small" /> {msg.email}</span>}
                      {msg.phone && <span className="flex items-center gap-1"><Phone fontSize="small" /> {msg.phone}</span>}
                      {msg.gender && <span className="px-2 py-0.5 bg-gray-800 rounded-md text-xs">{msg.gender}</span>}
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                    <DateRange fontSize="small" /> {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
