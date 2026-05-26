import { CalendarToday, AccessTime, LocationOn, Delete, Edit } from '@mui/icons-material';

const EventCard = ({ image, title, date, time, venue, onDelete, onEdit }) => {
  const imageUrl = image?.startsWith('http') ? image : `http://localhost:8000${image}`;

  return (
    <div className="group bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 relative">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-6 pr-8">
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
              className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-300 border border-white/10"
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
              className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-full transition-all duration-300 border border-red-500/20"
              title="Delete Event"
            >
              <Delete className="text-xl" />
            </button>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-3 text-gray-400">
            <CalendarToday className="text-gray-500 text-[18px]" />
            <span className="text-sm font-medium">{date}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <AccessTime className="text-gray-500 text-[18px]" />
            <span className="text-sm font-medium">{time}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <LocationOn className="text-gray-500 text-[18px]" />
            <span className="text-sm font-medium">{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;