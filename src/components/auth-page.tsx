"use client"

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Building, Users } from 'lucide-react';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'builder'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Brand Section */}
    <div
  className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-center"
  style={{
    backgroundImage: "url('/bg-image.jpg')" 
  }}
>
  {/* Dark overlay to maintain text readability */}
  <div className="absolute inset-0 bg-black/10"></div>

  <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
    <div className="mb-8">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
        Catalyst
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
    </div>

    <div className="text-center max-w-md">
      <h2 className="text-2xl font-semibold mb-4">
        Where Innovation Meets Investment
      </h2>
      <p className="text-lg text-gray-300 mb-8">
        Connect builders and funders to create the next generation of startups.
        Join our exclusive Vortex communities to accelerate your journey.
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-lg p-3">
          <Building className="w-5 h-5 text-blue-400" />
          <span>Find Startups</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-lg p-3">
          <Users className="w-5 h-5 text-purple-400" />
          <span>Join Vortex</span>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
  <div className="w-full max-w-md">
    {/* Mobile Logo */}
    <div className="lg:hidden text-center mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
        Catalyst
      </h1>
    </div>

    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      {/* Toggle Buttons */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
        <button
          onClick={() => setIsSignIn(true)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
            isSignIn
              ? 'bg-gray-900 text-white shadow-md'
              : 'text-gray-700 hover:text-black'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsSignIn(false)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
            !isSignIn
              ? 'bg-gray-900 text-white shadow-md'
              : 'text-gray-700 hover:text-black'
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="space-y-6">
        {!isSignIn && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
                required={!isSignIn}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {!isSignIn && (
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              I am a
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
            >
              <option value="builder">Builder (Startup Founder)</option>
              <option value="funder">Funder (Investor)</option>
            </select>
          </div>
        )}

        {isSignIn && (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-gray-800 hover:text-black transition-colors">
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-900 focus:ring-4 focus:ring-gray-600 transform hover:scale-[1.02] transition-all duration-300 shadow-md"
        >
          {isSignIn ? 'Sign In to Catalyst' : 'Create Account'}
        </button>
      </div>

      {!isSignIn && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold text-black">Ready to join Vortex?</span><br />
            Connect with like-minded innovators in our exclusive communities after signing up.
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-black hover:text-gray-800 font-medium transition-colors"
        >
          {isSignIn ? 'Sign up here' : 'Sign in here'}
        </button>
      </p>
    </div>
  </div>
</div>

      </div>
  );
}