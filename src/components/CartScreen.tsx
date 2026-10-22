import React, { useState } from 'react';
import { CartItem, OrderRecord } from '../types';
import { BAKERY_INFO } from '../data/products';
import { PapercraftItemGraphic } from './DecorativePapercraft';
import confetti from 'canvas-confetti';
import {
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  ShoppingBag,
  Sparkles,
  MapPin,
  Clock,
  Tag,
  ArrowRight,
} from 'lucide-react';

interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigateToMenu: () => void;
  onOrderSuccess: (order: OrderRecord) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToMenu,
  onOrderSuccess,
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = deliveryType === 'pickup' || subtotal >= 1500 ? 0 : 70;
  const total = Math.max(0, subtotal + deliveryFee - appliedDiscount);

  // Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'HOMEMADE10' || code === 'SWEET10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage(`Yay! 10% discount applied (-₹${discount})`);
    } else if (code === 'FIRSTBITE') {
      setAppliedDiscount(100);
      setCouponMessage('Welcome treat! ₹100 off applied.');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid promo code. Try HOMEMADE10');
    }
  };

  // Generate Pre-filled WhatsApp Text
  const generateWhatsAppMessage = (orderId: string) => {
    const itemsFormatted = cart
      .map((item, index) => {
        const c = item.customization;
        const egglessTag = c.isEggless ? '🌱 Eggless' : '🥚 With Egg';
        const msgTag = c.messageOnCake ? `\n   ✍️ Message: "${c.messageOnCake}"` : '';
        const dateTag = `\n   🗓️ Needed: ${c.deliveryDate} (${c.deliveryTimeSlot})`;
        const notesTag = c.specialInstructions ? `\n   📝 Note: ${c.specialInstructions}` : '';

        return `${index + 1}. *${item.product.name}* (${c.weight}) x ${item.quantity}
   🍰 Flavor: ${c.flavor} | ${egglessTag}${msgTag}${dateTag}${notesTag}
   💰 ₹${item.totalPrice}`;
      })
      .join('\n\n');

    return `🌸 *NEW BAKERY ORDER - Sweet Cravings | The Homemade* 🌸
Order ID: #${orderId}
-----------------------------------------
👤 *Customer:* ${customerName.trim() || 'Bakery Guest'}
📞 *Phone:* ${customerPhone.trim() || 'WhatsApp Contact'}
🚚 *Order Type:* ${deliveryType === 'delivery' ? 'Home Delivery' : 'Self-Pickup (Talawade Bakery)'}
${deliveryType === 'delivery' ? `📍 *Delivery Address:*\n${deliveryAddress.trim() || 'Please confirm address'}` : '📍 *Pickup Location:* Bhalekar’s Apt, Bhairavnath Temple, Dehu-Alandi Rd, Talawade, PCMC'}

📦 *ORDER ITEMS:*
${itemsFormatted}

-----------------------------------------
💵 *BILL DETAILS:*
• Subtotal: ₹${subtotal}
${deliveryFee > 0 ? `• Delivery Fee: ₹${deliveryFee}` : '• Delivery Fee: FREE'}
${appliedDiscount > 0 ? `• Discount: -₹${appliedDiscount}` : ''}
*Total Amount Payable: ₹${total}*

📝 *Order Instructions:* ${orderNotes.trim() || 'None'}

Please confirm my order and let me know the payment details (UPI/Cash on Delivery). Thank you! ❤️`;
  };

  // Checkout on WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    if (!customerName.trim()) {
      alert('Please enter your name so we can personalize your order box!');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your delivery address in Pune/PCMC.');
      return;
    }

    setIsSubmitting(true);
    const orderId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullMessage = generateWhatsAppMessage(orderId);

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A83255', '#F4B6C2', '#C9A24B', '#5A3825'],
    });

    const newOrder: OrderRecord = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress.trim() : undefined,
      deliveryDate: cart[0]?.customization.deliveryDate || new Date().toISOString().split('T')[0],
      deliveryTimeSlot: cart[0]?.customization.deliveryTimeSlot || 'Afternoon',
      notes: orderNotes.trim() || undefined,
      subtotal,
      discount: appliedDiscount,
      deliveryFee,
      total,
      status: 'WhatsApp Sent',
    };

    // Save to LocalStorage
    try {
      const stored = localStorage.getItem('sweet_cravings_orders');
      const orders: OrderRecord[] = stored ? JSON.parse(stored) : [];
      orders.unshift(newOrder);
      localStorage.setItem('sweet_cravings_orders', JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }

    // Open WhatsApp prefilled chat
    const encoded = encodeURIComponent(fullMessage);
    const waUrl = `https://wa.me/${BAKERY_INFO.phoneClean}?text=${encoded}`;
    window.open(waUrl, '_blank');

    onOrderSuccess(newOrder);
    onClearCart();
    setIsSubmitting(false);
  };

  const handleCopyOrderText = () => {
    const orderId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullMessage = generateWhatsAppMessage(orderId);
    navigator.clipboard.writeText(fullMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="pb-28 max-w-lg mx-auto px-4 pt-12 text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FBF3DE] border-2 border-[#C9A24B]/30 flex items-center justify-center text-[#A83255]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-[#5A3825]">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-[#5A3825]/70 max-w-xs mx-auto leading-relaxed">
          Looks like you haven't picked your freshly baked treats yet. Explore our handcrafted cakes, cupcakes, and desserts!
        </p>
        <button
          onClick={onNavigateToMenu}
          className="mt-4 px-6 py-3 bg-[#A83255] hover:bg-[#8e2544] text-[#FBF3DE] font-semibold text-xs rounded-xl shadow-md cursor-pointer border border-[#C9A24B]/40 inline-flex items-center gap-2"
        >
          <span>Browse Fresh Menu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-36 max-w-lg mx-auto px-4 pt-3 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold text-[#5A3825]">
            Review Your Order
          </h1>
          <p className="text-xs text-[#5A3825]/70">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bakery basket
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-[#A83255] hover:underline font-medium cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3">
        {cart.map((item) => {
          const c = item.customization;
          return (
            <div
              key={item.id}
              className="paper-card p-3.5 space-y-3 bg-white border border-[#C9A24B]/25"
            >
              <div className="flex items-start gap-3">
                {/* Visual thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-[#FBF3DE] border border-[#C9A24B]/25 p-1 shrink-0 flex items-center justify-center">
                  <PapercraftItemGraphic
                    category={item.product.category}
                    id={item.product.id}
                    className="w-full h-full"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-bold text-[#5A3825] leading-snug truncate">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#5A3825]/40 hover:text-[#A83255] p-1 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-[#A83255] font-medium mt-0.5">
                    {c.weight} • {c.flavor}
                  </div>

                  <div className="text-[10px] text-[#5A3825]/70 mt-1 flex flex-wrap gap-1">
                    <span className="px-1.5 py-0.5 bg-[#4CAF50]/10 text-[#2E7D32] rounded">
                      {c.isEggless ? 'Eggless' : 'With Egg'}
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#FBF3DE] text-[#5A3825] rounded">
                      📅 {c.deliveryDate} ({c.deliveryTimeSlot.split(' ')[0]})
                    </span>
                  </div>

                  {c.messageOnCake && (
                    <p className="text-[10px] text-[#5A3825] bg-[#FBF3DE]/80 px-2 py-0.5 rounded border border-[#C9A24B]/20 mt-1.5 truncate">
                      ✍️ Cake text: <span className="font-semibold">"{c.messageOnCake}"</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity and Price Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-[#C9A24B]/15">
                <div className="flex items-center gap-2 bg-[#FBF3DE] rounded-lg border border-[#C9A24B]/30 px-1 py-0.5">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-[#5A3825] hover:bg-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-[#5A3825] min-w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-[#5A3825] hover:bg-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#A83255]">
                    ₹{item.totalPrice}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[10px] text-[#5A3825]/60 block">
                      (₹{item.itemPrice} each)
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery / Pickup Choice */}
      <div className="paper-card p-4 space-y-3 bg-white">
        <label className="text-xs font-bold text-[#5A3825] uppercase tracking-wide">
          Delivery or Bakery Pickup
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDeliveryType('delivery')}
            className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
              deliveryType === 'delivery'
                ? 'bg-[#A83255] text-white border-[#A83255] shadow-xs'
                : 'bg-white text-[#5A3825] border-[#C9A24B]/30'
            }`}
          >
            Doorstep Delivery (Pune)
          </button>
          <button
            type="button"
            onClick={() => setDeliveryType('pickup')}
            className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
              deliveryType === 'pickup'
                ? 'bg-[#A83255] text-white border-[#A83255] shadow-xs'
                : 'bg-white text-[#5A3825] border-[#C9A24B]/30'
            }`}
          >
            Self Pickup (Talawade)
          </button>
        </div>

        {deliveryType === 'pickup' ? (
          <div className="p-3 bg-[#FBF3DE] rounded-xl border border-[#C9A24B]/30 text-xs text-[#5A3825]">
            <p className="font-semibold text-[#A83255] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A83255]" />
              Bakery Pickup Address
            </p>
            <p className="mt-1 text-[11px] text-[#5A3825]/80">
              {BAKERY_INFO.address}
            </p>
            <p className="text-[10px] text-[#5A3825]/60 mt-1">
              Pickup is 100% Free • Freshly packed in cake box with carrying bag.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Flat/House No., Building, Area, Landmark (PCMC / Pune)*"
              className="w-full px-3.5 py-2.5 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
            />
            <p className="text-[10px] text-[#5A3825]/60 flex items-center gap-1">
              <span>🚚 Flat delivery ₹70 (Free on orders above ₹1,500)</span>
            </p>
          </div>
        )}
      </div>

      {/* Customer Contact Details */}
      <div className="paper-card p-4 space-y-3 bg-white">
        <label className="text-xs font-bold text-[#5A3825] uppercase tracking-wide">
          Your Contact Info
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Full Name*"
            className="w-full px-3.5 py-2 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          />
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="WhatsApp Phone Number*"
            className="w-full px-3.5 py-2 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
          />
        </div>
        <input
          type="text"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Special Instructions / Birthday Card Note..."
          className="w-full px-3.5 py-2 text-xs text-[#5A3825] placeholder-[#5A3825]/45 bg-white rounded-xl border border-[#C9A24B]/40 focus:outline-none focus:border-[#A83255]"
        />
      </div>

      {/* Coupon Code */}
      <div className="paper-card p-3.5 bg-white">
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-3.5 h-3.5 text-[#C9A24B] absolute left-3 top-2.5" />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Promo code (e.g. HOMEMADE10)"
              className="w-full pl-8 pr-3 py-1.5 text-xs text-[#5A3825] bg-[#FBF3DE]/40 rounded-xl border border-[#C9A24B]/40 uppercase tracking-wide focus:outline-none focus:border-[#A83255]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#A83255] text-white text-xs font-semibold rounded-xl hover:bg-[#8e2544] cursor-pointer"
          >
            Apply
          </button>
        </form>
        {couponMessage && (
          <p
            className={`text-[11px] mt-2 font-medium ${
              appliedDiscount > 0 ? 'text-[#2E7D32]' : 'text-[#A83255]'
            }`}
          >
            {couponMessage}
          </p>
        )}
      </div>

      {/* Bill Breakdown */}
      <div className="paper-card p-4 space-y-2 bg-[#FFFFFF] border-2 border-[#C9A24B]/30">
        <h4 className="text-xs font-bold text-[#5A3825] uppercase tracking-wide pb-1 border-b border-[#C9A24B]/15">
          Bill Details
        </h4>
        <div className="flex justify-between text-xs text-[#5A3825]/80">
          <span>Items Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-xs text-[#5A3825]/80">
          <span>Eco-Friendly Bakery Box & Knife</span>
          <span className="text-[#2E7D32]">FREE</span>
        </div>
        <div className="flex justify-between text-xs text-[#5A3825]/80">
          <span>Delivery Charge</span>
          <span>{deliveryFee === 0 ? <span className="text-[#2E7D32]">FREE</span> : `₹${deliveryFee}`}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-xs text-[#2E7D32] font-medium">
            <span>Promo Discount</span>
            <span>-₹{appliedDiscount}</span>
          </div>
        )}
        <div className="pt-2 border-t border-[#C9A24B]/20 flex justify-between items-center text-sm font-bold text-[#5A3825]">
          <span>Grand Total</span>
          <span className="text-base text-[#A83255]">₹{total}</span>
        </div>
      </div>

      {/* Checkout via WhatsApp CTA */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleCheckoutWhatsApp}
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-[#25D366]/30 flex items-center justify-between transition-all cursor-pointer border-2 border-white"
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-6 h-6 fill-white" />
            <div className="text-left">
              <span className="block leading-tight">Order on WhatsApp</span>
              <span className="text-[10px] font-normal opacity-90 block">
                Instant confirmation on +91 89835 15351
              </span>
            </div>
          </div>
          <span className="font-heading text-lg font-bold">₹{total}</span>
        </button>

        <div className="flex items-center justify-between text-[11px] px-1 text-[#5A3825]/70">
          <span>WhatsApp opens with pre-filled order</span>
          <button
            onClick={handleCopyOrderText}
            className="text-[#A83255] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            {copiedText ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Order Summary
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
