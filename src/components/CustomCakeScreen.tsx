import React, { useState } from 'react';
import { ChefHatIcon, BabysBreathSprig, PaperHeart } from './DecorativePapercraft';
import { BAKERY_INFO, TIME_SLOTS } from '../data/products';
import { Sparkles, Upload, Image as ImageIcon, CheckCircle, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CustomCakeScreenProps {
  onAddCustomToCart: (customItem: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  onNavigateToCart: () => void;
}

export const CustomCakeScreen: React.FC<CustomCakeScreenProps> = ({
  onAddCustomToCart,
  onNavigateToCart,
}) => {
  const occasions = [
    'Birthday',
    'Anniversary',
    'Baby Shower',
    'Wedding & Engagement',
    'Kids Themed Party',
    'Graduation / Milestone',
    'Bento Box Surprise',
    'Festive / Diwali / Christmas',
  ];

  const sizes = [
    { label: '500g Bento', desc: '2-4 serves', base: 550 },
    { label: '1 kg Single Tier', desc: '6-8 serves', base: 950 },
    { label: '1.5 kg Celebration', desc: '10-14 serves', base: 1450 },
    { label: '2 kg Grand Cake', desc: '16-20 serves', base: 1900 },
    { label: '3 kg Two-Tier', desc: '25+ serves', base: 2850 },
  ];

  const flavors = [
    'Belgian Dark Chocolate Truffle',
    'Raspberry & Rose Blossom',
    'Lotus Biscoff Salted Caramel',
    'Royal Red Velvet Cream Cheese',
    'Alphonso Mango Cream (Seasonal)',
    'Vanilla Buttercream & Berries',
    'Chocolate Hazelnut Nutella Crunch',
  ];

  const presets = [
    { title: 'Vintage Lambeth Piping', desc: 'Delicate ruffle frills, cherry accents, Victorian style', tag: 'Trending' },
    { title: 'Minimalist Korean Bento', desc: 'Pastel palette, cute micro lettering, sweet heart border', tag: 'Cute' },
    { title: 'Belgian Chocolate Drip', desc: 'Glossy dark drip, macarons, fresh berries, golden flakes', tag: 'Indulgent' },
    { title: 'Wild Botanical Garden', desc: 'Edible blossoms, gold leaf, blush watercolor frosting', tag: 'Elegant' },
  ];

  const [selectedOccasion, setSelectedOccasion] = useState<string>(occasions[0]);
  const [selectedSize, setSelectedSize] = useState<typeof sizes[0]>(sizes[1]);
  const [selectedFlavor, setSelectedFlavor] = useState<string>(flavors[0]);
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [themeNotes, setThemeNotes] = useState<string>('');
  const [messageOnCake, setMessageOnCake] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // custom cakes need min 24h
    return d.toISOString().split('T')[0];
  };

  const [deliveryDate, setDeliveryDate] = useState<string>(getMinDate());
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[2]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [customAdded, setCustomAdded] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const estimatedPrice = selectedSize.base;

  // Direct WhatsApp quote generator
  const handleWhatsAppQuote = () => {
    const message = `✨ *CUSTOM CAKE INQUIRY* - Sweet Cravings | The Homemade
-----------------------------------------
🎂 *Occasion:* ${selectedOccasion}
⚖️ *Size:* ${selectedSize.label} (${selectedSize.desc})
🍫 *Flavor:* ${selectedFlavor}
🌱 *Dietary:* ${isEggless ? '100% Eggless (Pure Veg)' : 'With Egg'}
✍️ *Message on Cake:* ${messageOnCake ? `"${messageOnCake}"` : 'None'}
🎨 *Design / Theme Notes:* ${themeNotes || 'Chef’s recommended aesthetic'}
${previewImage ? '📷 *Reference Photo:* Attached in chat' : ''}

🗓️ *Required On:* ${deliveryDate}
⏰ *Time Slot:* ${timeSlot}
🚚 *Order Type:* ${deliveryType === 'delivery' ? `Home Delivery to: ${deliveryAddress || 'Address to follow'}` : 'Bakery Pickup (Talawade)'}
👤 *Contact:* ${customerName || 'Customer'} (${customerPhone || 'Contact number'})
💰 *Estimated Base Price:* ₹${estimatedPrice}

Hi! Could you please confirm availability and provide a final quotation for this custom design? Thank you! ❤️`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${BAKERY_INFO.phoneClean}?text=${encoded}`, '_blank');
  };

  const handleAddToCart = () => {
    onAddCustomToCart({
      product: {
        id: `custom-cake-${Date.now()}`,
        name: `Custom ${selectedOccasion} Cake`,
        category: 'cakes',
        tagline: `${selectedSize.label} • ${selectedFlavor}`,
        description: `Theme: ${themeNotes || 'Artisanal Custom'}. Occasion: ${selectedOccasion}.`,
        basePrice: estimatedPrice,
        weightOptions: [selectedSize.label],
        priceMultipliers: { [selectedSize.label]: 1 },
        flavors: [selectedFlavor],
        isEgglessAvailable: true,
        defaultEggless: isEggless,
        preparationHours: 24,
        rating: 5.0,
        reviewsCount: 1,
        highlights: ['Handmade to Order', 'Custom Design Theme'],
      },
      quantity: 1,
      itemPrice: estimatedPrice,
      customization: {
        weight: selectedSize.label,
        flavor: selectedFlavor,
        isEggless,
        messageOnCake: messageOnCake || undefined,
        deliveryDate,
        deliveryTimeSlot: timeSlot,
        specialInstructions: `Custom Notes: ${themeNotes || 'None'}. Delivery Type: ${deliveryType}. Address: ${deliveryAddress || 'Pickup'}`,
      },
    });

    setCustomAdded(true);
    setTimeout(() => {
      setCustomAdded(false);
      onNavigateToCart();
    }, 800);
  };

  return (
    <div className="pb-28 max-w-lg mx-auto px-4 pt-4 space-y-6">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#FBF3DE] via-white to-[#F4B6C2]/30 rounded-3xl p-5 border border-[#C9A24B]/35 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 opacity-40">
          <BabysBreathSprig className="w-24 h-24" flipped />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#A83255] text-white flex items-center justify-center shadow-xs">
            <ChefHatIcon className="w-4 h-4" color="#FFFFFF" />
          </div>
          <span className="text-[11px] font-bold tracking-wider text-[#A83255] uppercase">
            Artisanal Bespoke Studio
          </span>
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#5A3825]">
          Design Your Dream Cake
        </h1>
        <p className="text-xs text-[#5A3825]/80 mt-1 leading-relaxed">
          From multi-tiered wedding cakes to cute Korean bento boxes, tell us your theme and we will bake your vision fresh.
        </p>
      </div>

      {/* Preset Style Inspo Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
            Design Inspirations
          </span>
          <span className="text-[11px] text-[#A83255]">Tap to auto-fill notes</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setThemeNotes(`${p.title}: ${p.desc}`)}
              className="p-3 bg-white rounded-2xl border border-[#C9A24B]/25 hover:border-[#A83255] text-left transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F4B6C2]/30 text-[#A83255] font-semibold">
                  {p.tag}
                </span>
                <Sparkles className="w-3 h-3 text-[#C9A24B] group-hover:scale-125 transition-transform" />
              </div>
              <p className="text-xs font-semibold text-[#5A3825] mt-1.5 leading-snug">
                {p.title}
              </p>
              <p className="text-[10px] text-[#5A3825]/60 mt-0.5 line-clamp-2">
                {p.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Occasion Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
          1. What is the Occasion?
        </label>
        <div className="flex flex-wrap gap-2">
          {occasions.map((occ) => {
            const isSel = selectedOccasion === occ;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => setSelectedOccasion(occ)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSel
                    ? 'bg-[#A83255] text-white shadow-xs'
                    : 'bg-white text-[#5A3825] border border-[#C9A24B]/30 hover:border-[#A83255]/50'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Size & Servings */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
          2. Cake Size & Servings
        </label>
        <div className="grid grid-cols-1 gap-2">
          {sizes.map((s) => {
            const isSel = selectedSize.label === s.label;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSel
                    ? 'border-[#A83255] bg-[#A83255]/10 shadow-xs'
                    : 'border-[#C9A24B]/30 bg-white hover:border-[#C9A24B]'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-[#5A3825]">{s.label}</p>
                  <p className="text-[11px] text-[#5A3825]/70">{s.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#A83255]">
                    Est. ₹{s.base}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Flavor & Eggless */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
            3. Choose Sponge & Filling Flavor
          </label>
          <select
            value={selectedFlavor}
            onChange={(e) => setSelectedFlavor(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs text-[#5A3825] bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          >
            {flavors.map((fl) => (
              <option key={fl} value={fl}>
                {fl}
              </option>
            ))}
          </select>
        </div>

        {/* 100% Eggless Toggle */}
        <div className="bg-[#FBF3DE] p-3 rounded-xl border border-[#C9A24B]/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#5A3825]">Dietary Preference</p>
            <p className="text-[11px] text-[#5A3825]/70">
              {isEggless ? '100% Eggless sponge (Pure Veg)' : 'With fresh eggs'}
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
      </div>

      {/* 4. Theme & Design Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
          4. Theme, Color Palette & Design Details
        </label>
        <textarea
          rows={3}
          value={themeNotes}
          onChange={(e) => setThemeNotes(e.target.value)}
          placeholder="e.g. Pastel pink and ivory theme, gold sprinkles, delicate piping around borders, 25th anniversary vibe..."
          className="w-full p-3 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
        />
      </div>

      {/* 5. Reference Photo Upload */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide flex items-center justify-between">
          <span>5. Reference Photo / Cake Sketch</span>
          <span className="text-[10px] text-[#5A3825]/60 font-normal">Optional</span>
        </label>

        {previewImage ? (
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A24B] p-2 bg-white flex flex-col items-center">
            <img
              src={previewImage}
              alt="Reference"
              className="max-h-48 rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="mt-2 text-xs text-[#A83255] font-semibold underline cursor-pointer"
            >
              Remove / Replace Photo
            </button>
          </div>
        ) : (
          <label className="border-2 border-dashed border-[#C9A24B]/60 hover:border-[#A83255] rounded-2xl p-6 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center">
            <div className="w-10 h-10 rounded-full bg-[#FBF3DE] flex items-center justify-center text-[#A83255]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5A3825]">
                Upload Reference Photo (Pinterest / Instagram)
              </p>
              <p className="text-[10px] text-[#5A3825]/60 mt-0.5">
                PNG, JPG, or WEBP from your phone gallery
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* 6. Message on Cake */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
          6. Text / Message on Cake (Optional)
        </label>
        <input
          type="text"
          value={messageOnCake}
          onChange={(e) => setMessageOnCake(e.target.value)}
          placeholder="e.g. Happy 30th Birthday Rahul!"
          className="w-full px-3.5 py-2.5 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
        />
      </div>

      {/* 7. Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
            7. Date Needed
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
          <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
            Time Slot
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full px-3 py-2 text-xs text-[#5A3825] bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          >
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 8. Delivery or Pickup */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
          8. Delivery or Self-Pickup
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDeliveryType('delivery')}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
              deliveryType === 'delivery'
                ? 'bg-[#A83255] text-white border-[#A83255] shadow-xs'
                : 'bg-white text-[#5A3825] border-[#C9A24B]/30'
            }`}
          >
            Home Delivery (Pune/PCMC)
          </button>
          <button
            type="button"
            onClick={() => setDeliveryType('pickup')}
            className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
              deliveryType === 'pickup'
                ? 'bg-[#A83255] text-white border-[#A83255] shadow-xs'
                : 'bg-white text-[#5A3825] border-[#C9A24B]/30'
            }`}
          >
            Self-Pickup (Talawade)
          </button>
        </div>

        {deliveryType === 'delivery' && (
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Flat/Wing, Society, Area, Landmark in Pune..."
            className="w-full px-3.5 py-2.5 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          />
        )}
      </div>

      {/* Customer Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
            Your Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full px-3.5 py-2 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#5A3825] uppercase tracking-wide">
            WhatsApp Phone
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="e.g. 98765 43210"
            className="w-full px-3.5 py-2 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          />
        </div>
      </div>

      {/* Sticky Dual Action Bar */}
      <div className="paper-card-elevated p-4 space-y-3 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#5A3825]">Base Estimate</p>
            <p className="text-[10px] text-[#5A3825]/60">Subject to design complexity</p>
          </div>
          <span className="font-heading text-xl font-bold text-[#A83255]">
            ₹{estimatedPrice}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Action 1: Direct WhatsApp inquiry */}
          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-md shadow-[#25D366]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat & Quote on WhatsApp</span>
          </button>

          {/* Action 2: Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`py-3 px-4 font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
              customAdded
                ? 'bg-[#4CAF50] text-white'
                : 'bg-[#A83255] hover:bg-[#8e2544] active:scale-[0.98] text-white shadow-[#A83255]/25 border border-[#C9A24B]/40'
            }`}
          >
            {customAdded ? (
              <>
                <CheckCircle className="w-4 h-4" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Save & Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
