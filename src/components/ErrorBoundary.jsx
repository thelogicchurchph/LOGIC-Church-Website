import React from 'react';
import { useRouteError } from 'react-router-dom';
import { WarningAmber } from '@mui/icons-material';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  // Handle Vite Dynamic Import Error (Chunk Load Error)
  if (error && error.message) {
    const msg = error.message.toLowerCase();
    if (msg.includes('dynamically imported module') || msg.includes('importing a module script failed')) {
      window.location.reload();
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="h-20 w-20 bg-red-600/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
        <WarningAmber className="text-red-500 text-4xl" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        {error?.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold tracking-widest text-sm uppercase"
      >
        Return Home
      </button>
    </div>
  );
}
