import React from 'react';
import { Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const  navigate = useNavigate();
  return (
    <div className="pt-24 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Mood,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300"> Your Music</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light">
              Experience music that adapts to your emotions in real-time. Our advanced emotion detection technology matches your mood with the perfect soundtrack.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button  onClick={()=> navigate('/app')} className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-medium transition-all transform hover:scale-105 shadow-lg" >
                Try it now
              </button>
              <a
  href="https://github.com/Samz0001/Integrated-Project"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-8 py-4 bg-transparent border border-purple-300 hover:bg-purple-800/30 rounded-lg text-white font-medium transition-all text-center"
>
  Source Code
</a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-lg shadow-2xl border border-purple-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <Music className="h-12 w-12 text-purple-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">MoodMusic</h3>
                    <p className="text-purple-300">Smart Music for Every Emotion</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <p className="text-sm text-purple-300">When you're sad</p>
                    <p className="text-lg font-medium text-white">→ We play happy, uplifting music</p>
                  </div>
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <p className="text-sm text-purple-300">When you're angry</p>
                    <p className="text-lg font-medium text-white">→ We play calming, relaxing tracks</p>
                  </div>
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <p className="text-sm text-purple-300">When you're neutral</p>
                    <p className="text-lg font-medium text-white">→ We play motivational music</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;