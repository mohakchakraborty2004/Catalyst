"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Mail, Briefcase, DollarSign } from 'lucide-react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import dotenv from "dotenv";

dotenv.config();

const StartupListingPage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<any>();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [applicationData, setApplicationData] = useState({ position: '', message: '' });
  const [startups, setStartups] = useState<any[]>()
  const URL = process.env.YNN_BACKEND_URL as string
  const TOKEN = process.env.YNN_TOKEN as string
  useEffect(()=> {
    async function call() {
      const fetch = await axios.get<any[]>(URL, {
        headers : {
          authorization : `Bearer ${TOKEN}`
        }
      })

      if(fetch){
        setStartups(fetch.data)
      }
    }

    call()
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartupClick = (startup : any) => {
    setSelectedStartup(startup);
  };

  const handleApplicationSubmit = async () => {
    // Handle application submission
    // selectedstartup.title and selectedstartup.author

    const data = {
      position : applicationData.position,
      message : applicationData.position,
      title : selectedStartup.title,
      author : selectedStartup.author
    }

    const post = await axios.post<{msg : string, status : number}>(`/api/apply`, data);

    if(post.data.status == 200) {
      alert(post.data.msg)
    } else if(post.data.status == 404) {
      alert(post.data.msg)
      redirect('/auth')
    } else {
      alert(post.data.msg)
    }

    console.log('Application submitted:', applicationData);

    setShowApplicationForm(false);
    setApplicationData({ position: '', message: '' });
    setSelectedStartup(null);
  };

  const closeAllModals = () => {
    setSelectedStartup(null);
    setShowApplicationForm(false);
    setShowFundingModal(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image - Replace with your image URL */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url('/Kojiro.png')`
        }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Join or fund the startups
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              easily and from anywhere
            </span>
          </h1>
          
          <p className={`text-xl text-gray-300 transition-all duration-1000 delay-300 ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Validated by{' '}
            <a 
              href="https://ynotnow.pro" 
              className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-2 underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              YnotNow
            </a>
          </p>
        </div>
      </div>

      {/* Startups Grid */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups?.map((startup, index) => (
              <div
                key={startup.id}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleStartupClick(startup)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{startup.title}</h3>
                    <p className="text-gray-300 text-sm flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4" />
                      {startup.author}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                        {startup.category}
                      </span>
                      <span>👍 {startup.votes}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-blue-400 transition-transform duration-300 hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Startup Detail Modal */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedStartup.title}</h3>
                <p className="text-blue-600 font-medium capitalize">{selectedStartup.category}</p>
              </div>
              <button
                onClick={closeAllModals}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{selectedStartup.description}</p>
            
            <div className="flex items-center gap-2 mb-8 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{selectedStartup.author}</span>
              <span className="text-xs text-gray-400 ml-auto">
                👍 {selectedStartup.votes} votes
              </span>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Briefcase className="w-4 h-4" />
                Apply
              </button>
              <button
                onClick={() => setShowFundingModal(true)}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <DollarSign className="w-4 h-4" />
                Fund It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 60 }}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Apply to {selectedStartup?.title}</h3>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={applicationData.position}
                  onChange={(e) => setApplicationData({...applicationData, position: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter desired position"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={applicationData.message}
                  onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us why you're interested..."
                />
              </div>
              
              <button
                onClick={handleApplicationSubmit}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Send Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Funding Modal */}
      {showFundingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 60 }}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 animate-scaleIn text-center">
            <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Feature Under Development</h3>
            <p className="text-gray-600 mb-6">
              The funding feature is currently being developed. Stay tuned for updates!
            </p>
            <button
              onClick={() => setShowFundingModal(false)}
              className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StartupListingPage;