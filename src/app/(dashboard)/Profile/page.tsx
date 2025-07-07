'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  useProfile, userData } from '@/components/profile';
import GitHubCalendar from 'react-github-calendar';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [fetchUser, setFetchuser] = useState<userData | undefined>()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() =>{
    
    async function call() {
      try {
        setIsLoading(true);
        const fetch : any = await axios.get('/api/fetchProfile');
        const data : userData = fetch?.data?.user;
        setFetchuser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
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

  
  useEffect(() => {
    if (showModal && fetchUser) {
      setForm({
        linkedin: fetchUser.linkedIn || '',
        github: fetchUser.github || '',
        phone: fetchUser.phone || '',
        country: fetchUser.country || '',
        xprofile: fetchUser.xprofile || '',
        tags: fetchUser.tags || [],
      });
    }
  }, [showModal, fetchUser]);

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

  // Updated tags handler for the new TagsInput component
  const handleTagsChange = (newTags: string[]) => {
    setForm((prev) => ({ ...prev, tags: newTags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile...', form);

    try {
      setIsSubmitting(true);
      const update = await axios.post<{status : number, msg : string}>(`/api/fetchProfile`, form);

      if (update.data.status == 200){
        alert("profile updated");
      }
      
      setShowModal(false);
      setRefresh(true)
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Header with completion bar and button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="text-sm text-white bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-4">
              <div className="mb-2">Profile Completion: {isLoading ? '...' : completion}%</div>
              <div className="w-48 h-2 bg-gray-800 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                  style={{ width: isLoading ? '0%' : `${completion}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              disabled={isLoading}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Loading...' : 'Complete Your Profile'}
            </button>
          </div>

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

      {/* Modal with Glassmorphism */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black bg-opacity-30 backdrop-blur-lg border border-yellow-400 border-opacity-30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Complete Your Profile
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="LinkedIn URL"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <Input
                      label="GitHub username"
                      name="github"
                      value={form.github}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <Input
                      label="X username"
                      name="xprofile"
                      value={form.xprofile}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <TagsInput
                    label="Skills & Technologies"
                    value={form.tags}
                    onChange={handleTagsChange}
                    disabled={isSubmitting}
                    placeholder="Add your skills (e.g., React, JavaScript, Python)"
                  />

                  <div className="flex justify-end gap-4 pt-6 border-t border-white border-opacity-10">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      disabled={isSubmitting}
                      className="text-gray-300 hover:text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ label, name, value, onChange, disabled }: any) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-200 mb-2 block">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-white bg-opacity-10 backdrop-blur-md text-white p-3 rounded-lg border border-white border-opacity-20 focus:border-yellow-400 focus:outline-none transition-colors placeholder-gray-400 disabled:opacity-50"
        placeholder={label}
      />
    </div>
  );
}

function TagsInput({ label, value = [], onChange, disabled, placeholder = "Type and press Enter or comma to add tags" }: any) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Check if user typed a comma
    if (newValue.includes(',')) {
      const tags = newValue.split(',').map(tag => tag.trim()).filter(tag => tag);
      if (tags.length > 0) {
        const newTags = [...value];
        tags.forEach(tag => {
          if (tag && !newTags.includes(tag)) {
            newTags.push(tag);
          }
        });
        onChange(newTags);
        setInputValue('');
      }
    } else {
      setInputValue(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !value.includes(trimmedValue)) {
        onChange([...value, trimmedValue]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_: any, index: number) => index !== indexToRemove));
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-200 mb-2 block">{label}</label>
      <div className="w-full bg-white bg-opacity-10 backdrop-blur-md text-white p-3 rounded-lg border border-white border-opacity-20 focus-within:border-yellow-400 transition-colors min-h-[50px] flex flex-wrap gap-2 items-center">
        {/* Render existing tags */}
        {value.map((tag: string, index: number) => (
          <span
            key={index}
            className="bg-yellow-400 bg-opacity-20 text-yellow-300 px-2 py-1 rounded-md text-sm flex items-center gap-1 border border-yellow-400 border-opacity-30"
          >
            {tag}
            {!disabled && (
              <button
                onClick={() => removeTag(index)}
                className="text-yellow-300 hover:text-white transition-colors ml-1"
                type="button"
              >
                ×
              </button>
            )}
          </span>
        ))}
        
        {/* Input field */}
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 disabled:opacity-50 min-w-[120px]"
          placeholder={value.length === 0 ? placeholder : "Add more tags..."}
        />
      </div>
      
      {/* Helper text */}
      <p className="text-xs text-gray-400 mt-1">
        Type and press Enter or use commas to add tags. Press Backspace to remove the last tag.
      </p>
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