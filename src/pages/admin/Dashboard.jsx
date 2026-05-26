import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { 
  EventNote, 
  PeopleAlt, 
  PhotoLibrary, 
  Forum, 
  TrendingUp,
  AccountCircle
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
    { label: "Active Events", value: stats.events, icon: <EventNote />, color: "from-indigo-600 to-violet-700", shadow: "shadow-indigo-500/20" },
    { label: "Our Community", value: stats.users, icon: <PeopleAlt />, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
    { label: "Gallery Assets", value: stats.gallery, icon: <PhotoLibrary />, color: "from-orange-500 to-amber-600", shadow: "shadow-orange-500/20" },
    { label: "Messages (Sermons)", value: stats.posts, icon: <Forum />, color: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-10 relative overflow-hidden">
      {/* Removed excessive neon blurs for a cleaner, modern look */}


      <header className="mb-12 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="animate__animated animate__fadeInLeft">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            Admin HQ
          </h1>
          <p className="text-gray-400 mt-3 text-lg font-medium">
            Monitor and manage your digital church sanctuary.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 p-4 rounded-2xl shadow-xl">
          <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <TrendingUp className="text-emerald-500 text-lg" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-0.5">Core Status</p>
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
              All Systems Operational
            </p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 mb-12">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-2xl ${stat.shadow} animate__animated animate__fadeInUp`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Ambient Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`}></div>
            
            <div className="flex justify-between items-start mb-8">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                <TrendingUp className="text-xs" />
              </div>
            </div>

            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl font-black text-white tracking-tighter">
                  {loading ? (
                    <span className="w-16 h-10 bg-white/5 animate-pulse rounded-lg inline-block"></span>
                  ) : (
                    stat.value
                  )}
                </h2>
                {!loading && <span className="text-emerald-500 text-xs font-bold">+12%</span>}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Areas */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
         <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-3">
                 <span className="h-6 w-1.5 bg-red-600 rounded-full"></span>
                 System Overview
              </h3>
            </div>
            
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                 <EventNote className="text-gray-500 text-3xl" />
              </div>
              <p className="text-gray-400 font-medium">Your church system is running smoothly.</p>
              <p className="text-sm text-gray-500 mt-2">Use the quick actions to manage events or upload media.</p>
            </div>
         </div>

         <div className="flex flex-col gap-8 animate__animated animate__fadeInRight" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
               
               <h3 className="text-xl font-bold mb-6 relative z-10">Quick Actions</h3>
               <div className="space-y-4 relative z-10">
                  <button onClick={() => window.location.href='/admin/events'} className="group/btn w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                     Create New Event
                     <TrendingUp className="text-black rotate-45 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                  <button onClick={() => window.location.href='/admin/gallery'} className="w-full py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl active:scale-95 hover:border-white/20">
                     Upload Gallery Assets
                  </button>
               </div>

               <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/5 relative z-10">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pro Tip</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    You can manage nested forum replies directly from the <strong>Messages</strong> tab.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Dashboard;