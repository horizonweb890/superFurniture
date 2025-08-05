import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Bell, 
  MessageCircle, 
  User, 
  LogOut 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { 
      icon: <Bell className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition-colors" />, 
      notifications: 3,
      label: 'Notifications'
    },
    { 
      icon: <MessageCircle className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition-colors" />, 
      notifications: 5,
      label: 'Messages'
    }
  ];


  const logoutClick = () =>{
    // const value = localStorage.getItem('token')
    // console.log(value)
    const res = localStorage.clear('authToken');
    console.log(res)
    
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/dashboard" 
          className="text-2xl md:text-3xl font-bold text-yellow-400 flex items-center space-x-2 hover:text-yellow-300 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
          <span>Furniture</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className={`
          fixed inset-0 bg-gray-900 md:bg-transparent
          md:static md:flex md:items-center md:space-x-6
          transform transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:translate-x-0
          flex flex-col md:flex-row
          items-center
          z-50 md:z-auto
          pt-16 md:pt-0
          px-6 md:px-0
        `}>
          {/* Notification and Message Icons */}
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className="relative flex items-center cursor-pointer"
                aria-label={item.label}
              >
                {item.notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.notifications}
                  </span>
                )}
                {item.icon}
              </div>
            ))}
          </div>

          {/* User Profile and Logout */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-700 p-2 rounded-full">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <button 
                className="bg-yellow-500 text-black py-2 px-4 rounded-full 
                hover:bg-yellow-400 transition duration-200 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span onClick={logoutClick }>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40" 
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;