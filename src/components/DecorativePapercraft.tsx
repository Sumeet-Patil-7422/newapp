import React from 'react';

export const BabysBreathSprig: React.FC<{ className?: string; flipped?: boolean }> = ({ className = 'w-16 h-16', flipped = false }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} ${flipped ? 'scale-x-[-1]' : ''} pointer-events-none select-none`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main golden/olive stem with papercraft texture */}
    <path
      d="M10 90 C30 80 40 55 55 35 C65 20 75 15 88 10"
      stroke="#C9A24B"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M35 68 C45 60 55 62 68 55"
      stroke="#C9A24B"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M48 45 C42 35 32 30 25 22"
      stroke="#C9A24B"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M62 30 C70 34 78 32 85 38"
      stroke="#C9A24B"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.75"
    />

    {/* Delicate baby's-breath white blossoms with paper drop shadows */}
    <g filter="drop-shadow(0 2px 3px rgba(90, 56, 37, 0.2))">
      <circle cx="88" cy="10" r="5" fill="#FFFFFF" />
      <circle cx="88" cy="10" r="2" fill="#F4B6C2" />

      <circle cx="94" cy="18" r="4" fill="#FFFFFF" />
      <circle cx="80" cy="12" r="3.5" fill="#FFFFFF" />

      <circle cx="68" cy="55" r="4.5" fill="#FFFFFF" />
      <circle cx="68" cy="55" r="1.8" fill="#F4B6C2" />
      <circle cx="75" cy="58" r="3.5" fill="#FFFFFF" />

      <circle cx="25" cy="22" r="4.5" fill="#FFFFFF" />
      <circle cx="25" cy="22" r="1.8" fill="#F4B6C2" />
      <circle cx="20" cy="17" r="3" fill="#FFFFFF" />

      <circle cx="85" cy="38" r="4.5" fill="#FFFFFF" />
      <circle cx="85" cy="38" r="1.8" fill="#F4B6C2" />

      <circle cx="55" cy="35" r="4" fill="#FFFFFF" />
    </g>
  </svg>
);

export const WhiskIcon: React.FC<{ className?: string; color?: string }> = ({ className = 'w-5 h-5', color = '#5A3825' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v6" />
    <path d="M10 8h4" />
    <path d="M8 8c0 4 1.5 8 4 14 2.5-6 4-10 4-14" />
    <path d="M10 8c-1 3-1 7 2 11" />
    <path d="M14 8c1 3 1 7-2 11" />
  </svg>
);

export const PipingBagIcon: React.FC<{ className?: string; color?: string }> = ({ className = 'w-5 h-5', color = '#A83255' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l12 12-3 3-12-12 3-3z" fill="#F4B6C2" fillOpacity="0.4" />
    <path d="M17 17l4 4-2 1-1-2" />
    <path d="M14 8l2 2" />
    <path d="M10 12l2 2" />
    <path d="M21 21c-1 0-2 1-3 0" strokeDasharray="1 1" />
  </svg>
);

export const ChefHatIcon: React.FC<{ className?: string; color?: string }> = ({ className = 'w-5 h-5', color = '#A83255' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 17h12a1 1 0 0 0 1-1v-2H5v2a1 1 0 0 0 1 1z" fill="#FBF3DE" />
    <path d="M5 14a4 4 0 0 1-1-7.8 4.5 4.5 0 0 1 8-1.7 4.5 4.5 0 0 1 8 1.7A4 4 0 0 1 19 14" />
    <line x1="8" y1="17" x2="8" y2="14" />
    <line x1="12" y1="17" x2="12" y2="14" />
    <line x1="16" y1="17" x2="16" y2="14" />
  </svg>
);

export const PaperHeart: React.FC<{ className?: string; color?: string }> = ({ className = 'w-4 h-4', color = '#A83255' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={color} filter="drop-shadow(0 2px 3px rgba(90, 56, 37, 0.2))">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const GoldCircularFrame: React.FC<{ children: React.ReactNode; size?: string; className?: string }> = ({
  children,
  size = 'w-28 h-28',
  className = '',
}) => (
  <div className={`relative ${size} ${className} flex items-center justify-center`}>
    {/* Outer gold ring */}
    <div className="absolute inset-0 rounded-full border-2 border-[#C9A24B] shadow-md shadow-[#5A3825]/15" />
    {/* Inner delicate dotted frame */}
    <div className="absolute inset-1 rounded-full border border-dashed border-[#C9A24B]/70" />
    {/* Background warm disc */}
    <div className="absolute inset-2 rounded-full bg-[#FBF3DE] overflow-hidden flex items-center justify-center">
      {children}
    </div>
  </div>
);

// High fidelity Papercraft Item Illustration for product cards
export const PapercraftItemGraphic: React.FC<{ category: string; id: string; className?: string }> = ({
  category,
  id,
  className = 'w-full h-full',
}) => {
  if (category === 'cakes') {
    const isBerry = id.includes('raspberry') || id.includes('rose');
    const isBiscoff = id.includes('biscoff');
    const isRedVelvet = id.includes('velvet');
    const isMango = id.includes('mango');

    const cakeColor = isBerry ? '#F4B6C2' : isBiscoff ? '#E1B879' : isRedVelvet ? '#8B263E' : isMango ? '#F5B041' : '#4A2A18';
    const dripColor = isBerry ? '#A83255' : isBiscoff ? '#8D5B29' : isRedVelvet ? '#FFFFFF' : isMango ? '#E67E22' : '#2C160B';

    return (
      <svg viewBox="0 0 160 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={`paper-shadow-${id}`} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#5A3825" floodOpacity="0.25" />
          </filter>
        </defs>
        {/* Cake Stand / Plate */}
        <ellipse cx="80" cy="118" rx="60" ry="10" fill="#E8DBC0" />
        <ellipse cx="80" cy="116" rx="56" ry="8" fill="#FFFFFF" stroke="#C9A24B" strokeWidth="1.5" />

        {/* Cake Base Sponge */}
        <g filter={`url(#paper-shadow-${id})`}>
          <rect x="36" y="58" width="88" height="50" rx="6" fill={cakeColor} />
          <ellipse cx="80" cy="58" rx="44" ry="12" fill={cakeColor} />

          {/* Chocolate / Caramel Drip Layer */}
          <path
            d="M36 60 C36 60 42 75 48 70 C54 65 58 78 65 72 C72 66 78 82 85 74 C92 66 98 80 106 72 C114 64 120 74 124 60 L124 58 L36 58 Z"
            fill={dripColor}
          />
          <ellipse cx="80" cy="58" rx="44" ry="11" fill={dripColor} />

          {/* Rosettes / Cream swirls */}
          <circle cx="48" cy="52" r="7" fill={isRedVelvet ? '#FFFFFF' : '#FBF3DE'} stroke={isRedVelvet ? '#C9A24B' : 'none'} />
          <circle cx="64" cy="48" r="8" fill={isRedVelvet ? '#FFFFFF' : '#FBF3DE'} stroke={isRedVelvet ? '#C9A24B' : 'none'} />
          <circle cx="80" cy="46" r="9" fill={isRedVelvet ? '#FFFFFF' : '#FBF3DE'} stroke={isRedVelvet ? '#C9A24B' : 'none'} />
          <circle cx="96" cy="48" r="8" fill={isRedVelvet ? '#FFFFFF' : '#FBF3DE'} stroke={isRedVelvet ? '#C9A24B' : 'none'} />
          <circle cx="112" cy="52" r="7" fill={isRedVelvet ? '#FFFFFF' : '#FBF3DE'} stroke={isRedVelvet ? '#C9A24B' : 'none'} />

          {/* Toppings: Berry or Chocolate Curls */}
          {isBerry ? (
            <g>
              <path d="M76 42 C72 36 84 34 84 42 Z" fill="#A83255" />
              <path d="M68 44 C66 40 74 38 74 44 Z" fill="#D32F2F" />
              <circle cx="80" cy="36" r="3" fill="#A83255" />
              <path d="M78 33 L80 30 L82 33" stroke="#4CAF50" strokeWidth="1.5" />
            </g>
          ) : isMango ? (
            <g>
              <rect x="74" y="38" width="12" height="8" rx="2" fill="#F39C12" transform="rotate(-15 74 38)" />
              <rect x="84" y="39" width="10" height="7" rx="2" fill="#F1C40F" transform="rotate(20 84 39)" />
            </g>
          ) : (
            <g>
              {/* Chocolate slab & berries */}
              <rect x="72" y="36" width="14" height="10" rx="1.5" fill="#3D1E10" transform="rotate(-12 72 36)" />
              <circle cx="90" cy="42" r="3.5" fill="#A83255" />
              <circle cx="68" cy="44" r="3.5" fill="#3949AB" />
            </g>
          )}
        </g>
      </svg>
    );
  }

  if (category === 'cupcakes') {
    return (
      <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="70" cy="116" rx="40" ry="6" fill="#E8DBC0" />
        {/* Cupcake Liner */}
        <polygon points="45,74 95,74 88,114 52,114" fill="#5A3825" />
        <path d="M48 74 L54 114 M58 74 L62 114 M68 74 L70 114 M78 74 L78 114 M88 74 L84 114" stroke="#7A4D33" strokeWidth="1.2" />

        {/* Swirled Frosting with papercraft layers */}
        <g filter="drop-shadow(0 4px 5px rgba(90, 56, 37, 0.2))">
          {/* Bottom swirl tier */}
          <path d="M40 76 C40 68 50 64 70 64 C90 64 100 68 100 76 C100 80 90 82 70 82 C50 82 40 80 40 76 Z" fill="#F4B6C2" />
          {/* Middle swirl */}
          <path d="M48 64 C48 54 58 50 70 50 C82 50 92 54 92 64 C92 70 82 72 70 72 C58 72 48 70 48 64 Z" fill="#F8C9D3" />
          {/* Top dollop */}
          <path d="M58 52 C58 42 64 38 70 38 C76 38 82 42 82 52 C82 56 76 58 70 58 C64 58 58 56 58 52 Z" fill="#FFFFFF" />

          {/* Fondant Heart on top */}
          <path
            d="M70 36 C68 32 64 32 64 35 C64 38 70 42 70 42 C70 42 76 38 76 35 C76 32 72 32 70 36 Z"
            fill="#A83255"
          />
        </g>
      </svg>
    );
  }

  if (category === 'cookies') {
    return (
      <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="70" cy="116" rx="45" ry="7" fill="#E8DBC0" />
        <g filter="drop-shadow(0 5px 6px rgba(90, 56, 37, 0.22))">
          {/* Back cookie */}
          <ellipse cx="85" cy="65" rx="35" ry="32" fill="#D4A76A" />
          <circle cx="75" cy="55" r="4.5" fill="#4A2A18" />
          <circle cx="95" cy="52" r="5" fill="#4A2A18" />
          <circle cx="92" cy="74" r="4" fill="#4A2A18" />

          {/* Front cookie */}
          <ellipse cx="58" cy="78" rx="38" ry="34" fill="#DEB887" stroke="#C9A24B" strokeWidth="1" />
          {/* Chunky chocolate chips */}
          <circle cx="45" cy="68" r="5.5" fill="#3D1E10" />
          <circle cx="68" cy="64" r="6" fill="#3D1E10" />
          <circle cx="58" cy="88" r="5" fill="#3D1E10" />
          <circle cx="78" cy="84" r="5.5" fill="#3D1E10" />
          <circle cx="42" cy="85" r="4" fill="#3D1E10" />
          {/* Sea salt flakes */}
          <rect x="52" y="74" width="3" height="3" fill="#FFFFFF" transform="rotate(45 52 74)" />
          <rect x="72" y="72" width="3" height="3" fill="#FFFFFF" transform="rotate(30 72 72)" />
        </g>
      </svg>
    );
  }

  if (category === 'macarons') {
    return (
      <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="70" cy="116" rx="42" ry="6" fill="#E8DBC0" />
        <g filter="drop-shadow(0 4px 6px rgba(90, 56, 37, 0.2))">
          {/* Bottom Macaron (Pastel Pistachio) */}
          <ellipse cx="64" cy="92" rx="32" ry="10" fill="#A8D5BA" />
          <rect x="36" y="86" width="56" height="5" rx="2" fill="#F4B6C2" />
          <ellipse cx="64" cy="84" rx="32" ry="10" fill="#A8D5BA" />

          {/* Top Macaron (Blush Raspberry) */}
          <ellipse cx="76" cy="62" rx="34" ry="11" fill="#F4B6C2" stroke="#C9A24B" strokeWidth="0.8" />
          <rect x="46" y="56" width="60" height="6" rx="2" fill="#A83255" />
          <ellipse cx="76" cy="52" rx="34" ry="11" fill="#F8C9D3" stroke="#C9A24B" strokeWidth="0.8" />
        </g>
      </svg>
    );
  }

  if (category === 'brownies') {
    return (
      <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="70" cy="116" rx="44" ry="7" fill="#E8DBC0" />
        <g filter="drop-shadow(0 6px 8px rgba(90, 56, 37, 0.25))">
          {/* Fudgy brownie square */}
          <polygon points="35,65 95,45 115,75 55,95" fill="#381D11" />
          <polygon points="35,65 55,95 55,108 35,78" fill="#241108" />
          <polygon points="55,95 115,75 115,88 55,108" fill="#2C150A" />

          {/* Crinkle top texture */}
          <path d="M48 68 L60 64 L75 70 L90 56" stroke="#5A3825" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="68" cy="76" r="3" fill="#DEB887" />
          <circle cx="85" cy="65" r="3.5" fill="#DEB887" />
          {/* Sea salt */}
          <rect x="62" y="70" width="2.5" height="2.5" fill="#FFFFFF" transform="rotate(45 62 70)" />
        </g>
      </svg>
    );
  }

  // Default: Gifting / Hamper Box
  return (
    <svg viewBox="0 0 140 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="70" cy="116" rx="46" ry="7" fill="#E8DBC0" />
      <g filter="drop-shadow(0 5px 8px rgba(90, 56, 37, 0.22))">
        {/* Gift Box Body */}
        <rect x="36" y="60" width="68" height="48" rx="6" fill="#FBF3DE" stroke="#C9A24B" strokeWidth="1.5" />
        {/* Lid */}
        <rect x="32" y="52" width="76" height="12" rx="4" fill="#A83255" />
        {/* Gold Ribbon Vertical */}
        <rect x="66" y="52" width="8" height="56" fill="#C9A24B" />
        {/* Gold Ribbon Horizontal */}
        <rect x="36" y="78" width="68" height="7" fill="#C9A24B" />

        {/* Blush Bow on top */}
        <ellipse cx="62" cy="48" rx="8" ry="5" fill="#F4B6C2" transform="rotate(-25 62 48)" />
        <ellipse cx="78" cy="48" rx="8" ry="5" fill="#F4B6C2" transform="rotate(25 78 48)" />
        <circle cx="70" cy="48" r="4" fill="#A83255" />
      </g>
    </svg>
  );
};
