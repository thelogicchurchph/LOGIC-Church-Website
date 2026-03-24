import React from 'react';

export default function Preloader() {
  // A more thematic preloader for a church website, featuring an animated cross and typing text.
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div className="relative h-16 w-16" role="status" aria-label="Loading">
        {/* Vertical bar of the cross */}
        <div className="preloader-cross-bar absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 rounded-full"></div>
        {/* Horizontal bar of the cross */}
        <div className="preloader-cross-bar absolute top-1/2 left-0 h-3 w-full -translate-y-1/2 rounded-full"></div>
      </div>
      {/* Animated typing text */}
      <div className="mt-8 overflow-hidden">
        <h1 className="preloader-text text-2xl font-semibold tracking-wider text-white">The Logic Church</h1>
      </div>
    </div>
  );
}