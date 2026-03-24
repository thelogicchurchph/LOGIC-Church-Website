// Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AdminAuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Image as ImageIcon,
  MessageSquare,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard size={18} />,
      adminOnly: false
    },
    { 
      name: 'Events', 
      path: '/admin/events', 
      icon: <Calendar size={18} />,
      adminOnly: false
    },
    { 
      name: 'Gallery', 
      path: '/admin/gallery', 
      icon: <ImageIcon size={18} />,
      adminOnly: false
    },
    { 
      name: 'Messages', 
      path: '/admin/posts', // Assuming posts is where messages are managed, or maybe it needs a new path.
      icon: <MessageSquare size={18} />,
      adminOnly: true
    },
    { 
      name: 'Admins', 
      path: '/admin/admins', 
      icon: <Users size={18} />,
      adminOnly: true
    },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white border-r border-gray-800 overflow-y-auto z-10 pt-16">
      <nav className="p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-center w-6">
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
          
          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <span className="flex items-center justify-center w-6">
                <LogOut size={18} />
              </span>
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;