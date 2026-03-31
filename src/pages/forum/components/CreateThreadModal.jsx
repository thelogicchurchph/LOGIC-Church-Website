import React from 'react';

const CATEGORIES = ['General', 'Questions', 'Prayer Wall', 'Testimonies', 'Bible Study', 'Youth', 'Announcements'];

export default function CreateThreadModal({ 
  onClose, 
  onSubmit, 
  title, setTitle, 
  body, setBody, 
  category, setCategory, 
  loading, error 
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
      <div className="bg-gray-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl p-8 sm:p-12 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-red"></div>
         
         <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-black text-white">Create Post</h3>
            <button 
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all shadow-inner"
            >
              ×
            </button>
         </div>
         
         <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Category Space
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      category === cat 
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 ring-2 ring-red-500' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 ring-1 ring-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={category === 'Prayer Wall' ? 'Your prayer request...' : "What's on your mind?"}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all font-bold text-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
                Details (Optional)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Expand on your thoughts..."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/10 transition-all resize-none text-white placeholder:text-gray-600"
              />
            </div>
            
            {error && <div className="text-red-500 text-sm font-bold bg-red-500/10 p-4 rounded-xl">{error}</div>}

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-8 py-4 bg-white/5 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !title.trim() || !category}
                className="flex-1 bg-gradient-red text-white py-4 rounded-2xl font-black shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : 'Post'}
              </button>
            </div>
         </form>
      </div>
    </div>
  );
}
