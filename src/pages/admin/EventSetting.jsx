import React, { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard';
import CreateEventModal from './CreateEventModal';
import EditEventModal from './EditEventModal';
import api, { getAssetUrl } from '../../api/axios';
import { toast } from 'sonner';

const EventSetting = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await api.get('/events');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await api.delete(`/events/${eventId}`);
      setEvents(events.filter(e => e.id !== eventId));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const handleCreateEvent = async (newEvent) => {
    try {
      let imageUrl = "/assets/default-event.jpg";
      
      if (newEvent.image) {
        const formData = new FormData();
        formData.append('file', newEvent.image);
        
        const uploadResponse = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = uploadResponse.url;
      }
      
      const payload = {
        ...newEvent,
        image_url: imageUrl
      };
      
      const createdEvent = await api.post('/events', payload);
      setEvents([createdEvent, ...events]);
      toast.success('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
    }
  };

  const [editingEvent, setEditingEvent] = useState(null);

  const handleUpdateEvent = async (eventId, updatedData) => {
    try {
      let imageUrl = updatedData.image_url;
      
      if (updatedData.image) {
        const formData = new FormData();
        formData.append('file', updatedData.image);
        
        const uploadResponse = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = uploadResponse.url;
      }
      
      const payload = {
        title: updatedData.title,
        date: updatedData.date,
        time: updatedData.time,
        venue: updatedData.venue,
        recurring: updatedData.recurring,
        image_url: imageUrl
      };
      
      const response = await api.put(`/events/${eventId}`, payload);
      setEvents(events.map(e => e.id === eventId ? response : e));
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Event Settings</h1>
      <p className="text-gray-300 mb-6">Configure events, schedules, and details here.</p>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
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
              onDelete={() => handleDeleteEvent(event.id)}
              onEdit={() => setEditingEvent(event)}
            />
          ))}
          {events.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-12">No events found. Create one below!</p>
          )}
        </div>
      )}
      
      <button 
        onClick={openModal}
        className="mt-8 bg-gradient-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Create New Event
      </button>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleCreateEvent}
      />

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdate={handleUpdateEvent}
        />
      )}
    </div>
  );
};

export default EventSetting;