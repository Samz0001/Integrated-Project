import React from 'react';
import { MoveRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-800 to-blue-900">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-purple-700/50 to-blue-700/50 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="relative px-6 py-12 md:py-16 md:px-12">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                  Ready to Experience Music<br className="hidden md:block" /> That Understands You?
                </h2>
                <p className="text-xl text-gray-200 max-w-2xl">
                  Join thousands of users who have transformed their music experience with our emotion-based technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
                  Get Started Free
                  <MoveRight className="ml-2 h-5 w-5" />
                </button>
                <button className="px-8 py-4 bg-transparent border border-purple-300 hover:bg-purple-800/30 rounded-lg text-white font-medium transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;