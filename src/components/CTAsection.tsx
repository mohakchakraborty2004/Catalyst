"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import { useTheme } from "./theme-context";
import { redirect } from "next/navigation";

const CTASection = () => {
  const { theme } = useTheme();

  return (
    <section className="py-24 px-6 relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              Transform Communities?
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-12 transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Join Catalyst and experience the future of startup networking, AI-powered moderation, 
            and gamified governance in one revolutionary platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className={`
            backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500
            ${theme === 'dark' 
              ? 'bg-black/60 border-white/20 hover:bg-black/80' 
              : 'bg-white/60 border-black/20 hover:bg-white/80'
            }
          `}>
            <div className="flex items-center mb-6">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mr-4 border transition-all duration-500
                ${theme === 'dark' 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-black/10 border-black/20'
                }
              `}>
                <Briefcase className={`w-6 h-6 transition-colors duration-500 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold transition-colors duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                For Builders and Funders
              </h3>
            </div>
            <p className={`mb-6 transition-colors duration-500 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Showcase your startup, connect with co-founders, and access a network of 
              like-minded entrepreneurs building the future.
            </p>
            <Button className={`
              w-full border-0 transition-all duration-300
              ${theme === 'dark' 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
              }
            `}>
              Join as Builder/Funder
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className={`
            backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500
            ${theme === 'dark' 
              ? 'bg-black/60 border-white/20 hover:bg-black/80' 
              : 'bg-white/60 border-black/20 hover:bg-white/80'
            }
          `}>
            <div className="flex items-center mb-6">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mr-4 border transition-all duration-500
                ${theme === 'dark' 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-black/10 border-black/20'
                }
              `}>
                <Users className={`w-6 h-6 transition-colors duration-500 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold transition-colors duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                For Community
              </h3>
            </div>
            <p className={`mb-6 transition-colors duration-500 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Participate in governance, invest in moderator performance, and help 
              shape the future of community management.
            </p>
            <Button
            onClick={()=> {
              redirect('/vortex')
            }}
            className={`
              w-full border-0 transition-all duration-300
              ${theme === 'dark' 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
              }
            `}>
              Join Vortex
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className={`transition-colors duration-500 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            🌟 Be part of the community governance revolution • 🚀 Join the waitlist
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;