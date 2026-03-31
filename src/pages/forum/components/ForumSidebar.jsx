import React from 'react';
import { ForumRounded, ChatBubbleOutline, FavoriteBorder, MenuBook, Campaign } from '@mui/icons-material';

const CATEGORIES = [
  { id: 'All', label: 'All Discussions', icon: ForumRounded, gradient: 'from-gray-500 to-gray-400' },
  { id: 'General', label: 'General', icon: ChatBubbleOutline, gradient: 'from-blue-500 to-cyan-400' },
  { id: 'Prayer Wall', label: 'Prayer Wall', icon: FavoriteBorder, gradient: 'from-red-500 to-pink-500' },
  { id: 'Testimonies', label: 'Testimonies', icon: ForumRounded, gradient: 'from-green-500 to-emerald-400' },
  { id: 'Bible Study', label: 'Bible Study', icon: MenuBook, gradient: 'from-amber-500 to-orange-400' },
  { id: 'Announcements', label: 'Announcements', icon: Campaign, gradient: 'from-purple-500 to-indigo-400' },
];

export default function ForumSidebar({ currentCategory, setCurrentCategory, stats }) {
  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-gradient-to-br from-red-600/10 to-transparent border border-white/10 rounded-[2rem] p-6">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
          <span className="w-2 h-6 bg-red-600 rounded-full"></span>
          Explore Spaces
        </h3>
        <ul className="space-y-2">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = currentCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => setCurrentCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive ? 'bg-white/10 text-white font-bold ring-1 ring-white/20 shadow-lg' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.gradient} ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                    <Icon className="text-white text-[18px]" />
                  </div>
                  {cat.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6">
        <h3 className="font-bold mb-4 text-white">Community Pulse</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/40 rounded-2xl text-center ring-1 ring-white/5">
            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              {stats.topics}
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 block font-bold">topics</span>
          </div>
          <div className="p-4 bg-black/40 rounded-2xl text-center ring-1 ring-white/5">
            <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              {stats.replies}
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 block font-bold">replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
