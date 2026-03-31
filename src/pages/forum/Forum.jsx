import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { removeCookie } from '../../api/cookies';
import { useAuth } from '../../context/AdminAuthContext';
import { Search, Add, ForumRounded, Logout } from '@mui/icons-material';
import { toast } from 'sonner';

import ForumSidebar from './components/ForumSidebar';
import ThreadFeed from './components/ThreadFeed';
import ThreadDetail from './components/ThreadDetail';
import CreateThreadModal from './components/CreateThreadModal';

export default function Forum() {
  const { user, setUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState('General');
  
  const [newAnswer, setNewAnswer] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [loading, setLoading] = useState({ page: false, submitQuestion: false, submitAnswer: false, amen: false });
  const [loadingAmenId, setLoadingAmenId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(prev => ({ ...prev, page: true }));
    try {
      const response = await api.get('/questions');
      const data = response.questions || response;
      setQuestions(data.map(q => ({ ...q, id: q.id || q._id })));
    } catch (err) {
      if (err.response?.status === 401) {
        removeCookie('token');
        navigate('/forum/login');
      }
    } finally {
      setLoading(prev => ({ ...prev, page: false }));
    }
  };

  const currentStats = useMemo(() => {
    return {
      topics: questions.length,
      replies: questions.reduce((acc, q) => acc + (q.comments?.length || 0), 0)
    };
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    let result = questions;
    if (currentCategory !== 'All') {
      result = result.filter(q => q.category === currentCategory);
    }
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(q => 
        q.title.toLowerCase().includes(lowerSearch) || 
        (q.body && q.body.toLowerCase().includes(lowerSearch))
      );
    }
    return result;
  }, [questions, searchTerm, currentCategory]);

  const handleLogout = () => {
    removeCookie('token');
    setUser(null);
    navigate('/forum/login');
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;
    
    setLoading(prev => ({ ...prev, submitQuestion: true }));
    setError(null);
    try {
      const response = await api.post('/questions', {
        title: newQuestionTitle,
        body: newQuestionBody,
        category: newQuestionCategory
      });
      const newQuestion = response.question || response;
      setQuestions(prev => [{ ...newQuestion, id: newQuestion.id || newQuestion._id }, ...prev]);
      setShowNewQuestionForm(false);
      setNewQuestionTitle('');
      setNewQuestionBody('');
      setNewQuestionCategory('General');
      toast.success('Conversation started!');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(prev => ({ ...prev, submitQuestion: false }));
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim() || !selectedQuestion) return;
    
    setLoading(prev => ({ ...prev, submitAnswer: true }));
    try {
      await api.post(`/questions/${selectedQuestion.id}/comment`, {
        body: newAnswer,
        parent_id: replyTo ? replyTo.id : null
      });
      
      const response = await api.get(`/questions/${selectedQuestion.id}`);
      const fullQuestion = response.question || response;
      setSelectedQuestion({ ...fullQuestion, id: fullQuestion.id || fullQuestion._id });
      
      setQuestions(prev => prev.map(q => q.id === selectedQuestion.id ? fullQuestion : q));
      
      setNewAnswer('');
      setReplyTo(null);
      // Wait a tick then scroll to bottom to see reply
      setTimeout(() => {
        document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      toast.success('Response posted!');
    } catch (err) {
      toast.error('Failed to post response');
    } finally {
      setLoading(prev => ({ ...prev, submitAnswer: false }));
    }
  };

  const handleToggleAmen = async (targetQuestion = selectedQuestion) => {
    if (!targetQuestion) return;
    setLoadingAmenId(targetQuestion.id);
    setLoading(prev => ({ ...prev, amen: true }));
    try {
      const response = await api.post(`/questions/${targetQuestion.id}/amen`);
      
      // Update local state without full refetch
      if (selectedQuestion?.id === targetQuestion.id) {
        setSelectedQuestion(prev => ({ ...prev, amens: response.amens }));
      }
      setQuestions(prevList => prevList.map(q => 
        q.id === targetQuestion.id ? { ...q, amens: response.amens } : q
      ));
      
      if(response.message.includes('added')) {
        toast.success(targetQuestion.category === 'Prayer Wall' ? "Amen! added" : "Liked!");
      }
    } catch(err) {
      toast.error("Failed to update reaction.");
    } finally {
      setLoading(prev => ({ ...prev, amen: false }));
      setLoadingAmenId(null);
    }
  };

  const handleViewQuestion = async (question) => {
    setLoading(prev => ({ ...prev, page: true }));
    try {
      const response = await api.get(`/questions/${question.id}`);
      const fullQuestion = response.question || response;
      setSelectedQuestion({ ...fullQuestion, id: fullQuestion.id || fullQuestion._id });
    } catch (err) {
      toast.error('Failed to load thread');
    } finally {
      setLoading(prev => ({ ...prev, page: false }));
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading.page && !user && questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[50%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/50 border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-red rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] cursor-pointer" onClick={() => navigate('/')}>
                <ForumRounded className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-none">
                  Logic Community
                </h1>
                <p className="text-sm font-bold text-red-500 uppercase tracking-widest mt-1">Church Online</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-black text-white px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 text-right w-full block">Member</span>
              </div>
              <button onClick={handleLogout} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-red-500 hover:text-red-400">
                <Logout />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {selectedQuestion ? (
          <ThreadDetail 
            question={selectedQuestion}
            onBack={() => { setSelectedQuestion(null); setReplyTo(null); }}
            formatTimestamp={formatTimestamp}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            newAnswer={newAnswer}
            setNewAnswer={setNewAnswer}
            onSubmitAnswer={handleSubmitAnswer}
            loadingAnswer={loading.submitAnswer}
            onToggleAmen={handleToggleAmen}
            loadingAmen={loading.amen}
          />
        ) : (
          <div className="animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
               <div className="relative flex-1 group">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 transition-colors" />
                 <input 
                   type="text"
                   placeholder="Search discussions, prayers, or study topics..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-[#0f0f0f] border border-white/5 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all text-white placeholder:text-gray-500"
                 />
               </div>
               <button
                 onClick={() => setShowNewQuestionForm(true)}
                 className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-4 md:py-0 rounded-2xl font-bold hover:bg-red-500 transition-all"
               >
                 <Add className="text-[20px]" />
                 <span>New Post</span>
               </button>
            </div>

            {/* Mobile Categories Overflow */}
            <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-4 hide-scrollbar">
              {['All', 'General', 'Questions', 'Prayer Wall', 'Testimonies', 'Bible Study', 'Youth', 'Announcements'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCurrentCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentCategory === cat 
                      ? 'bg-red-600 text-white' 
                      : 'bg-[#0f0f0f] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 hidden lg:block">
                <ForumSidebar 
                  currentCategory={currentCategory} 
                  setCurrentCategory={setCurrentCategory} 
                  stats={currentStats}
                />
              </div>
              <div className="lg:col-span-3">
                <ThreadFeed 
                  questions={filteredQuestions} 
                  onSelectQuestion={handleViewQuestion} 
                  formatTimestamp={formatTimestamp} 
                  onToggleAmen={handleToggleAmen}
                  loadingAmenId={loadingAmenId}
                />
              </div>
            </div>
          </div>
        )}

        {showNewQuestionForm && (
          <CreateThreadModal
            onClose={() => setShowNewQuestionForm(false)}
            onSubmit={handleSubmitQuestion}
            title={newQuestionTitle}
            setTitle={setNewQuestionTitle}
            body={newQuestionBody}
            setBody={setNewQuestionBody}
            category={newQuestionCategory}
            setCategory={setNewQuestionCategory}
            loading={loading.submitQuestion}
            error={error}
          />
        )}
      </main>
    </div>
  );
}