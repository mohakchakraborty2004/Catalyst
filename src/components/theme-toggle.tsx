"use client"

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-context";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className={`
        fixed top-6 right-6 z-50 w-12 h-12 rounded-full border-2 transition-all duration-500 
        hover:scale-110 backdrop-blur-sm
        ${theme === 'dark' 
          ? 'border-white/30 bg-black/20 text-white hover:bg-white/10' 
          : 'border-gray-300 bg-white/20 text-gray-800 hover:bg-gray-100/50'
        }
      `}
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-6 h-6 transition-transform duration-300 rotate-0" />
      )}
    </Button>
  );
};

export default ThemeToggle;