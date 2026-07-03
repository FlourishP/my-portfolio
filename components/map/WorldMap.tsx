"use client";

interface WorldMapProps {
  showGrid?: boolean;
}

export function WorldMap({ showGrid = true }: WorldMapProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="small-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(122,139,166,0.06)" strokeWidth="0.5" />
          </pattern>
          <pattern id="large-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#small-grid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(122,139,166,0.10)" strokeWidth="1" />
          </pattern>
          <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,87,51,0.0)" />
            <stop offset="30%" stopColor="rgba(255,87,51,0.6)" />
            <stop offset="70%" stopColor="rgba(255,87,51,0.6)" />
            <stop offset="100%" stopColor="rgba(255,87,51,0.0)" />
          </linearGradient>
          <linearGradient id="route-glow-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,87,51,0.0)" />
            <stop offset="30%" stopColor="rgba(255,87,51,0.6)" />
            <stop offset="70%" stopColor="rgba(255,87,51,0.6)" />
            <stop offset="100%" stopColor="rgba(255,87,51,0.0)" />
          </linearGradient>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="neon-glow-strong">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base grid */}
        {showGrid && <rect width="100%" height="100%" fill="url(#large-grid)" />}

        {/* === MAJOR ROUTES (horizontal) - midnight slate base + neon coral glow === */}
        <line x1="0" y1="200" x2="1200" y2="200" stroke="rgba(122,139,166,0.12)" strokeWidth="6" />
        <line x1="0" y1="200" x2="1200" y2="200" stroke="url(#route-glow)" strokeWidth="2" filter="url(#neon-glow)" />

        <line x1="0" y1="400" x2="1200" y2="400" stroke="rgba(122,139,166,0.12)" strokeWidth="6" />
        <line x1="0" y1="400" x2="1200" y2="400" stroke="url(#route-glow)" strokeWidth="2" filter="url(#neon-glow)" />

        <line x1="0" y1="600" x2="1200" y2="600" stroke="rgba(122,139,166,0.12)" strokeWidth="6" />
        <line x1="0" y1="600" x2="1200" y2="600" stroke="url(#route-glow)" strokeWidth="2" filter="url(#neon-glow)" />

        {/* === MAJOR ROUTES (vertical) === */}
        <line x1="300" y1="0" x2="300" y2="800" stroke="rgba(122,139,166,0.12)" strokeWidth="6" />
        <line x1="300" y1="0" x2="300" y2="800" stroke="url(#route-glow-v)" strokeWidth="2" filter="url(#neon-glow)" />

        <line x1="600" y1="0" x2="600" y2="800" stroke="rgba(122,139,166,0.12)" strokeWidth="6" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="url(#route-glow-v)" strokeWidth="2" filter="url(#neon-glow)" />

        <line x1="900" y1="0" x2="900" y2="800" stroke="rgba(122,139,166,0.12)" strokeWidth="6" />
        <line x1="900" y1="0" x2="900" y2="800" stroke="url(#route-glow-v)" strokeWidth="2" filter="url(#neon-glow)" />

        {/* === SECONDARY STREETS (horizontal) === */}
        {showGrid && [100, 300, 500, 700].map((y) => (
          <line key={`sh${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(122,139,166,0.06)" strokeWidth="1.5" strokeDasharray="8 4" />
        ))}

        {/* === SECONDARY STREETS (vertical) === */}
        {showGrid && [150, 450, 750, 1050].map((x) => (
          <line key={`sv${x}`} x1={x} y1="0" x2={x} y2="800" stroke="rgba(122,139,166,0.06)" strokeWidth="1.5" strokeDasharray="8 4" />
        ))}

        {/* === CITY BLOCKS (buildings) - midnight slate palette === */}
        {/* Block A - Top Left */}
        <rect x="40" y="30" width="90" height="55" rx="3" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.10)" strokeWidth="0.8" />
        <rect x="50" y="38" width="30" height="20" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="90" y="38" width="25" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block B - Top Center */}
        <rect x="340" y="50" width="220" height="120" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="355" y="65" width="60" height="40" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="425" y="65" width="45" height="40" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="480" y="65" width="65" height="40" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="355" y="115" width="185" height="40" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block C - Top Right */}
        <rect x="940" y="40" width="130" height="90" rx="3" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.10)" strokeWidth="0.8" />
        <rect x="950" y="50" width="45" height="30" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="1005" y="50" width="50" height="30" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="950" y="90" width="105" height="25" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block D - Middle Left */}
        <rect x="30" y="240" width="240" height="130" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="45" y="255" width="70" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="125" y="255" width="55" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="190" y="255" width="65" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="45" y="310" width="210" height="45" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block E - Center */}
        <rect x="350" y="250" width="200" height="120" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="365" y="265" width="80" height="50" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="455" y="265" width="80" height="50" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="365" y="325" width="170" height="30" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block F - Middle Right */}
        <rect x="650" y="230" width="220" height="140" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="665" y="245" width="90" height="55" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="765" y="245" width="90" height="55" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="665" y="310" width="190" height="45" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block G - Far Right */}
        <rect x="940" y="250" width="140" height="110" rx="3" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.10)" strokeWidth="0.8" />
        <rect x="955" y="265" width="55" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="1020" y="265" width="45" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="955" y="310" width="110" height="30" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block H - Bottom Left */}
        <rect x="50" y="440" width="220" height="130" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="65" y="455" width="60" height="40" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="135" y="455" width="60" height="40" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="205" y="455" width="50" height="40" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="65" y="505" width="190" height="45" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block I - Bottom Center */}
        <rect x="340" y="430" width="230" height="140" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="355" y="445" width="100" height="55" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="465" y="445" width="90" height="55" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="355" y="510" width="200" height="45" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block J - Bottom Right */}
        <rect x="650" y="440" width="230" height="130" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="665" y="455" width="70" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="745" y="455" width="60" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="815" y="455" width="50" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="665" y="510" width="200" height="45" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block K - Far Bottom Right */}
        <rect x="940" y="440" width="140" height="120" rx="3" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.10)" strokeWidth="0.8" />
        <rect x="955" y="455" width="50" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="1015" y="455" width="50" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="955" y="500" width="110" height="40" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block L - Very Bottom */}
        <rect x="100" y="640" width="180" height="100" rx="3" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.10)" strokeWidth="0.8" />
        <rect x="115" y="655" width="60" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="185" y="655" width="75" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="115" y="700" width="145" height="25" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block M - Very Bottom Center */}
        <rect x="400" y="630" width="200" height="110" rx="4" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.09)" strokeWidth="0.8" />
        <rect x="415" y="645" width="80" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="505" y="645" width="80" height="45" rx="2" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.08)" strokeWidth="0.5" />
        <rect x="415" y="700" width="170" height="25" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* Block N - Very Bottom Right */}
        <rect x="700" y="640" width="180" height="100" rx="3" fill="rgba(122,139,166,0.04)" stroke="rgba(122,139,166,0.10)" strokeWidth="0.8" />
        <rect x="715" y="655" width="65" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="790" y="655" width="70" height="35" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />
        <rect x="715" y="700" width="145" height="25" rx="2" fill="rgba(122,139,166,0.03)" stroke="rgba(122,139,166,0.07)" strokeWidth="0.5" />

        {/* === PARKS / GREEN AREAS === */}
        <rect x="340" y="135" width="60" height="45" rx="6" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.10)" strokeWidth="0.8" />
        <circle cx="355" cy="150" r="4" fill="rgba(52,211,153,0.08)" />
        <circle cx="375" cy="145" r="3" fill="rgba(52,211,153,0.06)" />
        <circle cx="365" cy="160" r="3.5" fill="rgba(52,211,153,0.07)" />

        <rect x="650" y="130" width="80" height="50" rx="6" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.10)" strokeWidth="0.8" />
        <circle cx="670" cy="148" r="5" fill="rgba(52,211,153,0.08)" />
        <circle cx="695" cy="142" r="3.5" fill="rgba(52,211,153,0.06)" />
        <circle cx="685" cy="162" r="4" fill="rgba(52,211,153,0.07)" />

        <rect x="940" y="155" width="65" height="40" rx="5" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.10)" strokeWidth="0.8" />
        <circle cx="958" cy="170" r="3" fill="rgba(52,211,153,0.08)" />
        <circle cx="980" cy="168" r="4" fill="rgba(52,211,153,0.06)" />

        {/* Bottom parks */}
        <rect x="50" y="600" width="35" height="25" rx="4" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.10)" strokeWidth="0.8" />
        <rect x="1100" y="440" width="50" height="35" rx="5" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.10)" strokeWidth="0.8" />

        {/* === AIRPORT / HELIPAD === */}
        <rect x="1060" y="620" width="80" height="50" rx="3" fill="rgba(122,139,166,0.03)" stroke="rgba(255,87,51,0.15)" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="1070" y1="645" x2="1130" y2="645" stroke="rgba(255,87,51,0.2)" strokeWidth="2" />
        <line x1="1100" y1="625" x2="1100" y2="665" stroke="rgba(255,87,51,0.12)" strokeWidth="1" />
        <text x="1100" y="685" textAnchor="middle" className="fill-white/10" fontSize="7" fontFamily="monospace">HELIPAD</text>

        {/* === STREET LABELS === */}
        {showGrid && <>
          {/* Horizontal streets */}
          <text x="15" y="196" className="fill-white/15" fontSize="8" fontFamily="monospace" fontWeight="500">DEV Blvd</text>
          <text x="15" y="396" className="fill-white/15" fontSize="8" fontFamily="monospace" fontWeight="500">CODE Ave</text>
          <text x="15" y="596" className="fill-white/15" fontSize="8" fontFamily="monospace" fontWeight="500">STACK St</text>

          {/* Vertical streets */}
          <text x="304" y="18" className="fill-white/15" fontSize="8" fontFamily="monospace" fontWeight="500" writingMode="tb">REACT Rd</text>
          <text x="604" y="18" className="fill-white/15" fontSize="8" fontFamily="monospace" fontWeight="500" writingMode="tb">NODE Ln</text>
          <text x="904" y="18" className="fill-white/15" fontSize="8" fontFamily="monospace" fontWeight="500" writingMode="tb">API Way</text>

          {/* Secondary streets */}
          <text x="155" y="96" className="fill-white/8" fontSize="6" fontFamily="monospace">Git Ct</text>
          <text x="455" y="296" className="fill-white/8" fontSize="6" fontFamily="monospace">Type Pl</text>
          <text x="755" y="196" className="fill-white/8" fontSize="6" fontFamily="monospace">CSS Rd</text>
          <text x="1055" y="296" className="fill-white/8" fontSize="6" fontFamily="monospace">DB Ave</text>
        </>}

        {/* === INTERSECTION DOTS === */}
        {showGrid && [
          [300, 200], [600, 200], [900, 200],
          [300, 400], [600, 400], [900, 400],
          [300, 600], [600, 600], [900, 600],
        ].map(([cx, cy], i) => (
          <circle key={`int${i}`} cx={cx} cy={cy} r="3" fill="rgba(255,87,51,0.25)" filter="url(#neon-glow)" />
        ))}

        {/* === COMPASS === */}
        <g transform="translate(1140, 720)">
          <circle cx="0" cy="0" r="22" fill="rgba(5,5,8,0.6)" stroke="rgba(122,139,166,0.15)" strokeWidth="1" />
          <line x1="0" y1="-16" x2="0" y2="16" stroke="rgba(122,139,166,0.2)" strokeWidth="0.8" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="rgba(122,139,166,0.2)" strokeWidth="0.8" />
          <polygon points="0,-14 -3,-6 3,-6" fill="rgba(255,87,51,0.8)" filter="url(#neon-glow)" />
          <polygon points="0,14 -3,6 3,6" fill="rgba(122,139,166,0.3)" />
          <text x="0" y="-24" textAnchor="middle" className="fill-coral" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
          <text x="0" y="32" textAnchor="middle" className="fill-white/20" fontSize="7" fontFamily="monospace">S</text>
          <text x="28" y="3" textAnchor="middle" className="fill-white/20" fontSize="7" fontFamily="monospace">E</text>
          <text x="-28" y="3" textAnchor="middle" className="fill-white/20" fontSize="7" fontFamily="monospace">W</text>
        </g>

        {/* === SCALE BAR === */}
        <g transform="translate(40, 760)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="rgba(255,87,51,0.3)" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="rgba(255,87,51,0.3)" strokeWidth="1" />
          <line x1="80" y1="-4" x2="80" y2="4" stroke="rgba(255,87,51,0.3)" strokeWidth="1" />
          <line x1="40" y1="-2" x2="40" y2="2" stroke="rgba(255,87,51,0.2)" strokeWidth="0.5" />
          <text x="0" y="12" className="fill-white/20" fontSize="6" fontFamily="monospace">0</text>
          <text x="80" y="12" textAnchor="middle" className="fill-white/20" fontSize="6" fontFamily="monospace">5 km</text>
        </g>

        {/* === LEGEND === */}
        <g transform="translate(40, 40)">
          <rect x="-10" y="-15" width="120" height="70" rx="6" fill="rgba(5,5,8,0.7)" stroke="rgba(255,87,51,0.1)" strokeWidth="0.8" />
          <circle cx="5" cy="0" r="3" fill="rgba(255,87,51,0.9)" filter="url(#neon-glow)" />
          <text x="15" y="3" className="fill-white/50" fontSize="7" fontFamily="monospace">Active Project</text>
          <rect x="-1" y="14" width="12" height="8" rx="2" fill="rgba(122,139,166,0.06)" stroke="rgba(122,139,166,0.12)" strokeWidth="0.5" />
          <text x="15" y="21" className="fill-white/50" fontSize="7" fontFamily="monospace">City Block</text>
          <rect x="-1" y="30" width="12" height="8" rx="2" fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.12)" strokeWidth="0.5" />
          <text x="15" y="37" className="fill-white/50" fontSize="7" fontFamily="monospace">Park / Green</text>
        </g>
      </svg>
    </div>
  );
}
