import React from "react";

// Wordmark colours follow the Navonmesh logo: blue → green → orange.
export function NavonmeshBrandGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative isolate flex flex-col items-center select-none w-full ${className}`}>
      {/* Main Big Graphic Title SVG */}
      <div className="relative w-full max-w-[390px] sm:max-w-[580px] md:max-w-[760px] lg:max-w-[900px] short:max-w-[620px] flex flex-col items-center justify-center">
        {/* Small Navonmesh logo in its own row at the top-left corner, so it never overlaps the wordmark */}
        <img
          src="/navonmesh-logo.jpeg"
          alt="Navonmesh — Ideas, Innovation, Impact"
          className="self-start h-7 w-auto rounded-md bg-white object-contain shadow-xl ring-1 ring-white/30 sm:h-9 md:h-11"
        />
        <div className="relative w-full">
        <svg
          viewBox="0 0 880 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* Logo gradient: Blue -> Green -> Orange */}
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1565C0" />
              <stop offset="18%" stopColor="#1E88E5" />
              <stop offset="36%" stopColor="#1FA2B8" />
              <stop offset="52%" stopColor="#43A047" />
              <stop offset="66%" stopColor="#8BC34A" />
              <stop offset="82%" stopColor="#F7941D" />
              <stop offset="100%" stopColor="#EF6C00" />
            </linearGradient>

            {/* Logo-coloured Laser Line Gradient */}
            <linearGradient id="laserBrand" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(21, 101, 192, 0)" />
              <stop offset="20%" stopColor="#1E88E5" />
              <stop offset="50%" stopColor="#43A047" />
              <stop offset="80%" stopColor="#F7941D" />
              <stop offset="100%" stopColor="rgba(239, 108, 0, 0)" />
            </linearGradient>

            {/* Vibrant Glow Filter */}
            <filter id="brandGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Ambient Grid Ticks */}
          <line x1="40" y1="22" x2="840" y2="22" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="4 8" strokeWidth="1" />
          <line x1="40" y1="130" x2="840" y2="130" stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="4 8" strokeWidth="1" />

          {/* Left Decorative Blue Tech Caliper */}
          <path d="M 50 38 L 30 38 L 30 115 L 50 115" stroke="#1E88E5" strokeWidth="2.5" strokeOpacity="0.8" fill="none" />
          <circle cx="30" cy="76" r="3" fill="#1565C0" />

          {/* Right Decorative Orange Tech Caliper */}
          <path d="M 830 38 L 850 38 L 850 115 L 830 115" stroke="#F7941D" strokeWidth="2.5" strokeOpacity="0.8" fill="none" />
          <circle cx="850" cy="76" r="3" fill="#EF6C00" />

          {/* Wordmark */}
          <g>
            <text
              x="440"
              y="112"
              textAnchor="middle"
              fontFamily="var(--font-display, system-ui, -apple-system, sans-serif)"
              fontSize="106"
              fontWeight="900"
              letterSpacing="3"
              fill="url(#brandGradient)"
              filter="url(#brandGlow)"
              className="tracking-wider uppercase"
            >
              NAVONMESH
            </text>
            <text
              x="440"
              y="112"
              textAnchor="middle"
              fontFamily="var(--font-display, system-ui, -apple-system, sans-serif)"
              fontSize="106"
              fontWeight="900"
              letterSpacing="3"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              fill="none"
              className="tracking-wider uppercase"
            >
              NAVONMESH
            </text>
          </g>

          {/* Central Laser Waveguide Line in logo colours */}
          <line x1="60" y1="132" x2="820" y2="132" stroke="url(#laserBrand)" strokeWidth="3" strokeLinecap="round" />

          {/* Signal Nodes: Blue, Green, Orange */}
          <circle cx="60" cy="132" r="3.5" fill="#1565C0" />
          <circle cx="250" cy="132" r="2.5" fill="#1E88E5" />
          <circle cx="440" cy="132" r="4.5" fill="#43A047" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="630" cy="132" r="2.5" fill="#F7941D" />
          <circle cx="820" cy="132" r="3.5" fill="#EF6C00" />
        </svg>

        {/* Live Holographic 2026 Chip, tucked against the end of the wordmark */}
        <div className="absolute -top-2 sm:-top-3 right-[10%]">
          <span className="inline-flex items-center gap-1 rounded-full border border-signal/60 bg-night-deep/95 px-1.5 sm:px-2 py-px font-mono text-[8px] sm:text-[9px] font-extrabold text-signal shadow-lg shadow-signal/30 backdrop-blur-md ring-1 ring-white/20">
            <span className="size-1 sm:size-1.5 rounded-full bg-signal animate-ping" />
            2026
          </span>
        </div>
        </div>
      </div>

      {/* Theme line directly below NAVONMESH */}
      <p className="mt-1.5 sm:mt-2 font-display text-sm font-semibold tracking-wide text-white/90 sm:text-lg">
        Catalysing India’s 5G Vision, Industry 4.0 &amp; Beyond
      </p>

      {/* Highlighted BSNL Koushalam initiative tagline */}
      <div className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-amber-300/70 bg-gradient-to-r from-amber-500/25 via-night-deep/95 to-emerald-500/25 px-5 sm:px-6 py-1.5 backdrop-blur-md shadow-[0_0_28px_rgba(252,211,77,0.35)] ring-1 ring-white/20">
        <span className="size-2 rounded-full bg-amber-300 animate-pulse" />
        <span className="text-white/90 font-semibold tracking-wide text-xs sm:text-base">
          An initiative by
        </span>
        <span className="font-display text-sm sm:text-lg font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-emerald-300">
          BSNL Koushalam
        </span>
      </div>
    </div>
  );
}
