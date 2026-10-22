import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PapercraftItemGraphic, BabysBreathSprig, ChefHatIcon } from './DecorativePapercraft';
import { TIME_SLOTS } from '../data/products';
import { X, Heart, Clock, Star, Check, Sparkles, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  // Defaults
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions[0]);
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavors[0]);
  const [isEggless, setIsEggless] = useState<boolean>(product.defaultEggless);
  const [messageOnCake, setMessageOnCake] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Default date: tomorrow if evening, or today
  const getMinDate = () => {
    const d = new Date();
    if (d.getHours() >= 18) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const [deliveryDate, setDeliveryDate] = useState<string>(getMinDate());
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>(TIME_SLOTS[2]);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // Price calculation
  const multiplier = product.priceMultipliers[selectedWeight] || 1;
  const currentItemPrice = Math.round(product.basePrice * multiplier);
  const currentTotalPrice = currentItemPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      itemPrice: currentItemPrice,
      customization: {
        weight: selectedWeight,
        flavor: selectedFlavor,
        isEggless,
        messageOnCake: messageOnCake.trim() || undefined,
        deliveryDate,
        deliveryTimeSlot,
        specialInstructions: specialInstructions.trim() || undefined,
      },
    });

    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FFFFFF] rounded-t-3xl sm:rounded-3xl border border-[#C9A24B]/30 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="relative bg-[#FBF3DE] px-5 pt-4 pb-3 border-b border-[#C9A24B]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold text-[#A83255] tracking-wider">
              {product.category}
            </span>
            <span className="text-xs text-[#5A3825]/40">•</span>
            <div className="flex items-center gap-1 text-xs text-[#5A3825]">
              <Star className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-[#5A3825]/60">({product.reviewsCount})</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 border border-[#C9A24B]/30 flex items-center justify-center text-[#5A3825] hover:bg-[#A83255] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Visual Showcase */}
          <div className="relative bg-gradient-to-b from-[#FBF3DE] to-white rounded-2xl p-4 border border-[#C9A24B]/20 flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 opacity-60">
              <BabysBreathSprig className="w-16 h-16" />
            </div>
            <div className="w-44 h-40 flex items-center justify-center py-2">
              <PapercraftItemGraphic category={product.category} id={product.id} className="w-full h-full" />
            </div>

            {/* Eggless badge */}
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#4CAF50]/10 text-[#2E7D32] border border-[#4CAF50]/30 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
                100% Eggless Option Available
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#C9A24B]/15 text-[#5A3825] border border-[#C9A24B]/40 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C9A24B]" />
                {product.preparationHours}h Notice
              </span>
            </div>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="font-heading text-xl font-bold text-[#5A3825] leading-snug">
              {product.name}
            </h2>
            <p className="text-xs text-[#A83255] font-medium mt-1">
              {product.tagline}
            </p>
            <p className="text-xs text-[#5A3825]/80 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.highlights.map((h, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 bg-[#FBF3DE] text-[#5A3825] rounded-lg border border-[#C9A24B]/25"
              >
                ✨ {h}
              </span>
            ))}
          </div>

          <hr className="border-t border-[#C9A24B]/20" />

          {/* 1. Size / Weight Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#5A3825] tracking-wide uppercase">
                Select Size / Weight
              </label>
              <span className="text-xs text-[#A83255] font-medium">
                ₹{currentItemPrice}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.weightOptions.map((weight) => {
                const isSelected = selectedWeight === weight;
                const optPrice = Math.round(product.basePrice * (product.priceMultipliers[weight] || 1));
                return (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-[#A83255] bg-[#A83255] text-white shadow-xs'
                        : 'border-[#C9A24B]/30 bg-[#FBF3DE]/50 text-[#5A3825] hover:border-[#A83255]/50'
                    }`}
                  >
                    <span className="text-xs font-semibold">{weight}</span>
                    <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/90' : 'text-[#A83255]'}`}>
                      ₹{optPrice}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Flavor Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#5A3825] tracking-wide uppercase">
              Select Flavor Variation
            </label>
            <div className="space-y-1.5">
              {product.flavors.map((flavor) => {
                const isSelected = selectedFlavor === flavor;
                return (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#A83255] bg-[#A83255]/10 text-[#A83255] font-semibold'
                        : 'border-[#C9A24B]/30 bg-white text-[#5A3825] hover:border-[#C9A24B]'
                    }`}
                  >
                    <span>{flavor}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#A83255]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Eggless Toggle */}
          <div className="bg-[#FBF3DE] p-3 rounded-xl border border-[#C9A24B]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#5A3825]">Dietary Preference</p>
              <p className="text-[11px] text-[#5A3825]/70">
                {isEggless ? '100% Eggless recipe (Pure Veg)' : 'Contains Fresh Farm Eggs'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEggless(!isEggless)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isEggless ? 'bg-[#4CAF50]' : 'bg-[#C9A24B]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEggless ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 4. Message on Cake (for cakes/gifting) */}
          {product.category === 'cakes' || product.category === 'gifting' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5A3825] tracking-wide uppercase flex items-center justify-between">
                <span>Message on Cake (Optional)</span>
                <span className="text-[10px] text-[#5A3825]/60 font-normal">Free piping</span>
              </label>
              <input
                type="text"
                maxLength={35}
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
                placeholder="e.g. Happy Birthday Sarah ❤️"
                className="w-full px-3.5 py-2.5 text-xs text-[#5A3825] placeholder-[#5A3825]/40 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255] focus:ring-1 focus:ring-[#A83255]"
              />
            </div>
          ) : null}

          {/* 5. Date & Time Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5A3825] tracking-wide uppercase">
                Delivery / Pickup Date
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#5A3825] bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5A3825] tracking-wide uppercase">
                Preferred Time Slot
              </label>
              <select
                value={deliveryTimeSlot}
                onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                className="w-full px-3 py-2 text-xs text-[#5A3825] bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 6. Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#5A3825] tracking-wide uppercase">
              Special Notes / Allergies (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Less sweetness, extra napkins, gift tag note..."
              className="w-full px-3.5 py-2 text-xs text-[#5A3825] placeholder-[#5A3825]/40 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
            />
          </div>
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="p-4 bg-white border-t border-[#C9A24B]/20 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center gap-1 bg-[#FBF3DE] rounded-xl border border-[#C9A24B]/30 p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5A3825] disabled:opacity-40 cursor-pointer shadow-xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-[#5A3825]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#5A3825] cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add To Cart CTA Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 py-3 px-5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-between cursor-pointer transition-all ${
              addedNotice
                ? 'bg-[#4CAF50] text-white shadow-md'
                : 'bg-[#A83255] hover:bg-[#8e2544] active:scale-[0.98] text-white shadow-md shadow-[#A83255]/25 border border-[#C9A24B]/40'
            }`}
          >
            {addedNotice ? (
              <span className="w-full text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Added to Cart!
              </span>
            ) : (
              <>
                <span>Add to Cart</span>
                <span className="font-bold">₹{currentTotalPrice}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
