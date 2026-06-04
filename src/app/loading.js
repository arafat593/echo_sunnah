export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-350">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing halo spinner */}
        <div className="w-16 h-16 rounded-full border-4 border-emerald-700/10 border-t-emerald-700 animate-spin"></div>
        {/* Inner pulse */}
        <div className="absolute w-8 h-8 rounded-full bg-emerald-800/15 animate-ping"></div>
      </div>
      <p className="mt-4 text-emerald-800 text-[10px] font-black tracking-widest uppercase animate-pulse">
        Reviving Sunnah...
      </p>
    </div>
  );
}
