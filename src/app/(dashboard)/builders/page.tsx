"use client"
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import axios from 'axios';

const BuildersPage = () => {
  // Sample data - replace with your actual data
  const [builders, setBuilders] = useState<any[]>();

  useEffect(()=> {
    async function call(){
        const builders = await axios.get<{status : number, msg: string, builders : any[]}>('/api/getBuilders');
        if(builders.data.builders) {
            setBuilders(builders.data.builders);
        } else {
            alert(builders.data.msg)
        }
        
      
    }

    call()
  }, [])

  const handleProfileClick = (id : any) => {
    alert("hello")
    // In a real application, this would navigate to the profile page
    //  redirect(`/Profile/${id}`);
    window.location.href = `/Profile/${id}`;
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="aspect-square">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden h-full">
        <div className="flex flex-col h-full">
          {/* Profile section */}
          <div className="flex items-center space-x-4 mb-4">
            {/* Profile Picture Skeleton */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/20 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/20 rounded-full animate-pulse" />
            </div>
            
            {/* User Info Skeleton */}
            <div className="flex-1">
              <div className="h-6 bg-white/20 rounded-lg animate-pulse mb-3 w-3/4" />
              <div className="h-4 bg-white/20 rounded-lg animate-pulse w-1/2" />
            </div>
          </div>
          
          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-white/20 rounded-full animate-pulse"
                style={{ width: Math.random() * 60 + 60 + 'px' }}
              />
            ))}
          </div>
          
          {/* Arrow Skeleton */}
          <div className="flex justify-end mt-auto">
            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-fixed  bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: `url('/gnulinux.png')`
        }}
      ></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-yellow-500">Builders</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Discover talented developers and creators building the future of technology
          </p>
        </div>

        {/* Builders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[120rem] mx-auto">
          {!builders ? (
            // Show skeleton loaders while loading
            [...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : (
            builders.map((builder) => (
              <div
                key={builder.id}
                onClick={() => handleProfileClick(builder.id)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 aspect-square"
              >
                {/* Glassmorphism Card */}
                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden h-full">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Profile section */}
                    <div className="flex items-center space-x-4 mb-4">
                      {/* Profile Picture */}
                      <div className="relative">
                        <img
                          src={builder.profilePic}
                          alt={builder.username}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-lg"
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white/50" />
                      </div>
                      
                      {/* User Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                          {builder.username}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {builder.tags.map((tag : any, index: any) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-white/20 text-purple-100 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Arrow - positioned at bottom */}
                    <div className="flex justify-end mt-auto">
                      <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 backdrop-blur-sm">
                        <ChevronRight className="w-5 h-5 text-white group-hover:text-purple-200 transform group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildersPage;