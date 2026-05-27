import React, { useState, useEffect } from 'react';
import 'animate.css';
import EventCard from '../../components/EventCard';
import api, { getAssetUrl } from '../../api/axios';
import useSEO from '../../hooks/useSEO';

export default function EventsPage() {
  useSEO("Events", "Upcoming events, gatherings, and special services at LOGIC Church Port Harcourt.");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.get('/events');
        setEvents(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[50vh] bg-black">
        <div className="absolute inset-0">
          {/* Subtle gradient background instead of heavy image to keep it clean */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-gray-900" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center text-center h-full">
          <div className="animate__animated animate__fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 text-white text-sm font-medium border border-white/20">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
            Calendar
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight animate__animated animate__fadeInUp animate__delay-1s text-white">
            Upcoming <span className="text-red-500">Events</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-300 animate__animated animate__fadeInUp animate__delay-2s">
            Join us for powerful gatherings, community fellowships, and life-transforming sessions.
          </p>
        </div>
      </section>

      {/* ── Events Grid ─────────────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            <p className="text-gray-500 font-medium">Loading upcoming events...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center py-20 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Failed to load events</h3>
            <p className="text-gray-500 max-w-md mx-auto">We encountered a temporary issue while fetching the calendar. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 space-y-4 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Upcoming Events</h3>
            <p className="text-gray-500 max-w-md mx-auto">We don't have any special events scheduled right now. Join us for our regular Sunday services!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard
                key={event.id || index}
                image={event.image_url ? getAssetUrl(event.image_url) : "/assets/default-event.jpg"}
                title={event.title}
                date={event.date}
                time={event.time}
                venue={event.venue}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
