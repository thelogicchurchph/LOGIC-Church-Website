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
    <div className={`group animate__animated animate__fadeIn relative ${depth > 0 ? 'ml-6 sm:ml-12 mt-4' : 'mt-8'}`}>
      {depth > 0 && <div className="absolute -left-6 sm:-left-12 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/50 to-transparent"></div>}
      <div className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative shadow-2xl`}>
        <div className="flex items-start gap-4">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-semibold text-sm shadow-lg ${depth > 0 ? 'scale-90' : ''}`}>
            {getInitials(comment.author?.firstName, comment.author?.lastName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-2">
                {depth > 0 && <SubdirectoryArrowRight className="text-red-500 text-sm opacity-50" />}
                <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                  {comment.author?.firstName} {comment.author?.lastName}
                </h4>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 block">{formatTimestamp(comment.createdAt)}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base italic bg-white/5 p-4 rounded-xl border-l-2 border-red-600/20">
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
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-xl hover:bg-white/5 font-bold uppercase tracking-widest text-xs">
        <ArrowBack className="group-hover:-translate-x-1 transition-transform" /> Back to Spaces
      </button>
      
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative corner blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-red opacity-10 rounded-bl-[100px] pointer-events-none blur-3xl"></div>
        
        <div className="flex items-start gap-4 mb-8 relative z-10 flex-col sm:flex-row">
           <div className="h-14 w-14 rounded-2xl bg-gradient-red flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              {getInitials(question.author?.firstName, question.author?.lastName)}
           </div>
           <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-3 text-white">
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
          <div className="bg-white/5 rounded-2xl p-6 mb-8 text-gray-200 leading-relaxed text-lg italic border-l-4 border-red-600 shadow-inner">
            "{question.body}"
          </div>
        )}

        <div className="flex items-center gap-4 border-b border-white/10 pb-8 mb-8">
           <button 
             onClick={onToggleAmen}
             disabled={loadingAmen}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all disabled:opacity-50
               ${isPrayer ? 'bg-red-600/20 text-red-500 hover:bg-red-600/30 ring-1 ring-red-500/50 shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
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
            <div className="py-16 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
              <div className="inline-flex p-4 rounded-full bg-red-900/20 text-red-500 mb-4 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                <ForumRounded className="text-4xl" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">No responses yet</h4>
              <p className="text-gray-400">Be the first to join this space!</p>
            </div>
          )}
          
          <div className="mt-12 pt-8 border-t border-white/10" id="reply-form">
            {replyTo && (
              <div className="flex items-center justify-between bg-red-600/10 border border-red-600/20 rounded-xl px-4 py-3 mb-4 animate__animated animate__slideInDown text-red-400">
                <p className="text-xs font-bold uppercase tracking-wide">Replying to {replyTo.author?.firstName}'s thought...</p>
                <button onClick={() => setReplyTo(null)} className="text-[10px] text-gray-500 hover:text-white font-black uppercase p-2 bg-white/5 rounded-lg border border-white/10">Cancel Reply</button>
              </div>
            )}
            <form onSubmit={onSubmitAnswer} className="space-y-4">
              <div className="relative group">
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder={replyTo ? "Contribute to this thought..." : "Share your insight..."}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-5 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all placeholder:text-gray-600 text-white font-medium"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loadingAnswer || !newAnswer.trim()}
                  className="flex items-center gap-2 bg-gradient-red text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  {loadingAnswer ? <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div> : (
                    <>{replyTo ? 'Publish Reply' : 'Publish Response'}<Send className="text-[16px]" /></>
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
