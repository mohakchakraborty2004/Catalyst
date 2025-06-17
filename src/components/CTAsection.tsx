"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              Transform Communities?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join Catalyst and experience the future of startup networking, AI-powered moderation, 
            and gamified governance in one revolutionary platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-black/80 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 border border-white/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">For Founders</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Showcase your startup, connect with co-founders, and access a network of 
              like-minded entrepreneurs building the future.
            </p>
            <Button className="w-full bg-white text-black hover:bg-gray-200 border-0">
              Join as Founder
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-black/80 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4 border border-white/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">For Community</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Participate in governance, invest in moderator performance, and help 
              shape the future of community management.
            </p>
            <Button className="w-full bg-white text-black hover:bg-gray-200 border-0">
              Join Community
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-400">
            🌟 Be part of the community governance revolution • 🚀 Early access available
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;