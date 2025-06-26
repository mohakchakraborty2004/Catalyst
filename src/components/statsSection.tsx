"use client"

import { Shield, Zap, Star, TrendingUp } from "lucide-react";
import { useTheme } from "./theme-context";

const StatsSection = () => {
  const { theme } = useTheme();

  const stats = [
    { icon: Star, value: "9/10", label: "Market Validation Score" },
    { icon: TrendingUp, value: "3", label: "Revenue Streams" },
    { icon: Zap, value: "100%", label: "Web3 Native" },
    { icon: Shield, value: "AI", label: "Powered Moderation" }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Leading the{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
            Community Revolution
          </span>
        </h2>
        <p className={`text-xl mb-16 max-w-3xl mx-auto transition-colors duration-500 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Pioneering the first-ever prediction market for community governance while 
          building self-sustaining ecosystems.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`
                w-16 h-16 mx-auto mb-4 backdrop-blur-sm rounded-full flex items-center justify-center 
                border group-hover:scale-110 transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-black/60 border-white/20' 
                  : 'bg-white/60 border-black/20'
                }
              `}>
                <stat.icon className={`w-8 h-8 transition-colors duration-500 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {stat.value}
              </div>
              <div className={`transition-colors duration-500 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;