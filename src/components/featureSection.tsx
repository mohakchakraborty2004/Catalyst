"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Users, Bot, TrendingUp } from "lucide-react";

const FeatureSection = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Three Powerful Features,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Catalyst combines proven market needs with cutting-edge technology to create 
            multiple revenue streams and exceptional user experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-black/60 backdrop-blur-sm border-white/20 hover:bg-black/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
