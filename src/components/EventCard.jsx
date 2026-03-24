import React from 'react';
import { CalendarToday, AccessTime, LocationOn, Delete } from '@mui/icons-material';

const EventCard = ({ image, title, date, time, venue, onDelete }) => {
  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 animate__animated animate__fadeInUp">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={image.startsWith('http') || image.startsWith('data:') ? image : `http://localhost:8000${image}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-6 group-hover:bg-gradient-red group-hover:bg-clip-text transition-all duration-300 pr-8">
          {title}
        </h3>

        {/* Delete Button (Admin Only) */}
        {onDelete && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-6 right-6 p-2 bg-red-600/20 hover:bg-red-600/80 text-red-500 hover:text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-red-600/30"
            title="Delete Event"
          >
            <Delete className="text-xl" />
          </button>
        )}

        {/* Event Details */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <CalendarToday className="text-red-400 text-lg" />
            </div>
            <span className="text-sm font-medium">{date}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <AccessTime className="text-blue-400 text-lg" />
            </div>
            <span className="text-sm font-medium">{time}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <LocationOn className="text-green-400 text-lg" />
            </div>
            <span className="text-sm font-medium">{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;