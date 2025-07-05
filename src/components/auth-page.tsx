import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Users, Target, Zap, RefreshCw } from 'lucide-react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter()

  // Available DiceBear styles
  const avatarStyles = [
    'adventurer',
    'avataaars',
    'big-smile',
    'bottts',
    'croodles',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'shapes',
    'thumbs'
  ];

  const [selectedStyle, setSelectedStyle] = useState('adventurer');

  // Generate profile picture URL
  const generateProfilePicture = (username : string, style = selectedStyle) => {
    if (!username) return '';
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(username)}&backgroundColor=transparent`;
  };

  // Update profile picture when username changes
  useEffect(() => {
    if (formData.username && !isSignIn) {
      setProfilePicture(generateProfilePicture(formData.username));
    } else {
      setProfilePicture('');
    }
  }, [formData.username, selectedStyle, isSignIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStyleChange = (style : any) => {
    setSelectedStyle(style);
    if (formData.username) {
      setProfilePicture(generateProfilePicture(formData.username, style));
    }
  };

  const generateRandomUsername = () => {
    const adjectives = ['Cool', 'Smart', 'Fast', 'Bright', 'Bold', 'Quick', 'Sharp', 'Swift'];
    const nouns = ['Builder', 'Creator', 'Maker', 'Founder', 'Innovator', 'Visionary', 'Pioneer', 'Leader'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomAdjective}${randomNoun}${randomNumber}`;
  };

  const handleRandomUsername = () => {
    const randomUsername = generateRandomUsername();
    setFormData({
      ...formData,
      username: randomUsername
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = formData.email
    const password = formData.password
    const username = formData.username
    try {
      const result = await signIn('credentials', {
        email,
        password,
        username : isSignIn ? '' : username,
        profilePic: isSignIn ? '' : profilePicture, // Include profile picture URL
        redirect: false,
      });

      if (result?.error) {
        console.log(result.error);
      } else if (result?.ok) {
        // Get the session to ensure user is authenticated
        const session = await getSession();
        if (session) {
          router.push('/Profile');
          router.refresh();
        }
      }
    } catch (error) {
       console.log("error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Image/Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Geometric shapes */}
          <div className="absolute top-20 left-20 w-64 h-64 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 border border-white/5 rounded-lg rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white/5 rounded-full"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 grid-rows-12 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-white/50"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center text-white p-12 w-full">
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-4 text-white">
              Catalyst
            </h1>
            <div className="w-32 h-1 bg-blue-500 rounded-full"></div>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Connect with innovators and build the future together
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join a community where builders meet funders, ideas become reality, and connections drive innovation forward.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Connect with innovators</h3>
                  <p className="text-gray-400 text-sm">Network with like-minded builders and visionary funders</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Find your perfect match</h3>
                  <p className="text-gray-400 text-sm">Discover startups and opportunities that align with your goals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Join exclusive Vortex communities</h3>
                  <p className="text-gray-400 text-sm">Access private groups and accelerate your journey</p>
                </div>
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
            <h1 className="text-3xl font-bold text-white">
              Catalyst
            </h1>
            <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-2"></div>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignIn ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-gray-400">
                {isSignIn 
                  ? 'Sign in to continue your journey' 
                  : 'Join the community of builders and funders'
                }
              </p>
              {!isSignIn && (
                <p className="text-sm text-gray-500 mt-2">
                  Already have an account? 
                  <button
                    onClick={() => setIsSignIn(true)}
                    className="text-blue-500 hover:text-blue-400 font-medium ml-1 transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              )}
              {isSignIn && (
                <p className="text-sm text-gray-500 mt-2">
                  Don't have an account? 
                  <button
                    onClick={() => setIsSignIn(false)}
                    className="text-blue-500 hover:text-blue-400 font-medium ml-1 transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              )}
            </div>

            {/* Profile Picture Preview - Only show during sign up */}
            {!isSignIn && profilePicture && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-800 rounded-full border-2 border-gray-600 overflow-hidden">
                    <img 
                      src={profilePicture} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Preview
                  </div>
                </div>
                <p className="text-sm text-gray-400">Your profile picture</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {!isSignIn && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-16 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                      placeholder="Choose a username"
                      required={!isSignIn}
                    />
                    <button
                      type="button"
                      onClick={handleRandomUsername}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="Generate random username"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your profile picture will be generated based on your username
                  </p>
                </div>
              )}

              {/* Avatar Style Selector - Only show during sign up */}
              {!isSignIn && formData.username && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Profile Picture Style
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {avatarStyles.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleStyleChange(style)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          selectedStyle === style
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={generateProfilePicture(formData.username, style)}
                          alt={style}
                          className="w-8 h-8 mx-auto rounded-full"
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click to preview different styles
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!isSignIn && (
                  <p className="text-xs text-gray-500 mt-2">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>

              {isSignIn && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

             { !isSignIn && <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 flex items-center justify-center space-x-2 group"
                disabled={loading}
              >
                <span>{loading ? 'stirring..' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>}

              { isSignIn && (
                   <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 flex items-center justify-center space-x-2 group"
              disabled = {loading}
              >
                <span>{loading ? 'lessgooo...' : 'Sign In'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              )
              }

              {!isSignIn && (
                <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-blue-400">Ready to join Vortex?</span><br />
                    Get access to exclusive communities and networking opportunities after creating your account.
                  </p>
                </div>
              )}

              {!isSignIn && (
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-400">Terms of Service</a>
                  {' '}and acknowledge you've read our{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}