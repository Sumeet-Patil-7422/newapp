import React from 'react';
import { OrderRecord } from '../types';
import { BAKERY_INFO } from '../data/products';
import { CheckCircle2, MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { BabysBreathSprig, ChefHatIcon } from './DecorativePapercraft';

interface OrderSuccessModalProps {
  order: OrderRecord | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#C9A24B] shadow-2xl p-6 relative overflow-hidden text-center space-y-4 animate-in zoom-in-95 duration-200">
        <div className="absolute top-0 right-0 opacity-40">
          <BabysBreathSprig className="w-20 h-20" flipped />
        </div>

        <div className="w-16 h-16 rounded-full bg-[#4CAF50]/15 text-[#2E7D32] border border-[#4CAF50]/30 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[#4CAF50]" />
        </div>

        <div>
          <span className="text-[11px] font-semibold text-[#A83255] uppercase tracking-wider">
            Order #{order.id} Sent
          </span>
          <h2 className="font-heading text-xl font-bold text-[#5A3825] mt-1">
            Order Sent to WhatsApp!
          </h2>
          <p className="text-xs text-[#5A3825]/80 mt-1.5 leading-relaxed">
            Thank you, <strong className="text-[#A83255]">{order.customerName}</strong>! Your order request has been directed to our head baker on WhatsApp.
          </p>
        </div>

        {/* Order Brief Summary */}
        <div className="p-3 bg-[#FBF3DE] rounded-2xl border border-[#C9A24B]/30 text-left text-xs space-y-1.5">
          <div className="flex justify-between font-semibold text-[#5A3825]">
            <span>Items ({order.items.length})</span>
            <span className="text-[#A83255]">₹{order.total}</span>
          </div>
          <div className="text-[11px] text-[#5A3825]/75">
            📅 {order.deliveryDate} • {order.deliveryTimeSlot}
          </div>
          <div className="text-[11px] text-[#5A3825]/75">
            🚚 {order.deliveryType === 'delivery' ? `Delivery to: ${order.deliveryAddress || 'Pune'}` : 'Self-Pickup at Talawade bakery'}
          </div>
        </div>

        <p className="text-[11px] text-[#5A3825]/70 italic">
          We will review your order details and reply on WhatsApp to confirm delivery slot and payment details.
        </p>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <a
            href={BAKERY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Open WhatsApp Chat (+91 89835 15351)</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onViewOrders();
              }}
              className="py-2.5 px-3 bg-[#FBF3DE] text-[#5A3825] hover:bg-[#C9A24B]/20 font-semibold text-xs rounded-xl border border-[#C9A24B]/40 cursor-pointer"
            >
              View Order History
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-3 bg-[#A83255] text-white font-semibold text-xs rounded-xl hover:bg-[#8e2544] cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
