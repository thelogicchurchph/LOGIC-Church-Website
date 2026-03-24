import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'sonner';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch all forum posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/questions');
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Could not connect to the server to fetch posts.');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/questions/${postId}`);
      setPosts(posts.filter(post => (post.id || post._id) !== postId));
      setConfirmDelete(null);
      toast.success('Post deleted successfully');
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Forum Posts</h1>
        <p className="text-gray-400 mt-2">
          Manage all forum posts and comments.
        </p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400">No posts found.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id || post._id} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 text-gray-300">{post.body}</p>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span>Posted by: {post.author?.firstName} {post.author?.lastName}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <button
                      onClick={() => setConfirmDelete(post.id || post._id)}
                      className="text-red-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-full"
                      title="Delete post"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {confirmDelete === (post.id || post._id) && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg animate__animated animate__fadeIn">
                    <p className="text-gray-300 mb-3">Are you sure you want to delete this post? This action cannot be undone.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeletePost(post.id || post._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
