import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  EventNote, 
  PeopleAlt, 
  PhotoLibrary, 
  ForumRounded, 
  ArrowForward
} from '@mui/icons-material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    users: 0,
    gallery: 0,
    posts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await api.get('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Active Events", value: stats.events, icon: <EventNote fontSize="small" /> },
    { label: "Our Community", value: stats.users, icon: <PeopleAlt fontSize="small" /> },
    { label: "Gallery Assets", value: stats.gallery, icon: <PhotoLibrary fontSize="small" /> },
    { label: "Forum Posts", value: stats.posts, icon: <ForumRounded fontSize="small" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-10 relative overflow-hidden">
      {/* Removed excessive neon blurs for a cleaner, modern look */}


      <header className="mb-10 relative z-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Overview of your church's digital presence.
        </p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-10">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 transition-colors hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400">
                {stat.icon}
              </div>
              <p className="text-sm font-semibold text-gray-400">{stat.label}</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight">
                {loading ? (
                  <span className="w-16 h-10 bg-white/5 animate-pulse rounded-lg inline-block"></span>
                ) : (
                  stat.value
                )}
              </h2>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Areas */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
         <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
            <h3 className="text-lg font-bold mb-8">System Overview</h3>
            
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center mb-6">
                 <EventNote className="text-gray-500 text-2xl" />
              </div>
              <p className="text-gray-300 font-medium">System is running smoothly.</p>
              <p className="text-sm text-gray-500 mt-2">Manage your community content using the sidebar.</p>
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8">
               <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
               <div className="space-y-3">
                  <button onClick={() => window.location.href='/admin/events'} className="w-full py-4 px-5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-between group">
                     Create Event
                     <ArrowForward className="text-black group-hover:translate-x-1 transition-transform" fontSize="small" />
                  </button>
                  <button onClick={() => window.location.href='/admin/gallery'} className="w-full py-4 px-5 bg-white/5 text-white font-bold rounded-xl border border-white/5 hover:bg-white/10 transition-colors flex items-center justify-between">
                     Upload Media
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Dashboard;