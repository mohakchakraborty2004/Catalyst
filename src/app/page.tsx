"use client"

import CTASection from "@/components/CTAsection";
import FeatureSection from "@/components/featureSection";
import Hero from "@/components/Hero";
import StatsSection from "@/components/statsSection";
import { ThemeProvider, useTheme } from "@/components/theme-context";
import ThemeToggle from "@/components/theme-toggle";

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
            : `url("/light-bg.jpg")` // You'll need to add this image
        }}
      />
      
      {/* Theme Toggle Button */}
      <ThemeToggle />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <FeatureSection />
        <StatsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}