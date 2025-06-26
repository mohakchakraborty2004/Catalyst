"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "./theme-context";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className={`
            inline-flex items-center px-4 py-2 backdrop-blur-sm rounded-full border mb-8 transition-all duration-500
            ${theme === 'dark' 
              ? 'bg-white/10 border-white/20' 
              : 'bg-black/10 border-black/20'
            }
          `}>
            <Sparkles className={`w-4 h-4 mr-2 transition-colors duration-500 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`} />
            <span className={`text-sm transition-colors duration-500 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Next-Generation Community Platform
            </span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-colors duration-500 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              Catalyst
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Revolutionizing how startup founders connect and communities self-govern through 
            innovative Web3 mechanics, AI-powered management, and gamified governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className={`
                border-0 px-8 py-4 text-lg transition-all duration-300 hover:scale-105
                ${theme === 'dark' 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
                }
              `}
            >
              Join the Community
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className={`
                backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300 hover:scale-105
                ${theme === 'dark' 
                  ? 'border-white/30 text-black hover:text-white hover:bg-white/10' 
                  : 'border-black/30 text-black hover:text-black hover:bg-black/10'
                }
              `}
            >
              Learn More
            </Button>
          </div>
          
          <div className={`text-sm transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
          • 🚀 Web3 Pioneer • 🤖 AI-Powered
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className={`
        absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse transition-all duration-500
        ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}
      `} />
      <div 
        className={`
          absolute bottom-20 right-10 w-32 h-32 rounded-full blur-xl animate-pulse transition-all duration-500
          ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}
        `} 
        style={{ animationDelay: '1s' }} 
      />
    </div>
  );
};

export default Hero;