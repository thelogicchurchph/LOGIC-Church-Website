import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Close, ExpandMore } from '@mui/icons-material';
import logoImage from '/assets/image.webp';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(
    window.location.pathname.startsWith('/trainings') ? 'Training' : 'Home'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event', href: '/events' },
    { name: 'Sermons', href: '/messages' },
    { name: 'Give', href: '/give' },
    { 
      name: 'Training', 
      href: '/trainings',
      dropdown: [
        { name: 'LOGIC Foundation class', href: '/trainings/lfc' },
        { name: 'LOGIC Discipleship class', href: '/trainings/ldc' },
      ]
    },
    { name: 'Talk 2 PPC', href: '/talk-2-ppc' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTrainingDropdown = () => {
    setIsTrainingDropdownOpen(!isTrainingDropdownOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  // Set active link based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/trainings')) {
      setActiveLink('Training');
    } else {
      const currentLink = navLinks.find(link => link.href === path);
      if (currentLink) {
        setActiveLink(currentLink.name);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`z-50 w-full px-4 fixed py-4 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src={logoImage} 
            alt="LOGIC Church Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.dropdown && setIsTrainingDropdownOpen(true)}
              onMouseLeave={() => link.dropdown && setIsTrainingDropdownOpen(false)}
              data-active={activeLink === link.name || (link.name === 'Training' && window.location.pathname.startsWith('/trainings'))}
            >
              {link.dropdown ? (
                <div className="relative">
                  <button
                    onClick={() => { handleLinkClick(link.name); navigate(link.href); }}
                    className={`relative flex items-center gap-1 px-4 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-white' : 'text-white'
                    }`}
                  >
                    {link.name}
                    <ExpandMore className="text-sm" />
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-red transition-all duration-300 ${
                      activeLink === link.name || (link.name === 'Training' && window.location.pathname.startsWith('/trainings')) ? 'w-full' : 'w-0'
                    }`}></span>
                  </button>
                  {isTrainingDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-64">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {link.dropdown.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                              `block px-4 py-3 text-sm transition-colors duration-200 ${
                                isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                              }`
                            }
                            onClick={() => handleLinkClick(item.name)}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`relative px-4 py-2 font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-red transition-all duration-300 ${
                    activeLink === link.name ? 'w-full' : 'w-0'
                  }`}></span>
                </NavLink>
              )}
            </div>
          ))}
          
          {/* Join Our Forum Button */}
          <NavLink 
            to="/forum" 
            className="bg-gradient-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Join Conversation
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-lg hover:backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <Close className="text-2xl" /> : <Menu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full mt-2 px-4">
          <div className="backdrop-blur-md bg-black/50 rounded-lg border border-white/20 shadow-xl">
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={toggleTrainingDropdown}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                          activeLink === link.name || (link.name === 'Training' && location.pathname.startsWith('/trainings'))
                            ? 'border border-red-500 backdrop-blur-sm bg-white/10' 
                            : 'hover:backdrop-blur-sm hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                        <ExpandMore className={`text-sm transition-transform duration-200 ${isTrainingDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isTrainingDropdownOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {link.dropdown.map((item) => (
                            <NavLink
                              key={item.name}
                              to={item.href}
                              className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                                  isActive ? 'bg-white/20 text-white font-semibold' : 'text-white hover:bg-white/10'
                                }`
                              }
                              onClick={() => handleLinkClick(item.name)}
                            >
                              {item.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={link.href}
                      onClick={() => handleLinkClick(link.name)}
                      className={`block px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                        activeLink === link.name 
                          ? 'border border-red-500 backdrop-blur-sm bg-white/10' 
                          : 'hover:backdrop-blur-sm hover:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
              

              <NavLink 
                to="/forum" 
                className="block w-full text-center bg-gradient-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
                onClick={() => handleLinkClick('Forum')}
              >
                       Join Conversation
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
