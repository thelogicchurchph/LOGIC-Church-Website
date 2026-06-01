import { CalendarToday, AccessTime, LocationOn, Delete, Edit } from '@mui/icons-material';
import { getAssetUrl } from '../api/axios';

const EventCard = ({ image, title, date, time, venue, onDelete, onEdit }) => {
  const imageUrl = image?.startsWith('http') ? image : getAssetUrl(image);

  // Check if event is in the past
  const isPast = (() => {
    if (!date) return false;
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  })();

  return (
    <div className="group bg-[#111111] rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 relative">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        {isPast && (
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-gray-300 text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-widest z-10 border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            Past Event
          </div>
        )}
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isPast ? 'grayscale opacity-70' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="bg-[#111111] p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-4 pr-8">
          {title}
        </h3>

        {/* Action Buttons (Admin Only) */}
        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onEdit && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20"
              title="Edit Event"
            >
              <Edit className="text-xl" />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-full transition-all duration-300 border border-red-500/30"
              title="Delete Event"
            >
              <Delete className="text-xl" />
            </button>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarToday style={{ color: '#ef4444', fontSize: '18px' }} />
            <span className="text-sm font-medium" style={{ color: '#e5e7eb' }}>{date}</span>
          </div>
          <div className="flex items-center gap-3">
            <AccessTime style={{ color: '#ef4444', fontSize: '18px' }} />
            <span className="text-sm font-medium" style={{ color: '#e5e7eb' }}>{time}</span>
          </div>
          <div className="flex items-center gap-3">
            <LocationOn style={{ color: '#ef4444', fontSize: '18px' }} />
            <span className="text-sm font-medium" style={{ color: '#e5e7eb' }}>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;