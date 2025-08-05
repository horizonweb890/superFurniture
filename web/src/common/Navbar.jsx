import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.75 9 11 5.16-1.25 9-5.45 9-11V7l-10-5z" />
                    <path d="M8 11h8v2H8v-2z" />
                    <path d="M8 15h8v2H8v-2z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent tracking-tight leading-none">
                  SUPER
                </span>
                <span className="text-lg font-bold text-gray-300 tracking-wider leading-none -mt-1">
                  FURNITURE
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="relative text-gray-300 hover:text-amber-400 font-medium transition-colors duration-300 group"
            >
              <span>Home</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/products"
              className="relative text-gray-300 hover:text-amber-400 font-medium transition-colors duration-300 group"
            >
              <span>Products</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/about"
              className="relative text-gray-300 hover:text-amber-400 font-medium transition-colors duration-300 group"
            >
              <span>About Us</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              to="/contact"
              className="relative text-gray-300 hover:text-amber-400 font-medium transition-colors duration-300 group"
            >
              <span>Contact</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-amber-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                // Close icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/50 rounded-lg mt-2 backdrop-blur-sm">
            <Link
              to="/"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
