import React from "react";
import {
  ArrowRight,
  Code,
  Zap,
  Sparkles,
  Globe,
  Database,
  Server,
  Palette,
} from "lucide-react";
const NavBar = () => {
  return (
    <div>
      <header className="relative z-10 flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DevCraft
          </span>
        </div>

        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 hover:bg-white/10 rounded-lg backdrop-blur-sm">
            Sign In
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
