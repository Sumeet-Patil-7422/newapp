import React from 'react';
import { BabysBreathSprig, ChefHatIcon, PaperHeart } from './DecorativePapercraft';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#FBF3DE] flex flex-col items-center justify-between p-6 overflow-hidden select-none">
      {/* Decorative Baby's-breath floral corner sprigs */}
      <div className="absolute top-0 left-0 -translate-x-3 -translate-y-2 opacity-90">
        <BabysBreathSprig className="w-28 h-28" />
      </div>
      <div className="absolute top-0 right-0 translate-x-3 -translate-y-2 opacity-90">
        <BabysBreathSprig className="w-28 h-28" flipped />
      </div>
      <div className="absolute bottom-16 left-2 opacity-30">
        <BabysBreathSprig className="w-24 h-24" />
      </div>
      <div className="absolute bottom-20 right-2 opacity-30">
        <BabysBreathSprig className="w-24 h-24" flipped />
      </div>

      {/* Floating subtle paper hearts */}
      <div className="absolute top-28 left-8 animate-bounce duration-1000">
        <PaperHeart className="w-5 h-5" color="#F4B6C2" />
      </div>
      <div className="absolute top-36 right-8">
        <PaperHeart className="w-4 h-4" color="#A83255" />
      </div>
      <div className="absolute bottom-32 left-10">
        <PaperHeart className="w-3.5 h-3.5" color="#C9A24B" />
      </div>

      {/* Top Header Tag */}
      <div className="pt-8 flex flex-col items-center z-10 text-center">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full border border-[#C9A24B]/30 shadow-xs mb-2">
          <ChefHatIcon className="w-4 h-4" color="#A83255" />
          <span className="text-xs font-medium tracking-wider text-[#5A3825]">
            ARTISANAL HOME BAKERY • PUNE
          </span>
        </div>
      </div>

      {/* Centerpiece: Circular Gold-Framed Logo with Papercraft Depth */}
      <div className="my-auto flex flex-col items-center z-10 px-4">
        <div className="relative group">
          {/* Layered paper drop shadow rings */}
          <div className="absolute -inset-2.5 rounded-full bg-[#A83255]/10 blur-md transform scale-95" />
          <div className="absolute -inset-1 rounded-full bg-[#C9A24B]/30 blur-xs" />

          {/* Gold Framed Master Medallion */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-[#FFFFFF] border-4 border-[#C9A24B] shadow-2xl shadow-[#5A3825]/25 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/aistudio/logo_e627eb7e.jpg"
              alt="Sweet Cravings The Homemade Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Brand Tagline in warm Serif / Script */}
        <div className="mt-8 text-center max-w-xs">
          <p className="font-heading text-lg font-medium text-[#5A3825] italic leading-tight">
            “Baked fresh, made with love”
          </p>
          <p className="text-xs text-[#5A3825]/75 mt-2 leading-relaxed">
            Handcrafted artisanal cakes, pastries & desserts delivered directly from our home kitchen to yours.
          </p>
        </div>
      </div>

      {/* Bottom CTA to Enter */}
      <div className="w-full max-w-sm pb-6 z-10 flex flex-col items-center gap-3">
        <button
          onClick={onEnter}
          className="w-full py-4 px-6 bg-[#A83255] hover:bg-[#8e2544] active:scale-[0.98] text-[#FBF3DE] font-medium text-base rounded-2xl shadow-lg shadow-[#A83255]/25 flex items-center justify-center gap-3 transition-all cursor-pointer border border-[#C9A24B]/40"
        >
          <span>Explore Fresh Bakes</span>
          <ArrowRight className="w-5 h-5 text-[#FBF3DE]" />
        </button>

        <p className="text-[11px] text-[#5A3825]/60 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#C9A24B]" />
          <span>Talawade, PCMC, Pune • WhatsApp Delivery</span>
        </p>
      </div>
    </div>
  );
};
