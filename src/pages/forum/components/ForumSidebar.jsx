import React from 'react';
import { ForumRounded, ChatBubbleOutline, FavoriteBorder, MenuBook, Campaign } from '@mui/icons-material';

const CATEGORIES = [
  { id: 'All', label: 'All Discussions', icon: ForumRounded, gradient: 'from-gray-500 to-gray-400' },
  { id: 'General', label: 'General', icon: ChatBubbleOutline, gradient: 'from-blue-500 to-cyan-400' },
  { id: 'Questions', label: 'Questions', icon: ChatBubbleOutline, gradient: 'from-teal-500 to-emerald-400' },
  { id: 'Prayer Wall', label: 'Prayer Wall', icon: FavoriteBorder, gradient: 'from-red-500 to-pink-500' },
  { id: 'Testimonies', label: 'Testimonies', icon: ForumRounded, gradient: 'from-green-500 to-emerald-400' },
  { id: 'Bible Study', label: 'Bible Study', icon: MenuBook, gradient: 'from-amber-500 to-orange-400' },
  { id: 'Announcements', label: 'Announcements', icon: Campaign, gradient: 'from-purple-500 to-indigo-400' },
];

export default function ForumSidebar({ currentCategory, setCurrentCategory, stats }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5">
        <h3 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
          <span className="w-1.5 h-5 bg-red-600 rounded-full"></span>
          Spaces
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

      <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5">
        <h3 className="font-bold mb-4 text-white text-sm">Community Pulse</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[#1a1a1a] rounded-xl text-center ring-1 ring-white/5">
            <span className="block text-xl font-black text-white">
              {stats.topics}
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1 block font-bold">topics</span>
          </div>
          <div className="p-3 bg-[#1a1a1a] rounded-xl text-center ring-1 ring-white/5">
            <span className="block text-xl font-black text-white">
              {stats.replies}
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-1 block font-bold">replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
