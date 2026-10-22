export type CategoryId = 'all' | 'cakes' | 'cupcakes' | 'cookies' | 'macarons' | 'brownies' | 'custom' | 'gifting';

export interface Product {
  id: string;
  name: string;
  category: 'cakes' | 'cupcakes' | 'cookies' | 'macarons' | 'brownies' | 'gifting';
  tagline: string;
  description: string;
  basePrice: number; // in INR ₹
  weightOptions: string[]; // e.g., ['500g', '1kg', '2kg'] or ['Box of 6', 'Box of 12']
  priceMultipliers: Record<string, number>; // multiplier for each weight option
  flavors: string[];
  isEgglessAvailable: boolean;
  defaultEggless: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  preparationHours: number; // e.g., 4 hours or 24 hours
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
  accentColor?: string;
  highlights: string[];
}

export interface CartCustomization {
  weight: string;
  flavor: string;
  isEggless: boolean;
  messageOnCake?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart entry ID
  product: Product;
  quantity: number;
  customization: CartCustomization;
  itemPrice: number; // price for 1 unit with this weight/customization
  totalPrice: number; // itemPrice * quantity
}

export interface CustomCakeOrder {
  id: string;
  occasion: string;
  cakeTiers: string;
  flavor: string;
  weight: string;
  isEggless: boolean;
  themeNotes: string;
  referencePhotoUrl?: string;
  messageOnCake?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  estimatedPrice: number;
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  notes?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'WhatsApp Sent' | 'Confirmed' | 'Baking' | 'Ready for Delivery';
}
