
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { removeCookie } from '../../api/cookies';
import { useAuth } from '../../context/AdminAuthContext';
import { 
  Search, 
  Add, 
  ForumRounded, 
  Logout, 
  ArrowBack, 
  Send,
  QuestionAnswer,
  AccountCircle,
  Schedule,
  Reply,
  SubdirectoryArrowRight
} from '@mui/icons-material';
import { toast } from 'sonner';

export default function Forum() {
  const { user, setUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [loading, setLoading] = useState({ page: false, question: null, submitQuestion: false, submitAnswer: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => ({ ...prev, page: true }));
      setError(null);
      
      try {
        const questionsResponse = await api.get('/questions');
        const questionsData = questionsResponse.questions || questionsResponse;
        const normalizedQuestions = questionsData.map(q => ({
          ...q,
          id: q.id || q._id
        }));
        setQuestions(normalizedQuestions);
      } catch (err) {
        console.error('Forum data fetch error:', err);
        const errorDetail = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to load forum data';
        setError(errorDetail);
        if (err.response?.status === 401) {
          removeCookie('token');
          navigate('/forum/login');
        }
      } finally {
        setLoading(prev => ({ ...prev, page: false }));
      }
    };
    
    fetchData();
  }, [navigate]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => 
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (q.body && q.body.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [questions, searchTerm]);

  const handleLogout = () => {
    removeCookie('token');
    setUser(null);
    navigate('/forum/login');
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (newQuestionTitle.trim()) {
      setLoading(prev => ({ ...prev, submitQuestion: true }));
      setError(null);
      
      try {
        const response = await api.post('/questions', {
          title: newQuestionTitle,
          body: newQuestionBody
        });
        const newQuestion = response.question || response;
        const normalizedQuestion = {
          ...newQuestion,
          id: newQuestion.id || newQuestion._id
        };
        setQuestions(prev => [normalizedQuestion, ...prev]);
        setNewQuestionTitle('');
        setNewQuestionBody('');
        setShowNewQuestionForm(false);
        toast.success('Discussion started!');
      } catch (err) {
        console.error('Question submission error:', err);
        setError(err.response?.data?.error || 'Failed to submit question');
      } finally {
        setLoading(prev => ({ ...prev, submitQuestion: false }));
      }
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() && selectedQuestion) {
      const questionId = selectedQuestion.id || selectedQuestion._id;
      setLoading(prev => ({ ...prev, submitAnswer: true }));
      setError(null);
      
      try {
        const response = await api.post(`/questions/${questionId}/comment`, {
          body: newAnswer,
          parent_id: replyTo ? replyTo.id : null
        });
        const newAnswerData = response.comment || response;
        
        // Refresh question to get full updated state including nested replies
        const updatedResponse = await api.get(`/questions/${questionId}`);
        const fullQuestion = updatedResponse.question || updatedResponse;
        setSelectedQuestion({
          ...fullQuestion,
          id: fullQuestion.id || fullQuestion._id
        });
        
        setNewAnswer('');
        setReplyTo(null);
        toast.success(replyTo ? 'Reply posted!' : 'Response posted!');
      } catch (err) {
        console.error('Answer submission error:', err);
        setError(err.response?.data?.error || 'Failed to submit answer');
      } finally {
        setLoading(prev => ({ ...prev, submitAnswer: false }));
      }
    }
  };

  const handleViewQuestion = async (question) => {
    const questionId = question.id || question._id;
    setLoading(prev => ({ ...prev, question: questionId }));
    setError(null);
    
    try {
      const response = await api.get(`/questions/${questionId}`);
      const fullQuestion = response.question || response;
      setSelectedQuestion({
        ...fullQuestion,
        id: fullQuestion.id || fullQuestion._id
      });
    } catch (err) {
      console.error('Question fetch error:', err);
      setError('Failed to load question details');
    } finally {
      setLoading(prev => ({ ...prev, question: null }));
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase();
  };

  // Improved Recursion for Comments
  const CommentItem = ({ comment, depth = 0 }) => (
    <div className={`group animate__animated animate__fadeIn relative ${depth > 0 ? 'ml-6 sm:ml-12 mt-4' : 'mt-8'}`}>
      {/* Thread Connector Line */}
      {depth > 0 && (
        <div className="absolute -left-6 sm:-left-12 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/50 to-transparent"></div>
      )}
      
      <div className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative shadow-2xl`}>
        <div className="flex items-start gap-4">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-semibold text-sm group-hover:from-red-900/50 group-hover:to-red-800/50 transition-all duration-500 shadow-lg ${depth > 0 ? 'scale-90' : ''}`}>
            {getInitials(comment.author?.firstName, comment.author?.lastName)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {depth > 0 && <SubdirectoryArrowRight className="text-red-500 text-sm opacity-50" />}
                <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                  {comment.author?.firstName} {comment.author?.lastName}
                </h4>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{formatTimestamp(comment.createdAt)}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base italic bg-white/5 p-3 rounded-xl border-l-2 border-red-600/20">
              {comment.body}
            </p>
            <div className="mt-4 flex justify-end">
               <button 
                  onClick={() => {
                    setReplyTo(comment);
                    document.getElementById('reply-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-lg bg-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-red-600/20 transition-all active:scale-95"
               >
                  <Reply className="text-xs" />
                  Reply to thread
               </button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {comment.replies && comment.replies.map(reply => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    </div>
  );

  if (loading.page && !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-red rounded-lg cursor-pointer" onClick={() => navigate('/')}>
                <ForumRounded className="text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Community Forum
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-white">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-gray-400">Contributor</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-red-500"
                title="Logout"
              >
                <Logout />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {selectedQuestion ? (
          /* Question Detail View */
          <div className="animate__animated animate__fadeIn">
            <button
              onClick={() => setSelectedQuestion(null)}
              className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowBack className="group-hover:-translate-x-1 transition-transform" />
              Back to feed
            </button>
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="flex items-start gap-4 mb-8">
                 <div className="h-12 w-12 rounded-2xl bg-gradient-red flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-red-500/20">
                    {getInitials(selectedQuestion.author?.firstName, selectedQuestion.author?.lastName)}
                 </div>
                 <div>
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
                       {selectedQuestion.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <AccountCircle className="text-xs" />
                        {selectedQuestion.author?.firstName} {selectedQuestion.author?.lastName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Schedule className="text-xs" />
                        {formatTimestamp(selectedQuestion.createdAt)}
                      </span>
                    </div>
                 </div>
              </div>

              {selectedQuestion.body && (
                <div className="bg-white/5 rounded-2xl p-6 mb-8 text-gray-200 leading-relaxed text-lg italic border-l-4 border-red-600">
                  "{selectedQuestion.body}"
                </div>
              )}
              
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <QuestionAnswer className="text-red-500" />
                  <h3 className="text-xl font-bold">
                    Responses
                  </h3>
                </div>
                
                {selectedQuestion.comments?.length > 0 ? (
                  <div className="space-y-6">
                    {selectedQuestion.comments.filter(c => !c.parent_id).map((comment) => (
                      <CommentItem key={comment.id || comment._id} comment={comment} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <div className="inline-flex p-4 rounded-full bg-red-900/20 text-red-500 mb-4">
                      <ForumRounded className="text-4xl" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">No conversations yet</h4>
                    <p className="text-gray-400">Be the first player to join this discussion!</p>
                  </div>
                )}
                
                {/* Answer Form */}
                <div className="mt-12 pt-8 border-t border-white/10" id="reply-form">
                  {replyTo && (
                    <div className="flex items-center justify-between bg-red-600/10 border border-red-600/20 rounded-xl px-4 py-2 mb-4 animate__animated animate__slideInDown">
                      <p className="text-xs text-red-400 font-bold">
                        Replying to {replyTo.author?.firstName}'s comment...
                      </p>
                      <button onClick={() => setReplyTo(null)} className="text-xs text-gray-500 hover:text-white">Cancel</button>
                    </div>
                  )}
                  <form onSubmit={handleSubmitAnswer} className="space-y-4">
                    <div className="relative group">
                      <textarea
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder={replyTo ? "Write your reply..." : "Join the conversation..."}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all placeholder:text-gray-600"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading.submitAnswer || !newAnswer.trim()}
                        className="flex items-center gap-2 bg-gradient-red text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg shadow-red-600/20"
                      >
                        {loading.submitAnswer ? 'Posting...' : (
                          <>
                            {replyTo ? 'Post Reply' : 'Post Response'}
                            <Send className="text-sm" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Questions List View */
          <div className="animate__animated animate__fadeIn">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
               <div className="relative flex-1 group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                 <input 
                   type="text"
                   placeholder="Search discussions, questions, or keywords..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all"
                 />
               </div>
               <button
                 onClick={() => setShowNewQuestionForm(true)}
                 className="flex items-center justify-center gap-2 bg-gradient-red text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-red-600/20 hover:scale-105 transition-all"
               >
                 <Add />
                 <span className="whitespace-nowrap">Start Discussion</span>
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                  Trending Discussions
                </h2>

                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <div 
                      key={question.id || question._id}
                      onClick={() => handleViewQuestion(question)}
                      className="group backdrop-blur-lg bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer relative overflow-hidden ring-1 ring-white/5 hover:ring-red-500/30"
                    >
                      <div className="flex items-start gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-gray-800 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-red-900/30 transition-colors border border-white/5">
                           <span className="text-lg font-bold text-white leading-none">
                            {question.comments?.length || 0}
                           </span>
                           <span className="text-[10px] text-gray-500 uppercase tracking-tighter">replies</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold leading-snug group-hover:text-red-400 transition-colors mb-3">
                            {question.title}
                          </h3>
                          {question.body && (
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                              {question.body}
                            </p>
                          )}
                          <div className="flex items-center flex-wrap gap-4 text-xs text-gray-500">
                             <span className="flex items-center gap-1">
                               <AccountCircle className="text-xs" />
                               {question.author?.firstName} {question.author?.lastName}
                             </span>
                             <span className="flex items-center gap-1">
                               <Schedule className="text-xs" />
                               {formatTimestamp(question.createdAt)}
                             </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                        <ArrowBack className="rotate-180 text-red-500" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                    <p className="text-gray-500">No discussions match your filter.</p>
                  </div>
                )}
              </div>

              {/* Sidebar: Community Stats */}
              <div className="hidden lg:block space-y-6">
                 <div className="backdrop-blur-xl bg-gradient-to-br from-red-600/20 to-transparent border border-white/10 rounded-[2rem] p-8">
                    <h3 className="text-lg font-bold mb-4">Forum Guidelines</h3>
                    <ul className="space-y-4 text-sm text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-red-500 font-bold">01.</span>
                        Be respectful and supportive to other members.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 font-bold">02.</span>
                        Keep discussions church-focused and constructive.
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 font-bold">03.</span>
                        No spamming or self-promotion.
                      </li>
                    </ul>
                 </div>

                 <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
                    <h3 className="font-bold mb-4">Community Pulse</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/40 rounded-2xl text-center">
                        <span className="block text-2xl font-black text-white">{questions.length}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">topics</span>
                      </div>
                      <div className="p-4 bg-black/40 rounded-2xl text-center">
                        <span className="block text-2xl font-black text-white">
                          {questions.reduce((acc, q) => acc + (q.comments?.length || 0), 0)}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">replies</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* New Question Form Modal */}
        {showNewQuestionForm && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-gray-950 border border-white/10 rounded-[2.5rem] w-full max-w-2xl p-8 sm:p-12 relative shadow-2xl overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-red"></div>
               
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-black">Ask the Community</h3>
                  <button 
                    onClick={() => setShowNewQuestionForm(false)}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all shadow-inner"
                  >
                    ×
                  </button>
               </div>
               
               <form onSubmit={handleSubmitQuestion} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={newQuestionTitle}
                      onChange={(e) => setNewQuestionTitle(e.target.value)}
                      placeholder="What's on your mind?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all font-bold text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      Context (Optional)
                    </label>
                    <textarea
                      value={newQuestionBody}
                      onChange={(e) => setNewQuestionBody(e.target.value)}
                      placeholder="Add more details to help others understand..."
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600"
                    />
                  </div>
                  
                  {error && <div className="text-red-500 text-sm font-bold bg-red-500/10 p-4 rounded-xl">{error}</div>}

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => setShowNewQuestionForm(false)}
                      className="flex-1 px-8 py-4 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading.submitQuestion || !newQuestionTitle.trim()}
                      className="flex-1 bg-gradient-red text-white py-4 rounded-2xl font-black shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {loading.submitQuestion ? 'Creating...' : 'Public Post'}
                    </button>
                  </div>
               </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}