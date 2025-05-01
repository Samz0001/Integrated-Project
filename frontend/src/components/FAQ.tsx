import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate is the emotion detection?',
    answer: 'Our emotion‐detection engine focuses on four core states—happy, sad, angry and neutral—so it stays sharp and reliable. Behind the scenes, it’s powered by advanced neural networks trained on thousands of real-world faces, learning your personal expressions over time to steadily refine its guesses.'
  },
  {
    question: 'Is my privacy protected when using the camera?',
    answer: 'Absolutely. Your privacy is our top priority. All facial analysis happens locally on your device—no images or videos are ever uploaded to our servers. The emotion data is processed anonymously and is never linked to your personal information.'
  },
  {
    question: 'What music libraries does MoodMusic support?',
    answer: 'Right now, MoodMusic only taps into YouTube’s API to find tracks that match your mood. We analyze each video’s audio and metadata to pick songs that feel just right—happy, sad, angry or neutral. Support for Spotify, Apple Music, Amazon Music and your own local library is on our roadmap, so stay tuned!.'
  },
  {
    question: 'Can I customize which emotions trigger specific types of music?',
    answer: 'Yes! While our default settings are based on research in music psychology (sad→happy music, angry→calm music, neutral→motivational music), you can fully customize these mappings in your profile settings to create your personal emotion-music pairings.'
  },
  
 
];

const FAQItem: React.FC<{
  question: string;
  answer: string;
}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-purple-800/50 last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left hover:bg-white/5 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-purple-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-purple-400" />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5 px-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Got questions about MoodMusic? We've got answers.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg border border-white/10">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;