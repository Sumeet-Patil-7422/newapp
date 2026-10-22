import React from 'react';
import { BAKERY_INFO } from '../data/products';
import { BabysBreathSprig, ChefHatIcon, PaperHeart } from './DecorativePapercraft';
import { Phone, MessageCircle, MapPin, Clock, Heart, Award, Sparkles, Navigation } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  return (
    <div className="pb-32 max-w-lg mx-auto px-4 pt-3 space-y-6">
      {/* Brand Story Card with circular logo */}
      <div className="paper-card p-5 bg-white border border-[#C9A24B]/30 relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 right-0 opacity-40">
          <BabysBreathSprig className="w-20 h-20" flipped />
        </div>
        <div className="absolute top-0 left-0 opacity-40">
          <BabysBreathSprig className="w-20 h-20" />
        </div>

        {/* Circular Logo */}
        <div className="relative w-28 h-28 mx-auto rounded-full p-1 bg-white border-2 border-[#C9A24B] shadow-md overflow-hidden">
          <img
            src="/assets/aistudio/logo_e627eb7e.jpg"
            alt="Sweet Cravings The Homemade Logo"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>

        <div>
          <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Our Homemade Story
          </span>
          <h1 className="font-heading text-xl font-bold text-[#5A3825] mt-1">
            Handmade with love, baked fresh at home
          </h1>
          <p className="font-script text-2xl text-[#A83255] font-bold mt-1">
            Sweet Cravings
          </p>
        </div>

        <p className="text-xs text-[#5A3825]/80 leading-relaxed text-left">
          Welcome to our cozy boutique home bakery in Talawade, Pune. At <strong>Sweet Cravings | The Homemade</strong>, every single bake is handcrafted with wholesome ingredients, pure unsalted butter, rich Belgian cocoa, and genuine love.
        </p>

        <p className="text-xs text-[#5A3825]/80 leading-relaxed text-left">
          We believe birthdays, anniversaries, and small everyday moments deserve desserts made without mass-production shortcuts or chemical stabilizers. When you order from us, your cake is baked exclusively for you, hours before it reaches your celebration table.
        </p>
      </div>

      {/* Direct Contact & Action Buttons */}
      <div className="paper-card p-5 bg-white space-y-4 border border-[#C9A24B]/25">
        <h2 className="font-heading text-sm font-bold text-[#5A3825] uppercase tracking-wide">
          Get in Touch & Order
        </h2>

        {/* Address Card */}
        <div className="flex items-start gap-3 p-3 bg-[#FBF3DE] rounded-2xl border border-[#C9A24B]/30">
          <div className="w-9 h-9 rounded-full bg-[#A83255] text-white flex items-center justify-center shrink-0 shadow-xs">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-bold text-[#5A3825]">Bakery Location & Self-Pickup</p>
            <p className="text-[11px] text-[#5A3825]/85 mt-1 leading-relaxed">
              {BAKERY_INFO.address}
            </p>
          </div>
        </div>

        {/* Phone & Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-[#FBF3DE]/60 rounded-xl border border-[#C9A24B]/20 flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#A83255] shrink-0" />
            <div>
              <p className="text-[10px] text-[#5A3825]/60 font-semibold uppercase">Phone / WhatsApp</p>
              <a
                href={`tel:${BAKERY_INFO.phoneClean}`}
                className="font-bold text-[#A83255] hover:underline"
              >
                {BAKERY_INFO.phone}
              </a>
            </div>
          </div>

          <div className="p-3 bg-[#FBF3DE]/60 rounded-xl border border-[#C9A24B]/20 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#C9A24B] shrink-0" />
            <div>
              <p className="text-[10px] text-[#5A3825]/60 font-semibold uppercase">Baking Hours</p>
              <p className="font-bold text-[#5A3825]">{BAKERY_INFO.openingHours}</p>
            </div>
          </div>
        </div>

        {/* Two Big Direct Action Buttons: Call & WhatsApp */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={`tel:${BAKERY_INFO.phoneClean}`}
            className="py-3 px-4 bg-[#A83255] hover:bg-[#8e2544] active:scale-[0.98] text-[#FBF3DE] font-semibold text-xs rounded-xl shadow-md shadow-[#A83255]/20 flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#C9A24B]/40"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Call Bakery</span>
          </a>

          <a
            href={BAKERY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2 transition-all cursor-pointer border border-white"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Embedded Map Section */}
      <div className="paper-card p-4 bg-white space-y-3 border border-[#C9A24B]/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#A83255]" />
            <h3 className="font-heading text-xs font-bold text-[#5A3825] uppercase tracking-wide">
              Bakery Location Map
            </h3>
          </div>
          <span className="text-[10px] text-[#A83255] font-semibold">
            Talawade, PCMC, Pune
          </span>
        </div>

        {/* Interactive Google Map iframe */}
        <div className="w-full h-52 rounded-2xl overflow-hidden border border-[#C9A24B]/30 relative bg-[#FBF3DE]">
          <iframe
            title="Sweet Cravings Location Map - Talawade Pune"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Bhairavnath+Temple,+Dehu+Alandi+Road,+Talawade,+Pimpri-Chinchwad,+Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
          />
        </div>
        <p className="text-[10px] text-[#5A3825]/70 text-center">
          Near Bhairavnath Temple, Dehu-Alandi Road • Delivery coverage extends across PCMC & Pune
        </p>
      </div>

      {/* Bakery Standards & Trust */}
      <div className="paper-card p-4 space-y-3 bg-white border border-[#C9A24B]/20">
        <h3 className="text-xs font-bold text-[#5A3825] uppercase tracking-wider">
          Hygiene & Ordering Policy
        </h3>
        <ul className="text-xs text-[#5A3825]/80 space-y-2 list-disc list-inside">
          <li><strong>Pre-order Notice:</strong> Minimum 4 hours for standard cakes & cupcakes; 24 hours for custom tiered cakes.</li>
          <li><strong>Payment Confirmation:</strong> Orders are verified on WhatsApp. We accept UPI (GPay/PhonePe/Paytm) & Bank Transfer.</li>
          <li><strong>Delivery Safe-Transit:</strong> All cakes are boxed with sturdy food-grade baseboards and delivered by experienced cake handlers.</li>
          <li><strong>100% Eggless Option:</strong> Dedicated sanitized bowls and equipment for pure-veg bakery requests.</li>
        </ul>
      </div>
    </div>
  );
};
