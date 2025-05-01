import React from 'react';
import { Camera, Brain, Music, Headphones } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="h-10 w-10" />,
    title: 'Capture',
    description: 'Our camera captures your facial expressions in real-time with complete privacy.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: 'Analyze',
    description: 'Advanced AI algorithms analyze your facial features to determine your current emotional state.',
    color: 'from-blue-400 to-purple-500'
  },
  {
    icon: <Music className="h-10 w-10" />,
    title: 'Match',
    description: 'We match your emotional state with the perfect music to either complement or enhance your mood.',
    color: 'from-indigo-400 to-blue-500'
  },
  {
    icon: <Headphones className="h-10 w-10" />,
    title: 'Experience',
    description: 'Enjoy a personalized music experience that adapts as your emotions change throughout the day.',
    color: 'from-pink-400 to-purple-500'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-800 via-blue-900 to-purple-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            MoodMusic uses cutting-edge technology to create a seamless emotional music experience. Here's how we do it:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 h-full flex flex-col items-center text-center transition-transform hover:transform hover:scale-105">
                <div className={`mb-6 p-4 rounded-full bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <svg className="w-6 h-6 text-purple-500 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;