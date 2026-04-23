import { CalendarToday, AccessTime, LocationOn, Delete, Edit } from '@mui/icons-material';

const EventCard = ({ image, title, date, time, venue, onDelete, onEdit }) => {
  const imageUrl = image?.startsWith('http') ? image : `http://localhost:8000${image}`;

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 animate__animated animate__fadeInUp relative">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={imageUrl}
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

        {/* Action Buttons (Admin Only) */}
        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onEdit && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 bg-blue-600/20 hover:bg-blue-600/80 text-blue-400 hover:text-white rounded-full transition-all duration-300 backdrop-blur-md border border-blue-600/30"
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
              className="p-2 bg-red-600/20 hover:bg-red-600/80 text-red-500 hover:text-white rounded-full transition-all duration-300 backdrop-blur-md border border-red-600/30"
              title="Delete Event"
            >
              <Delete className="text-xl" />
            </button>
          )}
        </div>

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