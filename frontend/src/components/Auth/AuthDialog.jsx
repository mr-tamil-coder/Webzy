import React, { useContext } from "react";
import { X, User, Sparkles } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { userContext } from "../../context/UserContext";
import { API } from "../../utils/Api";

const AuthDialog = ({ isOpen, onClose }) => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const googleUserInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: "Bearer " + tokenResponse?.access_token },
          }
        );

        // store in db
        const {
          email,
          email_verified,
          family_name,
          given_name,
          name,
          picture,
          sub,
        } = googleUserInfo?.data;
        const response = await axios.post(
          `${API}/auth/google`,
          {
            email,
            email_verified,
            family_name,
            given_name,
            name,
            picture,
            sub,
          },
          {
            withCredentials: true,
          }
        );
        const { user } = response.data;
        console.log("User", user);

        setUserInfo(user);
        console.log(googleUserInfo);
      } catch (err) {}
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <User className="w-10 h-10 text-white" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Please Sign Up!
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Create an account to start building amazing web applications with
            our AI-powered platform.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={googleLogin}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 transform shadow-lg"
          >
            Sign Up Now
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300"
          >
            Maybe Later
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-400 text-center">
            ✨ Free to get started
          </p>
          <p className="text-sm text-gray-400 text-center">
            🚀 Build full-stack apps instantly
          </p>
          <p className="text-sm text-gray-400 text-center">
            💡 AI-powered development
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;
