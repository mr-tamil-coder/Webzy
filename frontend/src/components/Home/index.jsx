import React, { useState, useEffect, useContext } from "react";
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
import { MessageContext } from "../../context/MsgContext";
import { userContext } from "../../context/UserContext";
import NavBar from "./NavBar";
import appData from "../../data/appData";
import PromptSuggestions from "./PromptSuggestions";
import { BgAnimation, FloatingParticles } from "./Animation";
import AuthDialog from "../Auth/AuthDialog";
import axios from "axios";
import { useNavigate } from "react-router";
import { API } from "../../utils/Api";
const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentFeature, setCurrentFeature] = useState(0);
  const { messages, setMessages } = useContext(MessageContext);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Code,
      text: "Full-Stack Development",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Database,
      text: "Database Management",
      color: "from-green-500 to-blue-500",
    },
    {
      icon: Server,
      text: "Backend Architecture",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Palette,
      text: "Modern UI/UX Design",
      color: "from-pink-500 to-violet-500",
    },
  ];

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // alert(`Building: ${inputValue}`);
    }
  };

  const generateOutput = async (userText) => {
    if (userInfo && userInfo._id && userInfo.emailVerified) {
      console.log("UserInfooooooo ", userInfo);
      const userPrompt = {
        role: "user",
        content: userText,
      };
      setMessages(userPrompt);
      try {
        const res = await axios.post(
          `${API}/workspace`,
          {
            messages: [userPrompt],
            user: userInfo._id,
          },
          {
            withCredentials: true,
          }
        );
        const newWorkspace = res.data;
        navigate(`/workspace/${newWorkspace._id}`);
        return;
      } catch (err) {
        console.log(err);
      }
    }
    setShowAuthDialog(true);
    console.log("UserInfo", userInfo);
    console.log(userText);
    // TODO :
  };
  const handleCloseAuthDialog = () => {
    setShowAuthDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <BgAnimation />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Animated Feature Showcase */}
        <div className="mb-8 relative">
          <div className="flex items-center justify-center space-x-3 mb-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    index === currentFeature
                      ? `bg-gradient-to-r ${feature.color} border-white shadow-lg scale-110`
                      : "border-gray-600 bg-gray-800/50 scale-90 opacity-50"
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              );
            })}
          </div>
          <p className="text-lg text-gray-300 transition-all duration-500">
            {features[currentFeature].text}
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-8 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            What do you want to
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              build?
            </span>
          </h1>
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
          Prompt, run, edit, and deploy{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            full-stack web apps
          </span>{" "}
          with modern technology stack
        </p>

        {/* Search Input */}
        <div className="w-full max-w-2xl relative group">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              placeholder="What you want to build?"
              rows={1}
              className="w-full px-6 py-4 md:py-5 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-white transition-all duration-300 hover:bg-white/15 pr-16 resize-none overflow-y-auto max-h-32 min-h-[60px] md:min-h-[68px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.2) transparent",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 128) + "px";
              }}
            />
            <button
              onClick={handleSubmit}
              className="absolute right-2 top-4 md:top-5 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/25"
            >
              <ArrowRight
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                onClick={() => generateOutput(inputValue)}
              />
            </button>
          </div>
        </div>

        {/* Prompt Suggestions */}
        <PromptSuggestions
          setInputValue={setInputValue}
          prompts={appData.prompts}
        />
      </main>
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={handleCloseAuthDialog}
        // onAuthenticate={handleAuthentication}
      />
    </div>
  );
};

export default Index;
