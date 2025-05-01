import React from 'react';
import { Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavbarTwo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-90 backdrop-blur-sm transition-all duration-300 shadow-sm bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Music className="h-8 w-8 text-purple-300" />
            <span className="ml-2 text-2xl font-bold text-white">MoodMusic</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
             
              <a href="#how-it-works" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                How It Works
              </a>
              
              <a href="#faq" className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                FAQ
              </a>
              <button
              onClick={() => navigate('/app')}
              className="ml-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Get Started
            </button>
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-gray-200 hover:text-white">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTwo;