import React from 'react';
import { AccountCircle, Schedule, ArrowBack, Favorite } from '@mui/icons-material';

const CATEGORY_COLORS = {
  'General': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Prayer Wall': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Testimonies': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Bible Study': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Announcements': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export default function ThreadFeed({ questions, onSelectQuestion, formatTimestamp }) {
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
            className="group backdrop-blur-lg bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer relative overflow-hidden ring-1 ring-white/5 hover:ring-red-500/30"
          >
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="hidden sm:flex flex-col items-center justify-center gap-1 w-16 flex-shrink-0">
                 <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex flex-col items-center justify-center shadow-inner group-hover:from-red-900/40 group-hover:to-red-800/20 transition-all">
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
                  {question.category === 'Prayer Wall' && (
                    <div className="flex items-center gap-1 text-xs text-red-400/80 bg-red-500/10 px-2 py-1 rounded-lg ring-1 ring-red-500/20">
                      <Favorite className="text-[12px]" />
                      <span className="font-bold">{question.amens || 0} Amens</span>
                    </div>
                  )}
                  {question.category !== 'Prayer Wall' && question.amens > 0 && (
                    <div className="flex items-center gap-1 text-xs text-red-400/80 bg-red-500/10 px-2 py-1 rounded-lg">
                      <Favorite className="text-[10px]" />
                      <span className="font-bold">{question.amens}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-red-400 transition-colors mb-2">
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
