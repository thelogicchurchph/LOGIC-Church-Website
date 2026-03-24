import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-8 animate__animated animate__fadeIn">
      <div className="max-w-4xl mx-auto pt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">Get in Touch</h1>
        <p className="text-gray-400 mb-12">We would love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea rows="5" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
