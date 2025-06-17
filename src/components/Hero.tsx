"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className="text-white text-sm">Next-Generation Community Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              Catalyst
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing how startup founders connect and communities self-govern through 
            innovative Web3 mechanics, AI-powered management, and gamified governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 border-0 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              Join the Community
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </div>
          
          <div className="text-gray-400 text-sm">
            ✨ Market Validation Score: 9/10 • 🚀 Web3 Pioneer • 🤖 AI-Powered
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default Hero;