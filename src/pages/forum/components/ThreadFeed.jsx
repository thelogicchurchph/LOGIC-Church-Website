import React from 'react';
import { AccountCircle, Schedule, ArrowBack, Favorite } from '@mui/icons-material';

const CATEGORY_COLORS = {
  'General': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Questions': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Prayer Wall': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Testimonies': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Bible Study': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Announcements': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function ThreadFeed({ questions, onSelectQuestion, formatTimestamp, onToggleAmen, loadingAmenId }) {
  if (questions.length === 0) {
    return (
      <div className="py-20 text-center bg-white/5 rounded-[2rem] border border-dashed border-white/10">
        <p className="text-gray-500">No discussions match your current filters.</p>
      </div>
    );
  }

  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
        <span className="w-2 h-8 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
        Recent Activity
      </h2>

      {questions.map((question) => {
        const catColor = CATEGORY_COLORS[question.category] || CATEGORY_COLORS['General'];
        
        return (
          <div 
            key={question.id}
            onClick={() => onSelectQuestion(question)}
            className="group bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 sm:p-5 hover:bg-white/5 transition-all duration-300 cursor-pointer relative ring-1 ring-white/5 hover:ring-white/10"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="hidden sm:flex flex-col items-center justify-center gap-1 w-12 flex-shrink-0">
                 <div className="h-10 w-10 rounded-xl bg-[#1a1a1a] border border-white/5 flex flex-col items-center justify-center group-hover:bg-[#222] transition-colors">
                    <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 leading-none">
                     {question.comments?.length || 0}
                    </span>
                 </div>
                 <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Replies</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${catColor}`}>
                    {question.category || 'General'}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleAmen(question); }}
                    disabled={loadingAmenId === question.id}
                    className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg transition-colors hover:scale-105 active:scale-95 disabled:opacity-50 ${question.category === 'Prayer Wall' ? 'bg-red-500/10 text-red-500 font-bold border border-red-500/20' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}
                  >
                    <Favorite className={`text-[12px] ${loadingAmenId === question.id ? 'animate-ping' : (question.amens > 0 ? 'text-red-500' : '')}`} />
                    <span>{question.amens || 0} {question.category === 'Prayer Wall' ? 'Amens' : ''}</span>
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-100 group-hover:text-red-400 transition-colors mb-2">
                  {question.title}
                </h3>
                
                {question.body && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {question.body}
                  </p>
                )}
                
                <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500">
                   <span className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-lg ring-1 ring-white/5">
                     <div className="h-5 w-5 bg-gradient-red rounded-md text-[9px] flex items-center justify-center text-white font-bold">
                       {getInitials(question.author?.firstName, question.author?.lastName)}
                     </div>
                     <span className="font-semibold text-gray-300 text-sm">{question.author?.firstName} {question.author?.lastName}</span>
                   </span>
                   <span className="flex items-center gap-1 opacity-60">
                     <Schedule className="text-[14px]" />
                     {formatTimestamp(question.createdAt)}
                   </span>
                </div>
              </div>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
              <ArrowBack className="rotate-180 text-red-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
