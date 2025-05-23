import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import NavbarTwo from './components/NavbarTwo';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <NavbarTwo />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
xl    </div>
  );
}

export default LandingPage;