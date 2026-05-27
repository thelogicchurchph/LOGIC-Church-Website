import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Settings as SettingsIcon, Save, YouTube } from '@mui/icons-material';
import { toast } from 'sonner';

export default function Settings() {
  const [sermonUrl, setSermonUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // The public endpoint gets the specific value
      const data = await api.get('/settings/featured-sermon');
      setSermonUrl(data.value || '');
    } catch (error) {
      toast.error('Failed to load settings');
      console.error(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!sermonUrl) {
      toast.error('Sermon URL cannot be empty');
      return;
    }

    // Ensure it's an embed URL if it's a regular youtube URL
    let finalUrl = sermonUrl;
    if (finalUrl.includes('watch?v=')) {
      finalUrl = finalUrl.replace('watch?v=', 'embed/');
      // Strip out query params after the ID
      finalUrl = finalUrl.split('&')[0];
    } else if (finalUrl.includes('youtu.be/')) {
      finalUrl = finalUrl.replace('youtu.be/', 'www.youtube.com/embed/');
      finalUrl = finalUrl.split('?')[0];
    }

    setLoading(true);
    try {
      await api.put('/admin/settings/featured_sermon', { value: finalUrl });
      toast.success('Settings saved successfully');
      setSermonUrl(finalUrl);
    } catch (error) {
      toast.error('Failed to save settings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <SettingsIcon className="text-red-500" /> Platform Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">Manage global website configurations.</p>
      </div>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Media Settings</h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Featured Sermon Video URL</label>
            <p className="text-xs text-gray-500 mb-2">This video will be displayed on the public Messages page.</p>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <YouTube className="text-gray-500" />
                </div>
                <input
                  type="text"
                  value={sermonUrl}
                  onChange={(e) => setSermonUrl(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              <Save fontSize="small" /> {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
