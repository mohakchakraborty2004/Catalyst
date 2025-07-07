'use client';

import { useState, useEffect } from 'react';
import { userData } from '@/components/profile';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function ProfilePage() {

    const params = useParams()
    const id = params.id as string; 


  const [fetchUser, setFetchuser] = useState<userData | undefined>()
  const [isLoading, setIsLoading] = useState(true);
 
  
  useEffect(() =>{
    
    async function call() {
      try {
        setIsLoading(true);
        const fetch : any = await axios.get(`/api/fetchById?id=${id}`);
        const data : userData = fetch?.data?.user;
        setFetchuser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    call();
  }, [])

  // Loading skeleton for profile card
  const ProfileSkeleton = () => (
    <div className="w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="flex-shrink-0">
          <div className="rounded-full w-32 h-32 bg-white bg-opacity-20 animate-pulse"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="h-8 bg-white bg-opacity-20 rounded mb-2 animate-pulse"></div>
          <div className="h-6 bg-white bg-opacity-15 rounded mb-4 w-3/4 animate-pulse"></div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <div className="h-6 bg-white bg-opacity-15 rounded-full w-16 animate-pulse"></div>
            <div className="h-6 bg-white bg-opacity-15 rounded-full w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-10">
            <div className="h-4 bg-white bg-opacity-15 rounded mb-2 w-1/2 animate-pulse"></div>
            <div className="h-5 bg-white bg-opacity-20 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white bg-fixed overflow-auto"
         style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp7607683.jpg')" }}>
      <div className="bg-black bg-opacity-60 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Profile Card */}
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="w-full bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <img
                    src={fetchUser?.profilePic || '/default-avatar.png'}
                    alt="Profile"
                    className="rounded-full w-32 h-32 object-cover border-4 border-white border-opacity-20"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-2 text-white">@{fetchUser?.username}</h2>
                  <p className="text-gray-300 text-lg mb-4">{fetchUser?.email}</p>
                  
                  {/* Tags Section */}
                  <div className="mb-4">
                    {fetchUser?.tags?.length ? (
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {fetchUser.tags.map((tag, i) => (
                          <span key={i} className="bg-blue-600 bg-opacity-80 backdrop-blur-sm text-xs px-3 py-1 rounded-full border border-blue-400 border-opacity-30 text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">Complete your profile to add tags</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard label="Twitter" value={fetchUser?.xprofile ?? ''} />
                <InfoCard label="Phone" value={fetchUser?.phone ?? ''} />
                <InfoCard label="Country" value={fetchUser?.country ?? ''} />
                <InfoCard label="LinkedIn" value={fetchUser?.linkedIn ?? ''} />
                
                {/* GitHub Section with Calendar */}
                <div className="lg:col-span-2">
                  <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-10">
                    <h3 className="text-sm font-semibold text-gray-200 mb-2">GitHub</h3>
                    <p className="text-white mb-4 text-base">{fetchUser?.github || 'Complete your profile'}</p>
                    {fetchUser?.github && (
                      <div className="mt-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                        <GitHubCalendar username={fetchUser?.github} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
}


function InfoCard({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-xl p-4 border border-white border-opacity-10">
      <h3 className="text-sm font-semibold text-gray-200 mb-2">{label}</h3>
      {
        label === "Twitter" ?
        (
          <a href={`https://x.com/${value}`} className="hover:text-yellow-400 transition-colors">
            <p className="text-white">{value || 'Complete your profile'}</p>
          </a>
        ) : (
          <p className="text-white">{value || 'Complete your profile'}</p>
        )
      }     
    </div>
  );
}