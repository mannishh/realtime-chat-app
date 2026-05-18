import React from "react";
import { MessageSquare, ShieldCheck } from "lucide-react";

const ChatPlaceholder = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0b0f19] px-6 text-center select-none h-full relative">
      {/* Visual Central Icon Indicator */}
      <div className="w-16 h-16 rounded-2xl bg-[#161b27] border border-[#1e2535] flex items-center justify-center mb-6 shadow-xl shadow-black/20">
        <MessageSquare className="w-7 h-7 text-[#4ade80]" strokeWidth={2} />
      </div>

      {/* Main Typography Header */}
      <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
        Welcome to Live Chatting App
      </h1>

      {/* Instructional Subtext */}
      <p className="text-sm text-[#4a5568] max-w-sm leading-relaxed">
        Select a user from the sidebar directory to start a conversation and
        share messages in real-time.
      </p>
    </div>
  );
};

export default ChatPlaceholder;
