import React, { useState } from 'react';
import { Product, CategoryId } from '../types';
import { BAKERY_PRODUCTS, CATEGORIES } from '../data/products';
import { PapercraftItemGraphic, ChefHatIcon, BabysBreathSprig } from './DecorativePapercraft';
import { Star, Plus, Sparkles, Filter, Leaf } from 'lucide-react';

interface MenuScreenProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCustom: () => void;
  searchQuery?: string;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onSelectProduct,
  onNavigateToCustom,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [egglessOnly, setEgglessOnly] = useState<boolean>(false);
  const [bestsellersOnly, setBestsellersOnly] = useState<boolean>(false);

  // Filter products
  const filteredProducts = BAKERY_PRODUCTS.filter((item) => {
    // Category match
    if (selectedCategory !== 'all') {
      if (item.category !== selectedCategory) return false;
    }

    // Dietary filter
    if (egglessOnly && !item.isEgglessAvailable) return false;

    // Bestseller filter
    if (bestsellersOnly && !item.isBestseller) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchTag = item.tagline.toLowerCase().includes(q);
      const matchFlavors = item.flavors.some((f) => f.toLowerCase().includes(q));
      if (!matchName && !matchTag && !matchFlavors) return false;
    }

    return true;
  });

  return (
    <div className="pb-28 max-w-lg mx-auto px-4 pt-3 space-y-4">
      {/* Category Pills / Segmented Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => {
          if (cat.id === 'custom') {
            return (
              <button
                key={cat.id}
                onClick={onNavigateToCustom}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-gradient-to-r from-[#A83255] to-[#8D2744] text-[#FBF3DE] border border-[#C9A24B]/40 shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F4B6C2]" />
                <span>Custom Cake</span>
              </button>
            );
          }

          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#A83255] text-white shadow-xs'
                  : 'bg-white text-[#5A3825] border border-[#C9A24B]/30 hover:border-[#A83255]/40'
              }`}
            >
              {cat.label}
              {cat.count ? ` (${cat.count})` : ''}
            </button>
          );
        })}
      </div>

      {/* Secondary Dietary / Bestseller Filters */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setEgglessOnly(!egglessOnly)}
          className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
            egglessOnly
              ? 'bg-[#4CAF50]/15 text-[#2E7D32] border-[#4CAF50]'
              : 'bg-white text-[#5A3825]/75 border-[#C9A24B]/25 hover:border-[#5A3825]/40'
          }`}
        >
          <Leaf className="w-3 h-3 text-[#4CAF50]" />
          <span>100% Eggless Only</span>
        </button>

        <button
          onClick={() => setBestsellersOnly(!bestsellersOnly)}
          className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
            bestsellersOnly
              ? 'bg-[#C9A24B]/20 text-[#5A3825] border-[#C9A24B] font-semibold'
              : 'bg-white text-[#5A3825]/75 border-[#C9A24B]/25 hover:border-[#5A3825]/40'
          }`}
        >
          <Star className="w-3 h-3 text-[#C9A24B] fill-[#C9A24B]" />
          <span>Bestsellers</span>
        </button>

        {(egglessOnly || bestsellersOnly) && (
          <button
            onClick={() => {
              setEgglessOnly(false);
              setBestsellersOnly(false);
            }}
            className="text-[11px] text-[#A83255] underline cursor-pointer ml-auto"
          >
            Reset
          </button>
        )}
      </div>

      {/* 2-Column Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#C9A24B]/25 p-6">
          <ChefHatIcon className="w-10 h-10 mx-auto text-[#A83255]" />
          <h3 className="font-heading text-lg font-bold text-[#5A3825]">
            No matching bakes found
          </h3>
          <p className="text-xs text-[#5A3825]/70 max-w-xs mx-auto">
            Try adjusting your search or dietary filter, or design a custom cake according to your choice!
          </p>
          <button
            onClick={onNavigateToCustom}
            className="mt-2 px-4 py-2 bg-[#A83255] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Order Custom Cake
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="paper-card flex flex-col justify-between overflow-hidden group cursor-pointer hover:shadow-md transition-all border border-[#C9A24B]/25 hover:border-[#A83255]/50 bg-white"
            >
              {/* Product Visual Area */}
              <div className="relative bg-gradient-to-b from-[#FBF3DE]/70 to-white p-3 flex flex-col items-center justify-center border-b border-[#C9A24B]/15">
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {product.isBestseller && (
                    <span className="text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-md bg-[#C9A24B] text-white shadow-xs">
                      BESTSELLER
                    </span>
                  )}
                  {product.isNew && (
                    <span className="text-[9px] font-bold tracking-tight px-1.5 py-0.5 rounded-md bg-[#A83255] text-white shadow-xs">
                      NEW
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-[#C9A24B]/20 flex items-center gap-0.5 text-[10px] font-bold text-[#5A3825]">
                  <Star className="w-2.5 h-2.5 fill-[#C9A24B] text-[#C9A24B]" />
                  <span>{product.rating}</span>
                </div>

                {/* Papercraft Food Art */}
                <div className="w-28 h-24 sm:w-32 sm:h-28 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <PapercraftItemGraphic
                    category={product.category}
                    id={product.id}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-[#5A3825] leading-snug line-clamp-2 group-hover:text-[#A83255] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-[#5A3825]/65 mt-1 line-clamp-2 leading-tight">
                    {product.tagline}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-[#C9A24B]/15">
                  <div>
                    <span className="text-[10px] text-[#5A3825]/60 block leading-none">
                      From
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#A83255]">
                      ₹{product.basePrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="py-1 px-2.5 rounded-lg bg-[#A83255] text-white hover:bg-[#8e2544] text-[11px] font-semibold flex items-center gap-1 shadow-xs cursor-pointer border border-[#C9A24B]/30"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
