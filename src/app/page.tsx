"use client"

import { useState, useEffect } from "react";
import { Home, Zap, BarChart3, Users, Mail, Menu, X } from "lucide-react";
import CTASection from "@/components/CTAsection";
import FeatureSection from "@/components/featureSection";
import Hero from "@/components/Hero";
import StatsSection from "@/components/statsSection";
import { ThemeProvider, useTheme } from "@/components/theme-context";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Zap, label: 'Features', href: '#features' },
    { icon: BarChart3, label: 'Stats', href: '#stats' },
    { icon: Users, label: 'About', href: '#about' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Separate Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Dynamic Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4">
        <nav className={`
          relative mx-auto backdrop-blur-md border rounded-2xl overflow-hidden
          transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] 
          ${isScrolled 
            ? 'max-w-4xl px-8 py-4' 
            : 'max-w-[25rem] px-6 py-3'
          }
          ${theme === 'dark' 
            ? 'bg-white/10 border-white/20 shadow-lg shadow-black/20' 
            : 'bg-black/20 border-black/30 shadow-xl shadow-black/40'
          }
        `}>
          {/* Subtle glow effect */}
          <div className={`
            absolute inset-0 rounded-2xl 
            transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
              : 'bg-gradient-to-r from-gray-900/10 to-gray-700/10'
            }
          `} />
          
          <div className="relative flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 min-w-0">
              <img 
                className="h-8 w-auto object-contain flex-shrink-0"
                src="/catalystlogo.png" 
                alt="Catalyst Logo" 
              />
            
            </div>

            {/* Desktop Navigation - Always visible, but text hidden when not scrolled */}
            <div className="hidden md:flex items-center space-x-1 min-w-0">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`
                      group flex items-center rounded-xl
                      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:backdrop-blur-lg transform hover:scale-105 hover:-translate-y-0.5
                      
                      ${isScrolled 
                        ? 'space-x-2 px-4 py-2' 
                        : 'space-x-0 px-2 py-2'
                      }
                      ${theme === 'dark' 
                        ? 'hover:bg-white/20 text-white/80 hover:text-white' 
                        : 'hover:bg-black/30 text-gray-700 hover:text-gray-900'
                      }
                    `}
                    style={{
                      transitionDelay: isScrolled ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    <Icon 
                      size={18} 
                      className="flex-shrink-0 transition-all duration-300 ease-out group-hover:rotate-12 group-hover:scale-110" 
                    />
                    <span className={`
                      text-sm font-medium whitespace-nowrap overflow-hidden
                      transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]
                      ${isScrolled 
                        ? 'opacity-100 max-w-xs translate-x-0' 
                        : 'opacity-0 max-w-0 translate-x-4'
                      }
                    `}>
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button - Always visible, but hidden when not scrolled */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                md:hidden p-2 rounded-lg flex-shrink-0
                transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isScrolled 
                  ? 'opacity-100 translate-x-0 pointer-events-auto' 
                  : 'opacity-0 translate-x-4 pointer-events-none'
                }
                ${theme === 'dark' 
                  ? 'text-white/80 hover:text-white hover:bg-white/20' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-black/30'
                }
              `}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={20} 
                  className={`
                    absolute inset-0 transition-all duration-300 ease-out
                    ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}
                  `}
                />
                <X 
                  size={20} 
                  className={`
                    absolute inset-0 transition-all duration-300 ease-out
                    ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}
                  `}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`
            md:hidden overflow-hidden
            transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isMobileMenuOpen && isScrolled
              ? 'max-h-80 opacity-100 mt-4' 
              : 'max-h-0 opacity-0'
            }
          `}>
            <div className={`
              pt-4 border-t transition-colors duration-500
              ${theme === 'dark' ? 'border-white/20' : 'border-black/30'}
            `}>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                      hover:backdrop-blur-lg transform hover:translate-x-2 hover:scale-102
                      ${theme === 'dark' 
                        ? 'hover:bg-white/20 text-white/80 hover:text-white' 
                        : 'hover:bg-black/30 text-gray-700 hover:text-gray-900'
                      }
                    `}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    <Icon size={20} className="flex-shrink-0 transition-transform duration-300 ease-out" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

const HomeContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen relative transition-all duration-1000 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      {/* Fixed Background Image with smooth transition */}
      <div 
        className={`
          fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000
          ${theme === 'dark' 
            ? 'opacity-30' 
            : 'opacity-90'
          }
        `}
        style={{
          backgroundImage: theme === 'dark' 
            ? `url("/space-shuttle.png")` 
            : `url("/light-bg.jpg")`
        }}
      />
      
      {/* Dynamic Navbar */}
      <Navbar />
      
      {/* Content with top padding to account for fixed header */}
      <div className="relative z-10 pt-24">
        <div id="home">
          <Hero />
        </div>
        <div id="features">
          <FeatureSection />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="about">
          <CTASection />
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}