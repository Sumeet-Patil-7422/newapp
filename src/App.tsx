/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { CustomCakeScreen } from './components/CustomCakeScreen';
import { CartScreen } from './components/CartScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { AboutScreen } from './components/AboutScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Product, CartItem, OrderRecord, CategoryId } from './types';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentOrder, setRecentOrder] = useState<OrderRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sweet_cravings_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sweet_cravings_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      totalPrice: item.itemPrice * item.quantity,
    };
    setCart((prev) => [newItem, ...prev]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            if (newQ <= 0) return null;
            return {
              ...item,
              quantity: newQ,
              totalPrice: item.itemPrice * newQ,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleReorder = (items: CartItem[]) => {
    setCart((prev) => [...items, ...prev]);
    setActiveTab('cart');
  };

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  // If splash is showing
  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  const appContent = (
    <div className="min-h-screen bg-[#FBF3DE] text-[#5A3825] flex flex-col relative selection:bg-[#F4B6C2] selection:text-[#5A3825]">
      {/* Top Header */}
      <Header
        onLogoClick={() => setActiveTab('home')}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          if (activeTab !== 'menu') {
            setActiveTab('menu');
          }
        }}
        showSearchBar={activeTab === 'home' || activeTab === 'menu'}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {activeTab === 'home' && (
          <HomeScreen
            onSelectCategory={(cat: CategoryId) => {
              setActiveTab('menu');
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateToCustom={() => setActiveTab('custom')}
            onNavigateToMenu={() => setActiveTab('menu')}
          />
        )}

        {activeTab === 'menu' && (
          <MenuScreen
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigateToCustom={() => setActiveTab('custom')}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'custom' && (
          <CustomCakeScreen
            onAddCustomToCart={handleAddToCart}
            onNavigateToCart={() => setActiveTab('cart')}
          />
        )}

        {activeTab === 'cart' && (
          <CartScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigateToMenu={() => setActiveTab('menu')}
            onOrderSuccess={(order) => setRecentOrder(order)}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersScreen
            onReorder={handleReorder}
            onNavigateToMenu={() => setActiveTab('menu')}
          />
        )}

        {activeTab === 'about' && <AboutScreen />}
      </main>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Ergonomic Bottom Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
      />

      {/* Product Customization Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Order Sent Confirmation Modal */}
      {recentOrder && (
        <OrderSuccessModal
          order={recentOrder}
          onClose={() => setRecentOrder(null)}
          onViewOrders={() => setActiveTab('orders')}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ece2cb] flex flex-col items-center justify-start">
      {/* Desktop Device Viewport Frame Switcher */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-4xl px-4 py-2 text-xs text-[#5A3825]/75 border-b border-[#C9A24B]/20">
        <div className="flex items-center gap-2">
          <span className="font-script text-xl text-[#A83255] font-bold">Sweet Cravings</span>
          <span className="text-[11px] font-semibold text-[#5A3825]/60">• Mobile App Preview (Portrait)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSplash(true)}
            className="px-2.5 py-1 bg-white rounded-lg border border-[#C9A24B]/30 hover:text-[#A83255] text-xs font-medium cursor-pointer"
          >
            Replay Splash
          </button>
          <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#C9A24B]/30">
            <button
              onClick={() => setIsMobileFrameMode(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                !isMobileFrameMode ? 'bg-[#A83255] text-white shadow-xs' : 'text-[#5A3825]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
            <button
              onClick={() => setIsMobileFrameMode(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                isMobileFrameMode ? 'bg-[#A83255] text-white shadow-xs' : 'text-[#5A3825]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone Frame</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render in phone bezel on desktop if toggled, otherwise natural responsive view */}
      {isMobileFrameMode ? (
        <div className="my-6 w-full max-w-[430px] rounded-[48px] border-[10px] border-[#2B1B14] shadow-2xl overflow-hidden bg-[#FBF3DE] relative ring-1 ring-white/30">
          {/* iOS Dynamic Island Mockup */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#2B1B14] rounded-full z-50 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A100C] mr-4" />
          </div>
          <div className="h-[840px] overflow-y-auto no-scrollbar relative pt-4">
            {appContent}
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col bg-[#FBF3DE]">
          {appContent}
        </div>
      )}
    </div>
  );
}
