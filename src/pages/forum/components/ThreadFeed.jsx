import React from 'react';
import { AccountCircle, Schedule, ArrowBack, Favorite } from '@mui/icons-material';
import { CATEGORY_COLORS } from '../constants';


import { Edit, DeleteOutline } from '@mui/icons-material';

export default function ThreadFeed({ questions, onSelectQuestion, formatTimestamp, onToggleAmen, loadingAmenId, user, onEdit, onDelete }) {
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
            className="group bg-transparent border-b border-white/5 last:border-0 p-5 sm:p-6 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer relative"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="hidden sm:flex flex-col items-center justify-center gap-1 w-12 flex-shrink-0 pt-1">
                 <div className="h-10 w-10 rounded-full bg-white/5 flex flex-col items-center justify-center group-hover:bg-white/10 transition-colors">
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
                    <Favorite className={`text-[12px] ${loadingAmenId === question.id ? 'animate-ping' : (question.hasAmened ? 'text-red-500' : (question.amens > 0 ? 'text-red-500/50' : ''))}`} />
                    <span>{question.amens || 0} {question.category === 'Prayer Wall' ? 'Amens' : ''}</span>
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-red-400 transition-colors mb-2 leading-tight">
                  {question.title}
                </h3>
                
                {question.body && (
                  <p className="text-gray-400 text-sm sm:text-base line-clamp-2 mb-4 leading-relaxed font-normal">
                    {question.body}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm text-gray-500">
                     <span className="font-semibold text-gray-300">{question.author?.firstName} {question.author?.lastName}</span>
                     <span className="opacity-40">•</span>
                     <span className="opacity-60">
                       {formatTimestamp(question.createdAt)}
                     </span>
                  </div>
                  
                  {user?.id === question.author?.id && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(question); }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit Post"
                      >
                        <Edit className="text-[18px]" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(question); }}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Post"
                      >
                        <DeleteOutline className="text-[18px]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
