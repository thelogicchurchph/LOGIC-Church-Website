import React from 'react';
import { ArrowBack, AccountCircle, Schedule, QuestionAnswer, Reply, SubdirectoryArrowRight, Favorite, Send, ForumRounded } from '@mui/icons-material';

const CommentItem = ({ comment, depth = 0, setReplyTo }) => {
  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase();
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`group relative ${depth > 0 ? 'ml-4 sm:ml-8 mt-4' : 'mt-6'}`}>
      {depth > 0 && <div className="absolute -left-4 sm:-left-8 top-0 bottom-0 w-px bg-white/10"></div>}
      <div className={`bg-[#0f0f0f] border border-white/5 rounded-2xl p-4 hover:bg-white/5 transition-all duration-300 relative`}>
        <div className="flex items-start gap-3">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-semibold text-sm shadow-lg ${depth > 0 ? 'scale-90' : ''}`}>
            {getInitials(comment.author?.firstName, comment.author?.lastName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-2">
                {depth > 0 && <SubdirectoryArrowRight className="text-red-500 text-sm opacity-50" />}
                <h4 className="font-bold text-gray-200 text-sm">
                  {comment.author?.firstName} {comment.author?.lastName}
                </h4>
              </div>
              <span className="text-[10px] text-gray-500 block">{formatTimestamp(comment.createdAt)}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base bg-[#151515] p-3 rounded-xl">
              {comment.body}
            </p>
            <div className="mt-4 flex justify-end">
               <button 
                  onClick={() => {
                    setReplyTo(comment);
                    document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-lg bg-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-red-600/20 transition-all active:scale-95 ring-1 ring-white/5"
               >
                  <Reply className="text-[16px]" /> Reply here
               </button>
            </div>
          </div>
        </div>
      </div>
      {(comment.replies && comment.replies.length > 0) && (
        <div className="space-y-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} setReplyTo={setReplyTo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ThreadDetail({ 
  question, 
  onBack, 
  formatTimestamp, 
  replyTo, setReplyTo, 
  newAnswer, setNewAnswer, 
  onSubmitAnswer, loadingAnswer,
  onToggleAmen,
  loadingAmen
}) {
  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase();
  };

  const isPrayer = question.category === 'Prayer Wall';

  return (
    <div className="animate__animated animate__fadeIn">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-xl hover:bg-white/5 text-sm font-medium">
        <ArrowBack className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>
      
      <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        
        <div className="flex items-start gap-4 mb-6 relative z-10 flex-col sm:flex-row">
           <div className="h-12 w-12 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500 font-bold text-lg flex-shrink-0">
              {getInitials(question.author?.firstName, question.author?.lastName)}
           </div>
           <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-3 text-white">
                 {question.title}
              </h2>
              <div className="flex items-center flex-wrap gap-4 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 ring-1 ring-white/10">
                  <AccountCircle className="text-[14px]" />
                  {question.author?.firstName} {question.author?.lastName}
                </span>
                <span className="flex items-center gap-1.5 opacity-80">
                  <Schedule className="text-[14px]" />
                  {formatTimestamp(question.createdAt)}
                </span>
                <span className="px-3 py-1 rounded-lg bg-red-600/20 text-red-400 font-bold ring-1 ring-red-500/30">
                  {question.category || 'General'}
                </span>
              </div>
           </div>
        </div>

        {question.body && (
          <div className="bg-[#151515] rounded-xl p-5 mb-6 text-gray-300 leading-relaxed text-base border-l-2 border-red-600">
            {question.body}
          </div>
        )}

        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
           <button 
             onClick={onToggleAmen}
             disabled={loadingAmen}
             className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-50 text-sm
               ${isPrayer ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
           >
             <Favorite className={loadingAmen ? "animate-ping" : ""} />
             <span>{question.amens || 0} {isPrayer ? 'Amens' : 'Likes'}</span>
           </button>
        </div>
        
        <div className="space-y-8 mt-12">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <QuestionAnswer className="text-red-500" />
            <h3 className="text-xl font-bold text-white">Discussion</h3>
          </div>
          
          {question.comments?.length > 0 ? (
            <div className="space-y-6">
              {question.comments.filter(c => !c.parent_id).map((comment) => (
                <CommentItem key={comment.id} comment={comment} setReplyTo={setReplyTo} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-[#151515] rounded-2xl border border-dashed border-white/5">
              <div className="inline-flex p-3 rounded-full bg-white/5 text-gray-500 mb-3">
                <ForumRounded className="text-3xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-300 mb-1">No replies yet</h4>
              <p className="text-gray-500 text-sm">Be the first to reply!</p>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-white/5" id="reply-form">
            {replyTo && (
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 text-gray-300">
                <p className="text-sm font-medium">Replying to {replyTo.author?.firstName}</p>
                <button onClick={() => setReplyTo(null)} className="text-xs text-gray-400 hover:text-white font-medium p-1">Cancel</button>
              </div>
            )}
            <form onSubmit={onSubmitAnswer} className="space-y-3">
              <div className="relative group">
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder={replyTo ? "Write a reply..." : "Write a response..."}
                  rows={3}
                  className="w-full bg-[#151515] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600 text-white text-base"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loadingAnswer || !newAnswer.trim()}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all hover:bg-red-500 active:scale-95 disabled:opacity-50 text-sm"
                >
                  {loadingAnswer ? <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div> : (
                    <>{replyTo ? 'Reply' : 'Post'}<Send className="text-[14px]" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
