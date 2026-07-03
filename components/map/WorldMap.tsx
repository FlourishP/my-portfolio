"use client";

export function WorldMap() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249,112,102,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#map-grid)" />
        <circle cx="500" cy="250" r="300" fill="url(#map-glow)" />

        {/* North America */}
        <path
          d="M 120 100 Q 140 80 180 85 Q 220 70 250 90 Q 270 85 280 100 Q 290 120 275 140 Q 260 160 240 170 Q 220 185 200 180 Q 180 190 160 175 Q 140 165 130 145 Q 115 130 120 100 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* South America */}
        <path
          d="M 220 220 Q 240 210 250 230 Q 260 260 255 290 Q 250 320 240 340 Q 225 360 215 350 Q 205 330 210 300 Q 200 270 210 240 Q 215 225 220 220 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Europe */}
        <path
          d="M 440 90 Q 460 80 480 85 Q 500 80 510 95 Q 520 110 510 125 Q 500 135 485 130 Q 470 140 455 130 Q 440 120 435 105 Q 438 95 440 90 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Africa */}
        <path
          d="M 460 160 Q 480 150 500 160 Q 520 180 525 210 Q 530 250 520 280 Q 510 310 495 320 Q 475 325 460 310 Q 445 290 440 260 Q 435 230 440 200 Q 445 175 460 160 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Asia */}
        <path
          d="M 540 70 Q 580 60 620 75 Q 660 80 700 90 Q 740 100 760 120 Q 770 140 750 155 Q 730 170 700 165 Q 670 175 640 160 Q 610 150 580 140 Q 555 125 545 105 Q 538 85 540 70 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
        {/* Australia */}
        <path
          d="M 720 280 Q 750 270 780 280 Q 800 295 795 315 Q 785 330 765 335 Q 745 330 730 315 Q 718 300 720 280 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.8"
        />
      </svg>

      <div className="absolute bottom-5 left-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-coral animate-pulse-ring" />
          <span className="text-[10px] font-mono text-silver-dim">Active Project</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-silver-dim" />
          <span className="text-[10px] font-mono text-silver-dim">Click to explore</span>
        </div>
      </div>
    </div>
  );
}
