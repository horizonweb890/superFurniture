import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Settings, Users, BarChart2, MessageSquare, Globe, MapPin } from "lucide-react";

const menuItems = [

  { title: 'DashBoard', icon: Home, path: '/dashboard' },
  { title: 'Items', icon: MessageSquare, path: '/items' },
  { title: 'Contact', icon: Globe, path: '/contact' },  
  { title: 'Category', icon: MapPin, path: '/category' }         
];

export const MainSidebar = ({ isOpen, onClose }) => {
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
