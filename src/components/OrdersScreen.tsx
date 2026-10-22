import React, { useState, useEffect } from 'react';
import { OrderRecord, CartItem } from '../types';
import { BAKERY_INFO } from '../data/products';
import { Clock, MessageCircle, RotateCcw, PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { ChefHatIcon } from './DecorativePapercraft';

interface OrdersScreenProps {
  onReorder: (items: CartItem[]) => void;
  onNavigateToMenu: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  onReorder,
  onNavigateToMenu,
}) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sweet_cravings_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClearHistory = () => {
    if (confirm('Clear your local order history?')) {
      localStorage.removeItem('sweet_cravings_orders');
      setOrders([]);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="pb-28 max-w-lg mx-auto px-4 pt-12 text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FBF3DE] border-2 border-[#C9A24B]/30 flex items-center justify-center text-[#A83255]">
          <Clock className="w-10 h-10" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-[#5A3825]">
          No Past Orders Yet
        </h2>
        <p className="text-xs text-[#5A3825]/70 max-w-xs mx-auto leading-relaxed">
          Orders you place via WhatsApp will appear here so you can easily track and reorder your favorites.
        </p>
        <button
          onClick={onNavigateToMenu}
          className="mt-4 px-6 py-3 bg-[#A83255] hover:bg-[#8e2544] text-[#FBF3DE] font-semibold text-xs rounded-xl shadow-md cursor-pointer border border-[#C9A24B]/40 inline-flex items-center gap-2"
        >
          <span>Explore Fresh Bakes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 max-w-lg mx-auto px-4 pt-3 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold text-[#5A3825]">
            My Orders
          </h1>
          <p className="text-xs text-[#5A3825]/70">
            {orders.length} past order request{orders.length > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleClearHistory}
          className="text-xs text-[#A83255] hover:underline cursor-pointer"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="paper-card p-4 bg-white border border-[#C9A24B]/30 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#C9A24B]/15 pb-2">
              <div>
                <span className="text-xs font-bold text-[#A83255]">
                  Order #{order.id}
                </span>
                <span className="text-[10px] text-[#5A3825]/60 block mt-0.5">
                  {order.date}
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#1B5E20] border border-[#25D366]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-1.5 text-xs">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-start text-[#5A3825]">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold text-xs leading-tight">
                      {it.quantity}x {it.product.name}
                    </p>
                    <p className="text-[10px] text-[#5A3825]/70">
                      {it.customization.weight} • {it.customization.flavor}
                      {it.customization.isEggless ? ' • Eggless' : ''}
                    </p>
                  </div>
                  <span className="font-bold text-[#A83255]">₹{it.totalPrice}</span>
                </div>
              ))}
            </div>

            {/* Delivery Details */}
            <div className="p-2.5 bg-[#FBF3DE]/70 rounded-xl text-[11px] text-[#5A3825] space-y-0.5 border border-[#C9A24B]/20">
              <p>
                <strong>Delivery Date:</strong> {order.deliveryDate} ({order.deliveryTimeSlot})
              </p>
              <p>
                <strong>Type:</strong>{' '}
                {order.deliveryType === 'delivery'
                  ? `Home Delivery to ${order.deliveryAddress || 'Pune'}`
                  : 'Self-Pickup at Talawade bakery'}
              </p>
              <div className="pt-1 flex justify-between font-bold text-xs text-[#5A3825] border-t border-[#C9A24B]/15 mt-1">
                <span>Total Amount:</span>
                <span className="text-[#A83255]">₹{order.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://wa.me/${BAKERY_INFO.phoneClean}?text=Hi%20Sweet%20Cravings!%20Checking%20status%20for%20Order%20%23${order.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Track on WhatsApp</span>
              </a>

              <button
                onClick={() => onReorder(order.items)}
                className="py-2 px-3 bg-[#A83255] hover:bg-[#8e2544] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-order Items</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
