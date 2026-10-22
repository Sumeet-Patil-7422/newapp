import React from 'react';
import { Phone, MapPin, Search } from 'lucide-react';
import { BAKERY_INFO } from '../data/products';

interface HeaderProps {
  onSearchClick?: () => void;
  onLogoClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearchBar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onLogoClick,
  searchQuery = '',
  onSearchChange,
  showSearchBar = true,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FBF3DE]/95 backdrop-blur-md border-b border-[#C9A24B]/25 px-4 py-2.5 transition-all">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
        {/* Brand Area */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          {/* Logo Avatar */}
          <div className="relative w-11 h-11 rounded-full p-0.5 bg-white border-2 border-[#C9A24B] shadow-sm overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/assets/aistudio/logo_e627eb7e.jpg"
              alt="Sweet Cravings"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-script text-2xl text-[#A83255] leading-none font-bold tracking-tight">
                Sweet Cravings
              </span>
            </div>
            <span className="text-[10px] tracking-wider font-semibold text-[#C9A24B] uppercase">
              • The Homemade •
            </span>
          </div>
        </button>

        {/* Action Controls: Call & Location */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:${BAKERY_INFO.phoneClean}`}
            title="Call Bakery Directly"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#5A3825] border border-[#C9A24B]/40 shadow-xs hover:bg-[#F4B6C2]/20 hover:text-[#A83255] transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#A83255]" />
          </a>
        </div>
      </div>

      {/* Embedded Search Input */}
      {showSearchBar && onSearchChange && (
        <div className="max-w-lg mx-auto mt-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#5A3825]/50 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search truffle cakes, cupcakes, brownies..."
              className="w-full pl-9 pr-4 py-2 bg-white/90 text-sm text-[#5A3825] placeholder-[#5A3825]/45 rounded-xl border border-[#C9A24B]/30 shadow-xs focus:outline-none focus:border-[#A83255] focus:ring-1 focus:ring-[#A83255] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-[#5A3825]/60 hover:text-[#5A3825] px-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
