import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Yoga Instructor',
    content: 'MoodMusic has completely transformed my yoga sessions. The app detects the collective energy in the room and adjusts the music accordingly, creating the perfect atmosphere for my clients.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    content: 'As someone who works long hours coding, MoodMusic helps me stay focused and calm. When it detects I\'m getting frustrated, it switches to relaxing tracks that help me reset my mindset.',
    rating: 5
  },
  {
    name: 'Aisha Patel',
    role: 'College Student',
    content: 'Studying for finals became so much easier with MoodMusic! The app detects when I\'m feeling stressed and plays motivational music that keeps me going through those long study sessions.',
    rating: 4
  },
  {
    name: 'David Wilson',
    role: 'Fitness Trainer',
    content: 'I\'ve integrated MoodMusic into my personal training sessions. It\'s amazing how the app picks up on my clients\' emotional states and plays energizing music when they need that extra push.',
    rating: 5
  }
];

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  content: string;
  rating: number;
}> = ({ name, role, content, rating }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 transition-all hover:bg-white/10">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
          />
        ))}
      </div>
      <p className="text-gray-300 mb-6 italic">"{content}"</p>
      <div className="flex items-center">
        <div className="mr-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-purple-300 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how MoodMusic has transformed the way people experience music in their daily lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;