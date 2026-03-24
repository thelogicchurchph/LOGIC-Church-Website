import React, { useState, useEffect } from 'react';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';
import 'animate.css';
import EventCard from '../../components/EventCard';
import api, { getAssetUrl } from '../../api/axios';

export default function EventsHome() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 animate__animated animate__fadeInUp text-white">
            Upcoming{' '}
            <span className="bg-gradient-red bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            Join us for these upcoming gatherings and activities
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             <div className="col-span-full flex justify-center py-12">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
             </div>
          ) : (
            <>
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
              {events.length === 0 && (
                <p className="text-gray-500 col-span-full text-center py-12">No upcoming events at the moment. Stay tuned!</p>
              )}
            </>
          )}
        </div>

        {/* Explore More Button */}
        <div className="text-center mt-16">
          <a
            href="/events"
            className="inline-flex items-center px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
}
