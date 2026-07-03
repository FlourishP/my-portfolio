export function GridCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="grid-large"
            width="300"
            height="300"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 300 0 L 0 0 0 300"
              fill="none"
              stroke="rgba(249,112,102,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#grid-large)" />
      </svg>

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-coral/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <div className="absolute bottom-5 left-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-coral animate-pulse-ring" />
          <span className="text-[10px] font-mono text-silver-dim">
            Active Project
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-silver-dim" />
          <span className="text-[10px] font-mono text-silver-dim">
            Click to explore
          </span>
        </div>
      </div>
    </div>
  );
}
