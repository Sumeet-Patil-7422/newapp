import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, Clock3, Sparkles, Store } from 'lucide-react';

export type NavTab = 'home' | 'menu' | 'custom' | 'cart' | 'orders' | 'about';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  cartCount,
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'menu' as NavTab, label: 'Menu', icon: UtensilsCrossed },
    { id: 'custom' as NavTab, label: 'Custom', icon: Sparkles, highlight: true },
    { id: 'cart' as NavTab, label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'orders' as NavTab, label: 'Orders', icon: Clock3 },
    { id: 'about' as NavTab, label: 'About', icon: Store },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#C9A24B]/25 shadow-lg shadow-[#5A3825]/10 max-w-lg mx-auto"
    >
      <div className="grid grid-cols-6 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 transition-colors min-h-[48px] cursor-pointer ${
                isActive ? 'text-[#A83255]' : 'text-[#5A3825]/60 hover:text-[#5A3825]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#A83255] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
                {tab.highlight && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A24B]" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap ${
                  isActive ? 'text-[#A83255] font-semibold' : 'text-[#5A3825]/70'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-0.5 bg-[#A83255] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
