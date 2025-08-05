import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarLinks = [
    {
      to: "/dashboard", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l4 4L10 9l5 5 7-7" />
        </svg>
      ),
      label: "Dashboard"
    },
    {
      to: "/items", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4v4m4-4H8" />
        </svg>
      ),
      label: "Items"
    },
    {
      to: "/contact", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18V3H3z" />
        </svg>
      ),
      label: "Contact"
    },
    {
      to: "/settings", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      ),
      label: "Settings"
    }
  ];


  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Items', icon: Globe, path: '/item'}, 
    { title: 'Contact', icon: Globe, path: '/contact'}, 
  ]

  return (
    <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
    )}

    <aside className={`
      fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
      lg:translate-x-0 lg:z-30
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-xl font-bold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 mt-16">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link to={item.path} className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 text-gray-700">
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  </>
  );
};

export default Sidebar;