import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BAKERY_INFO } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Ordering Support"
      className="fixed bottom-20 right-4 sm:right-6 z-40 flex items-center gap-2"
    >
      <a
        href={BAKERY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Sweet Cravings"
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full shadow-xl shadow-[#25D366]/30 border-2 border-white transition-all duration-200 cursor-pointer"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        </span>
        <div className="flex flex-col text-left pr-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase opacity-90 leading-tight">
            Order Now
          </span>
          <span className="text-xs font-bold leading-tight">WhatsApp</span>
        </div>
      </a>
    </aside>
  );
};
