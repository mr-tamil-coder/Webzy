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
const PromptSuggestions = ({ setInputValue, prompts }) => {
  return (
    <div>
      <div className="mt-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInputValue(prompt)}
              className="text-left p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group text-sm text-gray-300 hover:text-white"
            >
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <span className="leading-relaxed">{prompt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      ;
    </div>
  );
};

export default PromptSuggestions;
