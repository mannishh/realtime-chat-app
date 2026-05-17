import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 relative overflow-hidden space-y-6">
      {/* Soft ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Spinner and Text Container */}
      <div className="flex flex-col items-center space-y-4 p-8 bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl relative z-10 min-w-[160px]">
        {/* Animated Loader */}
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />

        {/* Styled Loading Text */}
        <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Spinner;
