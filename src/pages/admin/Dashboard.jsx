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
      {/* Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-red-600/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="mb-12 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="animate__animated animate__fadeInLeft">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            Admin HQ
          </h1>
          <p className="text-gray-400 mt-3 text-lg font-medium">
            Monitor and manage your digital church sanctuary.
          </p>
        </div>
        
        <div className="flex items-center gap-5 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-2xl animate__animated animate__fadeInRight shadow-2xl">
          <div className="h-12 w-12 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TrendingUp className="text-white" />
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
            
            <div className="flex justify-between items-start mb-10">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-black/40 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
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
         <div className="lg:col-span-2 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black flex items-center gap-3">
                 <span className="h-8 w-1.5 bg-red-600 rounded-full"></span>
                 System Logistics
              </h3>
              <button className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">View All Activities</button>
            </div>
            
            <div className="space-y-5">
               {[
                 { action: "New Member Registered", time: "2 hours ago", user: "Michael Chen" },
                 { action: "Event Updates Published", time: "4 hours ago", user: "Admin System" },
                 { action: "Gallery Sync Complete", time: "6 hours ago", user: "Admin System" }
               ].map((item, i) => (
                 <div key={i} className="group flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.05] rounded-[2rem] border border-white/5 transition-all duration-300">
                    <div className="flex items-center gap-5">
                       <div className="h-14 w-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-red-500/30 transition-colors shadow-xl">
                          <AccountCircle className="text-gray-500 group-hover:text-red-500 transition-colors" />
                       </div>
                       <div>
                          <p className="font-bold text-white group-hover:text-red-400 transition-colors">{item.action}</p>
                          <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                            <span className="text-gray-700">•</span> {item.user} <span className="text-gray-700">•</span> {item.time}
                          </p>
                       </div>
                    </div>
                    <button className="h-10 px-5 rounded-full bg-white/5 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Review</button>
                 </div>
               ))}
            </div>
         </div>

         <div className="flex flex-col gap-8 animate__animated animate__fadeInRight" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1 backdrop-blur-3xl bg-gradient-to-br from-red-600/10 to-transparent border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
               
               <h3 className="text-2xl font-black mb-6 relative z-10">Quick Actions</h3>
               <div className="space-y-4 relative z-10">
                  <button onClick={() => window.location.href='/admin/events'} className="group/btn w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                     Create New Event
                     <TrendingUp className="text-black rotate-45 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                  <button onClick={() => window.location.href='/admin/gallery'} className="w-full py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl active:scale-95 hover:border-white/20">
                     Upload Gallery Assets
                  </button>
               </div>

               <div className="mt-12 p-6 bg-black/40 rounded-3xl border border-white/5 relative z-10">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Pro Tip</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    You can now manage nested forum replies directly from the <strong>Messages</strong> tab.
                  </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Dashboard;