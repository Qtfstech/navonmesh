import React from "react";

export function NavonmeshBrandGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative isolate flex flex-col items-center select-none w-full ${className}`}>
      {/* National Tech Conclave Top Ribbon */}
      <div className="conclave-top-ribbon mb-1.5 sm:mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-night-deep/90 px-3.5 sm:px-4 py-0.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest backdrop-blur-md shadow-lg shadow-black/50">
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-[#FF671F] shadow-sm shadow-[#FF671F]" />
          <span className="size-1.5 rounded-full bg-white shadow-sm" />
          <span className="size-1.5 rounded-full bg-[#10B981] shadow-sm shadow-[#10B981]" />
        </span>
        <span className="conclave-ribbon-title bg-gradient-to-r from-[#FFA143] via-white to-emerald-300 bg-clip-text text-transparent uppercase">
          NATIONAL TECH CONCLAVE
        </span>
        <span className="conclave-ribbon-divider text-white/30 font-light">|</span>
        <span className="text-signal font-mono">2026 EDITION</span>
      </div>

      {/* Main Big Graphic Title SVG - Flag Coloured High-Impact Typography */}
      <div className="relative w-full max-w-[390px] sm:max-w-[580px] md:max-w-[760px] lg:max-w-[900px] flex items-center justify-center">
        <svg
          viewBox="0 0 880 155"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* National Flag Tricolor Gradient: Saffron -> White -> India Green */}
            <linearGradient id="flagTricolor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF671F" />
              <stop offset="14%" stopColor="#FF9933" />
              <stop offset="28%" stopColor="#FFA64D" />
              <stop offset="42%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F8FAFC" />
              <stop offset="58%" stopColor="#FFFFFF" />
              <stop offset="72%" stopColor="#34D399" />
              <stop offset="86%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#046A38" />
            </linearGradient>

            {/* National Flag Tricolor Gradient for Light Mode (High Contrast with Ashoka Blue Accent) */}
            <linearGradient id="flagTricolorLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="18%" stopColor="#F97316" />
              <stop offset="34%" stopColor="#FB923C" />
              <stop offset="44%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="56%" stopColor="#1E3A8A" />
              <stop offset="68%" stopColor="#10B981" />
              <stop offset="84%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Specular Top Shimmer Gradient */}
            <linearGradient id="specularOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.25)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
            </linearGradient>

            {/* Tricolor Laser Line Gradient */}
            <linearGradient id="laserTricolor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 103, 31, 0)" />
              <stop offset="20%" stopColor="#FF671F" />
              <stop offset="40%" stopColor="#FFA143" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#34D399" />
              <stop offset="80%" stopColor="#10B981" />
              <stop offset="100%" stopColor="rgba(4, 106, 56, 0)" />
            </linearGradient>

            {/* Vibrant Glow Filter */}
            <filter id="tricolorGlow" x="-20%" y="-20%" width="140%" height="140%">
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

          {/* Left Decorative Saffron Tech Caliper */}
          <path d="M 50 38 L 30 38 L 30 115 L 50 115" stroke="#FF9933" strokeWidth="2.5" strokeOpacity="0.8" fill="none" />
          <circle cx="30" cy="76" r="3" fill="#FF671F" />

          {/* Right Decorative Green Tech Caliper */}
          <path d="M 830 38 L 850 38 L 850 115 L 830 115" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.8" fill="none" />
          <circle cx="850" cy="76" r="3" fill="#046A38" />

          {/* Dark Mode Wordmark (Default) */}
          <g className="navonmesh-wordmark-dark">
            <text
              x="440"
              y="112"
              textAnchor="middle"
              fontFamily="var(--font-display, system-ui, -apple-system, sans-serif)"
              fontSize="106"
              fontWeight="900"
              letterSpacing="3"
              fill="url(#flagTricolor)"
              filter="url(#tricolorGlow)"
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

          {/* Light Mode Wordmark (High-Contrast Saffron-Chakra-Green) */}
          <g className="navonmesh-wordmark-light">
            <text
              x="440"
              y="112"
              textAnchor="middle"
              fontFamily="var(--font-display, system-ui, -apple-system, sans-serif)"
              fontSize="106"
              fontWeight="900"
              letterSpacing="3"
              fill="url(#flagTricolorLight)"
              stroke="rgba(15, 23, 42, 0.2)"
              strokeWidth="1.5"
              className="tracking-wider uppercase"
            >
              NAVONMESH
            </text>
          </g>

          {/* Central Laser Waveguide Line with National Colors */}
          <line x1="60" y1="132" x2="820" y2="132" stroke="url(#laserTricolor)" strokeWidth="3" strokeLinecap="round" />

          {/* Core Telemetry Signal Nodes: Saffron, White, Green */}
          <circle cx="60" cy="132" r="3.5" fill="#FF671F" />
          <circle cx="250" cy="132" r="2.5" fill="#FFA143" />
          <circle cx="440" cy="132" r="4.5" fill="#FFFFFF" stroke="#000080" strokeWidth="1.5" />
          <circle cx="630" cy="132" r="2.5" fill="#34D399" />
          <circle cx="820" cy="132" r="3.5" fill="#046A38" />
        </svg>

        {/* Live Holographic 2026 Floating Chip */}
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:right-1 md:right-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/60 bg-night-deep/95 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-extrabold text-signal shadow-xl shadow-signal/30 backdrop-blur-md ring-1 ring-white/20">
            <span className="size-1.5 sm:size-2 rounded-full bg-signal animate-ping" />
            2026
          </span>
        </div>
      </div>

      {/* Directly below NAVONMESH: An Initiative by Koushalam */}
      <div className="mt-1 sm:mt-1.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-night-deep/90 px-4 sm:px-5 py-1 text-xs sm:text-sm font-medium backdrop-blur-md shadow-md shadow-black/40">
        <span className="text-night-foreground/70 tracking-wide text-xs sm:text-sm">
          An initiative by
        </span>
        <span className="font-display font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-emerald-300">
          Koushalam
        </span>
      </div>
    </div>
  );
}
