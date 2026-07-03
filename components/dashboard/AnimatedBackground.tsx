"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-base overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97066" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#F97066" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="20%" cy="30%" r="300" fill="url(#glow)" />
        <circle cx="80%" cy="70%" r="250" fill="url(#glow)" />
      </svg>
    </div>
  );
}
