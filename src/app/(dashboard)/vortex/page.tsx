"use client"

import React, { useState, useEffect } from 'react';

const VortexLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textVisible, setTextVisible] = useState({
    title: false,
    subtitle: false,
    description: false,
    features: false,
    cta: false
  });

  useEffect(() => {
    setIsVisible(true);
    
    const timeouts = [
      setTimeout(() => setTextVisible(prev => ({ ...prev, title: true })), 300),
      setTimeout(() => setTextVisible(prev => ({ ...prev, subtitle: true })), 600),
      setTimeout(() => setTextVisible(prev => ({ ...prev, description: true })), 900),
      setTimeout(() => setTextVisible(prev => ({ ...prev, features: true })), 1200),
      setTimeout(() => setTextVisible(prev => ({ ...prev, cta: true })), 1500),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const features = [
    {
      title: "One-Line Problem Solving",
      description: "Just type your issue in one line and let our AI understand what you need."
    },
    {
      title: "Smart Matching",
      description: "Our AI finds the best person in your community based on their skills and expertise."
    },
    {
      title: "Instant Notifications",
      description: "Helpers get notified immediately, even by email, ensuring rapid response times."
    },
    {
      title: "Reputation System",
      description: "Build your reputation by helping others and get noticed for hiring or collaboration opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        {/* You can add your background image here */}
        <img src="/bg-image.jpg" alt="" className="w-full h-full opacity-70" />
        {/* Or use CSS background-image */}
        {/* <div className="w-full h-full bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundImage: 'url(/bg1-image.jpg)' }}></div> */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Title */}
          <div className={`transition-all duration-1000 transform ${textVisible.title ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              VORTEX
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-1000 delay-300 transform ${textVisible.subtitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
              AI-powered help. Human-powered action.
            </p>
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-600 transform ${textVisible.description ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-lg md:text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
              Vortex is a smart, AI-assisted space where communities truly help each other grow. 
              A revolutionary platform where reputation matters, and collaboration wins.
            </p>
          </div>

          {/* Features Grid */}
          <div className={`transition-all duration-1000 delay-900 transform ${textVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 border border-white/10 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-white/20 hover:scale-105"
                >
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-1200 transform ${textVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-8">
              <div className="inline-block px-6 py-3 border border-white/20 rounded-full text-sm text-gray-300 mb-8 animate-pulse">
                DROPPING SOON
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to revolutionize collaboration?
              </h2>
              <p className="text-gray-400 mb-10 text-lg">
                Stay tuned. Vortex is launching soon on Catalyst.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="px-10 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-white/20">
                Notify Me
              </button>
              <button className="px-10 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:border-white/40 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <style jsx>{`
        /* Remove all background animation styles */
      `}</style>
    </div>
  );
};

export default VortexLanding;