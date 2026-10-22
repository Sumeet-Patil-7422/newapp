import React from 'react';
import { Product, CategoryId } from '../types';
import { BAKERY_PRODUCTS, BAKERY_INFO, CATEGORIES } from '../data/products';
import { PapercraftItemGraphic, ChefHatIcon, BabysBreathSprig, PaperHeart } from './DecorativePapercraft';
import { Sparkles, ArrowRight, Star, Heart, Clock, Gift, ShieldCheck, Plus, MessageCircle } from 'lucide-react';

interface HomeScreenProps {
  onSelectCategory: (cat: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToCustom: () => void;
  onNavigateToMenu: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectCategory,
  onSelectProduct,
  onNavigateToCustom,
  onNavigateToMenu,
}) => {
  const bestSellers = BAKERY_PRODUCTS.filter((p) => p.isBestseller).slice(0, 5);
  const celebrationItems = BAKERY_PRODUCTS.filter(
    (p) => p.category === 'gifting' || p.category === 'cakes'
  ).slice(0, 3);

  return (
    <div className="pb-28 max-w-lg mx-auto px-4 pt-3 space-y-6">
      {/* 1. Hero Banner: "Freshly baked with love" */}
      <div className="relative bg-gradient-to-br from-[#FFFFFF] via-[#FBF3DE] to-[#F4B6C2]/30 rounded-3xl p-5 border-2 border-[#C9A24B]/35 shadow-md shadow-[#5A3825]/5 overflow-hidden">
        {/* Botanical corner sprig */}
        <div className="absolute top-0 right-0 -translate-y-2 translate-x-2 opacity-60">
          <BabysBreathSprig className="w-24 h-24" flipped />
        </div>

        <div className="relative z-10 flex flex-col items-start space-y-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#A83255]/10 rounded-full border border-[#A83255]/20">
            <PaperHeart className="w-3.5 h-3.5" color="#A83255" />
            <span className="text-[11px] font-semibold text-[#A83255] tracking-wide">
              The Homemade Kitchen • Talawade, Pune
            </span>
          </div>

          <div>
            <h1 className="font-script text-3xl sm:text-4xl text-[#A83255] leading-none font-bold">
              Freshly baked with love
            </h1>
            <p className="font-heading text-sm text-[#5A3825] font-semibold mt-1.5">
              “Your sweet craving, delivered.”
            </p>
            <p className="text-xs text-[#5A3825]/80 mt-1 leading-relaxed max-w-xs">
              Handmade cakes, fudgy brownies, cupcakes and French macarons baked with pure butter and premium Belgian chocolate.
            </p>
          </div>

          {/* Quick Dual CTAs */}
          <div className="flex items-center gap-2 pt-1 w-full sm:w-auto">
            <button
              onClick={onNavigateToMenu}
              className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#A83255] hover:bg-[#8e2544] active:scale-[0.98] text-[#FBF3DE] font-semibold text-xs rounded-xl shadow-md shadow-[#A83255]/20 border border-[#C9A24B]/40 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateToCustom}
              className="flex-1 sm:flex-initial py-2.5 px-4 bg-white hover:bg-[#FBF3DE] active:scale-[0.98] text-[#5A3825] font-semibold text-xs rounded-xl shadow-xs border border-[#C9A24B]/40 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Custom Cakes</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-[#5A3825]">
            Browse by Category
          </h2>
          <button
            onClick={onNavigateToMenu}
            className="text-xs font-semibold text-[#A83255] hover:underline cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const isCustom = cat.id === 'custom';
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (isCustom) onNavigateToCustom();
                  else onSelectCategory(cat.id as CategoryId);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 group ${
                  isCustom
                    ? 'bg-gradient-to-b from-[#F4B6C2]/40 to-white border-[#A83255]/40 shadow-xs'
                    : 'bg-white border-[#C9A24B]/25 hover:border-[#A83255]/40 shadow-xs'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FBF3DE] border border-[#C9A24B]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.id === 'cakes' && <span className="text-base">🎂</span>}
                  {cat.id === 'cupcakes' && <span className="text-base">🧁</span>}
                  {cat.id === 'cookies' && <span className="text-base">🍪</span>}
                  {cat.id === 'macarons' && <span className="text-base">🌸</span>}
                  {cat.id === 'brownies' && <span className="text-base">🍫</span>}
                  {cat.id === 'gifting' && <span className="text-base">🎁</span>}
                  {cat.id === 'custom' && <Sparkles className="w-4 h-4 text-[#A83255]" />}
                </div>
                <span className="text-xs font-bold text-[#5A3825] group-hover:text-[#A83255]">
                  {cat.label}
                </span>
                {cat.count ? (
                  <span className="text-[10px] text-[#5A3825]/60">
                    {cat.count} treats
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#A83255]">
                    Personalized
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Best Sellers Horizontal Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-base font-bold text-[#5A3825]">
              Best Sellers
            </h2>
            <p className="text-[11px] text-[#5A3825]/70">
              Pune’s most craved handcrafted creations
            </p>
          </div>
          <button
            onClick={onNavigateToMenu}
            className="text-xs font-semibold text-[#A83255] hover:underline cursor-pointer"
          >
            View Menu
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="paper-card w-48 shrink-0 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-md transition-all border border-[#C9A24B]/25 hover:border-[#A83255]/40 bg-white"
            >
              {/* Graphic container */}
              <div className="relative bg-gradient-to-b from-[#FBF3DE]/80 to-white p-3 flex flex-col items-center justify-center border-b border-[#C9A24B]/15">
                <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#A83255] text-white">
                  POPULAR
                </span>
                <div className="w-24 h-24 flex items-center justify-center">
                  <PapercraftItemGraphic category={item.category} id={item.id} className="w-full h-full" />
                </div>
              </div>

              {/* Text info */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-heading text-xs font-bold text-[#5A3825] line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-[#5A3825]/65 mt-0.5 line-clamp-1">
                    {item.tagline}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-[#C9A24B]/15">
                  <span className="text-xs font-bold text-[#A83255]">
                    ₹{item.basePrice}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(item);
                    }}
                    className="p-1.5 rounded-lg bg-[#A83255] text-white hover:bg-[#8e2544] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Celebrations and Gifting Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-base font-bold text-[#5A3825]">
              Celebrations & Gifting
            </h2>
            <p className="text-[11px] text-[#5A3825]/70">
              Thoughtfully packed dessert boxes & festive hampers
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {celebrationItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="paper-card p-3.5 flex items-center gap-3 cursor-pointer hover:border-[#A83255]/40 transition-all bg-white"
            >
              <div className="w-18 h-18 rounded-2xl bg-[#FBF3DE] border border-[#C9A24B]/30 p-1 shrink-0 flex items-center justify-center">
                <PapercraftItemGraphic category={item.category} id={item.id} className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wide">
                    Gift Special
                  </span>
                </div>
                <h3 className="font-heading text-xs sm:text-sm font-bold text-[#5A3825] leading-snug truncate">
                  {item.name}
                </h3>
                <p className="text-[10px] text-[#5A3825]/70 line-clamp-1 mt-0.5">
                  {item.tagline}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-bold text-[#A83255]">
                    Starts at ₹{item.basePrice}
                  </span>
                  <span className="text-[10px] text-[#A83255] font-semibold hover:underline">
                    Customize & Gift →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Direct WhatsApp Order Pledge & Notice */}
      <div className="bg-[#25D366]/10 border-2 border-[#25D366]/30 rounded-3xl p-4 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-[#1B5E20]">
            Direct WhatsApp Confirmation
          </h4>
          <p className="text-[11px] text-[#2E7D32] mt-0.5 leading-snug">
            All delivery orders and custom designs are verified directly on WhatsApp (+91 89835 15351) for 100% personal attention.
          </p>
        </div>
      </div>

      {/* 6. Why Sweet Cravings Home Bakery? */}
      <div className="paper-card p-4 space-y-3 bg-white">
        <h3 className="font-heading text-xs font-bold text-[#5A3825] uppercase tracking-wider text-center">
          The Homemade Promise
        </h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-[#FBF3DE]/50 border border-[#C9A24B]/20">
            <span className="text-lg">🧈</span>
            <p className="text-xs font-bold text-[#5A3825] mt-1">Pure Butter Only</p>
            <p className="text-[10px] text-[#5A3825]/70">Zero premixes or artificial shortening</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FBF3DE]/50 border border-[#C9A24B]/20">
            <span className="text-lg">🌱</span>
            <p className="text-xs font-bold text-[#5A3825] mt-1">100% Eggless</p>
            <p className="text-[10px] text-[#5A3825]/70">Dedicated pure-veg kitchenware available</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FBF3DE]/50 border border-[#C9A24B]/20">
            <span className="text-lg">👩‍🍳</span>
            <p className="text-xs font-bold text-[#5A3825] mt-1">Small Batch</p>
            <p className="text-[10px] text-[#5A3825]/70">Baked fresh right after your order</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FBF3DE]/50 border border-[#C9A24B]/20">
            <span className="text-lg">🚚</span>
            <p className="text-xs font-bold text-[#5A3825] mt-1">Safe Hand Delivery</p>
            <p className="text-[10px] text-[#5A3825]/70">Delivered carefully across PCMC & Pune</p>
          </div>
        </div>
      </div>
    </div>
  );
};
