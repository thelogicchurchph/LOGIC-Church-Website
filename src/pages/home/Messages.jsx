import React from 'react';

const Messages = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 animate__animated animate__fadeIn">
      {/* Hero Section */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center z-10 relative">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 font-poppins">
            Sermons <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">& Messages</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Catch up on the latest teachings, powerful series, and spiritual discussions directly from The LOGIC Church.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
        
        {/* Main Video Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center">
              <span className="w-2 h-8 bg-red-600 rounded-full mr-4"></span>
              Latest Broadcast
            </h2>
          </div>
          
          <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative group">
            <iframe 
               width="100%" 
               height="100%" 
               src="https://www.youtube.com/embed/VnE_prPrko8" 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               allowFullScreen
               className="w-full h-full object-cover"
            ></iframe>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between hover:border-red-900/50 transition-colors duration-500">
            <div>
              <h3 className="text-2xl font-bold mb-2">Watch the Full Archive</h3>
              <p className="text-gray-400">Join our growing community and never miss a live stream.</p>
            </div>
            <a 
              href="https://youtube.com/@thelogicchurchportharcourt?si=jgA2Bj8UoiDgVUxJ" 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 sm:mt-0 px-8 py-4 bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold rounded-full transition-transform transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,0,0,0.3)] flex items-center"
            >
              Subscribe on YouTube
            </a>
          </div>
        </section>

        {/* Sidebar Podcast Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center">
              <span className="w-2 h-8 bg-green-500 rounded-full mr-4"></span>
              Audio Podcast
            </h2>
          </div>

          <div className="bg-[#111] rounded-2xl overflow-hidden shadow-xl border border-white/5">
            {/* Example Spotify Embed - Replace src with actual LOGIC Church playlist ID */}
            <iframe 
              style={{borderRadius: '12px'}} 
              src="https://open.spotify.com/embed/show/1c4BT5dABHj8HlPg3hexZ3?utm_source=generator" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-2xl"
            ></iframe>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-green-900/50 transition-colors duration-500 text-center">
            <h3 className="text-xl font-bold mb-2">Listen on the Go</h3>
            <p className="text-gray-400 text-sm mb-6">Stream our audio messages anytime, anywhere.</p>
            <a 
              href="https://open.spotify.com/show/1c4BT5dABHj8HlPg3hexZ3?si=c7b092d37ef9413c" 
              target="_blank" 
              rel="noreferrer"
              className="w-full block px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full transition-transform transform hover:-translate-y-1 shadow-[0_0_15px_rgba(29,185,84,0.3)]"
            >
              Follow on Spotify
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
export default Messages;
