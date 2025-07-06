'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  useProfile, userData } from '@/components/profile';
import GitHubCalendar from 'react-github-calendar';
import axios from 'axios';

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [fetchUser, setFetchuser] = useState<userData | undefined>()
  const [refresh, setRefresh] = useState<boolean>(false)
  useEffect(() =>{
    
    async function call() {
      const fetch : any = await axios.get('/api/fetchProfile');
      const data : userData = fetch?.data?.user;
      setFetchuser(data);
    }

    call();
    setRefresh(false)
  }, [refresh])

  // Local form state
  const [form, setForm] = useState({
    linkedin: '',
    github: '',
    phone: '',
    country: '',
    xprofile : '',
    tags: [] as string[],
  });


  // Calculate profile completion percentage
  const completion = useMemo(() => {
    let fields = [fetchUser?.linkedIn, fetchUser?.github, fetchUser?.country, fetchUser?.phone];
    let filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [fetchUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setForm((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile...', form);

    const update = await axios.post<{status : number, msg : string}>(`/api/fetchProfile`, form);

    if (update.data.status == 200){
      alert("profile updated");
    }
    
    setShowModal(false);
    setRefresh(true)
  };

  return (
    <div
  className=" fixed inset-0 bg-cover bg-center bg-no-repeat text-white"
  style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp12575664.jpg')" }}
>
      <div className="bg-black bg-opacity-60 min-h-screen flex flex-col items-center p-8">
        <div className="w-full max-w-5xl flex justify-between mb-6">
          <div className="text-sm text-white mt-2">
            Profile Completion: {completion}%
            <div className="w-40 h-2 bg-gray-800 rounded-full mt-1">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-400 rounded-md text-sm text-black font-bold"
          >
            Complete Your Profile
          </button>
          
        </div>

        {/* Profile Card - Redesigned */}
        <div className="w-full max-w-5xl bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
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
              <h2 className="text-3xl font-bold mb-2">@{fetchUser?.username}</h2>
              <p className="text-gray-300 text-lg mb-4">{fetchUser?.email}</p>
              
              {/* Tags Section */}
              <div className="mb-4">
                {fetchUser?.tags?.length ? (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {fetchUser.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-600 bg-opacity-80 text-xs px-3 py-1 rounded-full border border-blue-400 border-opacity-30">
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
              <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10">
                <h3 className="text-sm font-semibold text-gray-300 mb-2">GitHub</h3>
                <p className="text-white mb-4">{fetchUser?.github || 'Complete your profile'}</p>
                {fetchUser?.github && (
                  <div className="mt-4">
                    <GitHubCalendar username={fetchUser?.github} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with Glassmorphism */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-yellow-100 bg-opacity-10 backdrop-blur-md border border-yellow-400 border-opacity-30 rounded-2xl w-full max-w-xl p-8 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                Complete Your Profile
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="LinkedIn URL"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                />
                <Input
                  label="GitHub username"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                />
                <Input
                  label="X username"
                  name="xprofile"
                  value={form.xprofile}
                  onChange={handleChange}
                />
                <Input
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />
                <TagsInput
                  label="Tags (comma separated)"
                  value={form.tags.join(', ')}
                  onChange={handleTagsChange}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ label, name, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-200 mb-2 block">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-white bg-opacity-10 backdrop-blur-sm text-white p-3 rounded-lg border border-white border-opacity-20 focus:border-yellow-400 focus:outline-none transition-colors placeholder-gray-400"
        placeholder={label}
      />
    </div>
  );
}

function TagsInput({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-200 mb-2 block">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full bg-white bg-opacity-10 backdrop-blur-sm text-white p-3 rounded-lg border border-white border-opacity-20 focus:border-yellow-400 focus:outline-none transition-colors placeholder-gray-400"
        placeholder="React, JavaScript, Node.js"
      />
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">{label}</h3>
      {
        label == "Twitter" ?
       ( <a href={`https://x.com/${value}`}>
       <p className="text-white">{value || 'Complete your profile'}</p>
      </a> ) :   <p className="text-white">{value || 'Complete your profile'}</p>

      }     
    </div>
  );
}