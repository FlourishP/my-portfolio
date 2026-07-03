"use client";

interface WorldMapProps {
  showGrid?: boolean;
}

export function WorldMap({ showGrid = true }: WorldMapProps) {
  return (
    <div className="w-full h-full bg-surface">
      <svg
        className="w-full h-full"
        viewBox="0 0 12000 12000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Micro grid */}
          <pattern id="micro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(122,139,166,0.04)" strokeWidth="0.3" />
          </pattern>
          {/* City block grid */}
          <pattern id="city-grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#micro-grid)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(122,139,166,0.07)" strokeWidth="0.6" />
          </pattern>
          {/* Neon glow filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid that tiles infinitely */}
        {showGrid && <rect width="12000" height="12000" fill="url(#city-grid)" />}

        {/* === HORIZONTAL MAJOR ROUTES === */}
        {Array.from({ length: 30 }, (_, i) => {
          const y = 200 + i * 400;
          return (
            <g key={`hr${i}`}>
              <line x1="0" y1={y} x2="12000" y2={y} stroke="rgba(122,139,166,0.08)" strokeWidth="4" />
              <line x1="0" y1={y} x2="12000" y2={y} stroke="rgba(255,87,51,0.12)" strokeWidth="1.5" filter="url(#glow)" />
            </g>
          );
        })}

        {/* === VERTICAL MAJOR ROUTES === */}
        {Array.from({ length: 30 }, (_, i) => {
          const x = 200 + i * 400;
          return (
            <g key={`vr${i}`}>
              <line x1={x} y1="0" x2={x} y2="12000" stroke="rgba(122,139,166,0.08)" strokeWidth="4" />
              <line x1={x} y1="0" x2={x} y2="12000" stroke="rgba(255,87,51,0.12)" strokeWidth="1.5" filter="url(#glow)" />
            </g>
          );
        })}

        {/* === SECONDARY STREETS (horizontal) === */}
        {showGrid && Array.from({ length: 60 }, (_, i) => {
          const y = 100 + i * 200;
          return (
            <line key={`sh${i}`} x1="0" y1={y} x2="12000" y2={y} stroke="rgba(122,139,166,0.03)" strokeWidth="0.8" strokeDasharray="6 3" />
          );
        })}

        {/* === SECONDARY STREETS (vertical) === */}
        {showGrid && Array.from({ length: 60 }, (_, i) => {
          const x = 100 + i * 200;
          return (
            <line key={`sv${i}`} x1={x} y1="0" x2={x} y2="12000" stroke="rgba(122,139,166,0.03)" strokeWidth="0.8" strokeDasharray="6 3" />
          );
        })}

        {/* === TILED CITY BLOCKS === */}
        {Array.from({ length: 12 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => {
            const ox = col * 1000 + 40;
            const oy = row * 1000 + 30;
            return (
              <g key={`block${row}-${col}`} opacity="0.7">
                {/* Main block */}
                <rect x={ox} y={oy} width="160" height="100" rx="3" fill="rgba(122,139,166,0.025)" stroke="rgba(122,139,166,0.06)" strokeWidth="0.5" />
                {/* Sub buildings */}
                <rect x={ox + 10} y={oy + 10} width="50" height="35" rx="1.5" fill="rgba(122,139,166,0.02)" stroke="rgba(122,139,166,0.04)" strokeWidth="0.3" />
                <rect x={ox + 70} y={oy + 10} width="40" height="35" rx="1.5" fill="rgba(122,139,166,0.02)" stroke="rgba(122,139,166,0.04)" strokeWidth="0.3" />
                <rect x={ox + 120} y={oy + 10} width="30" height="35" rx="1.5" fill="rgba(122,139,166,0.02)" stroke="rgba(122,139,166,0.04)" strokeWidth="0.3" />
                <rect x={ox + 10} y={oy + 55} width="140" height="30" rx="1.5" fill="rgba(122,139,166,0.015)" stroke="rgba(122,139,166,0.035)" strokeWidth="0.3" />
              </g>
            );
          })
        )}

        {/* === TILED PARKS === */}
        {Array.from({ length: 6 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => {
            const px = col * 2000 + 300;
            const py = row * 2000 + 250;
            return (
              <g key={`park${row}-${col}`} opacity="0.6">
                <rect x={px} y={py} width="100" height="70" rx="8" fill="rgba(52,211,153,0.025)" stroke="rgba(52,211,153,0.06)" strokeWidth="0.5" />
                <circle cx={px + 25} cy={py + 25} r="5" fill="rgba(52,211,153,0.04)" />
                <circle cx={px + 55} cy={py + 20} r="3.5" fill="rgba(52,211,153,0.03)" />
                <circle cx={px + 40} cy={py + 45} r="4" fill="rgba(52,211,153,0.035)" />
              </g>
            );
          })
        )}

        {/* === INTERSECTION DOTS (tiled) === */}
        {showGrid && Array.from({ length: 30 }, (_, row) =>
          Array.from({ length: 30 }, (_, col) => (
            <circle
              key={`dot${row}-${col}`}
              cx={200 + col * 400}
              cy={200 + row * 400}
              r="2"
              fill="rgba(255,87,51,0.15)"
              filter="url(#glow)"
            />
          ))
        )}

        {/* === COMPASS (bottom-right corner) === */}
        <g transform="translate(11850, 11850)">
          <circle cx="0" cy="0" r="30" fill="rgba(5,5,8,0.7)" stroke="rgba(122,139,166,0.12)" strokeWidth="1" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(122,139,166,0.15)" strokeWidth="0.8" />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(122,139,166,0.15)" strokeWidth="0.8" />
          <polygon points="0,-18 -4,-8 4,-8" fill="rgba(255,87,51,0.7)" filter="url(#glow)" />
          <polygon points="0,18 -4,8 4,8" fill="rgba(122,139,166,0.2)" />
          <text x="0" y="-34" textAnchor="middle" className="fill-coral" fontSize="10" fontFamily="monospace" fontWeight="bold">N</text>
          <text x="0" y="44" textAnchor="middle" className="fill-white/15" fontSize="9" fontFamily="monospace">S</text>
          <text x="38" y="4" textAnchor="middle" className="fill-white/15" fontSize="9" fontFamily="monospace">E</text>
          <text x="-38" y="4" textAnchor="middle" className="fill-white/15" fontSize="9" fontFamily="monospace">W</text>
        </g>

        {/* === SCALE BAR (bottom-left) === */}
        <g transform="translate(100, 11900)">
          <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(255,87,51,0.25)" strokeWidth="1.5" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(255,87,51,0.25)" strokeWidth="1" />
          <line x1="120" y1="-5" x2="120" y2="5" stroke="rgba(255,87,51,0.25)" strokeWidth="1" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(255,87,51,0.15)" strokeWidth="0.5" />
          <text x="0" y="16" className="fill-white/15" fontSize="8" fontFamily="monospace">0</text>
          <text x="120" y="16" textAnchor="middle" className="fill-white/15" fontSize="8" fontFamily="monospace">5 km</text>
        </g>

        {/* === LEGEND (top-left) === */}
        <g transform="translate(100, 100)">
          <rect x="-15" y="-20" width="150" height="90" rx="8" fill="rgba(5,5,8,0.75)" stroke="rgba(255,87,51,0.08)" strokeWidth="0.8" />
          <circle cx="5" cy="0" r="3.5" fill="rgba(255,87,51,0.85)" filter="url(#glow)" />
          <text x="18" y="4" className="fill-white/45" fontSize="9" fontFamily="monospace">Active Project</text>
          <rect x="-1" y="18" width="14" height="10" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
          <text x="18" y="27" className="fill-white/45" fontSize="9" fontFamily="monospace">City Block</text>
          <rect x="-1" y="38" width="14" height="10" rx="2" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.08)" strokeWidth="0.5" />
          <text x="18" y="47" className="fill-white/45" fontSize="9" fontFamily="monospace">Park / Green</text>
        </g>
      </svg>
    </div>
  );
}
