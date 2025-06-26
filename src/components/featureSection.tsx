"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Users, Bot, TrendingUp } from "lucide-react";
import { useTheme } from "./theme-context";

const FeatureSection = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Users,
      title: "Startup Networking Hub",
      description: "Connect early-stage founders, showcase projects, and recruit top talent in an ecosystem designed for innovation."
    },
    {
      icon: Bot,
      title: "AI-Powered Management",
      description: "Intelligent community moderation that analyzes problems and routes them to appropriate moderators with contextual insights."
    },
    {
      icon: TrendingUp,
      title: "Web3 Moderator Marketplace",
      description: "Revolutionary prediction market where community members can invest in moderator performance like stocks."
    }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Three Powerful Features,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Catalyst combines proven market needs with cutting-edge technology to create 
            multiple revenue streams and exceptional user experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`
                backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl group
                ${theme === 'dark' 
                  ? 'bg-black/60 border-white/20 hover:bg-black/80' 
                  : 'bg-white/60 border-black/20 hover:bg-white/80'
                }
              `}
            >
              <CardContent className="p-8 text-center">
                <div className={`
                  w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center 
                  group-hover:scale-110 transition-all duration-300 border
                  ${theme === 'dark' 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-black/10 border-black/20'
                  }
                `}>
                  <feature.icon className={`w-8 h-8 transition-colors duration-500 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;