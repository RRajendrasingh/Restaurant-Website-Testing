export type MenuCategory = 'all' | 'burgers' | 'chicken' | 'hotdogs' | 'sides' | 'drinks';

export interface MenuItem {
  id: string;
  category: 'burgers' | 'chicken' | 'hotdogs' | 'sides' | 'drinks';
  name: string;
  subtitle: string;
  description: string;
  keyIngredients: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  calories?: number;
  dietary: ('100% Organic' | 'Chef Special' | 'Spicy' | 'Plant-Powered' | 'Crispy')[];
  cardBgColor?: string;
  imageEmoji: string;
  imageFallbackGradient: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  category: 'burgers' | 'kitchen' | 'vibe' | 'plating' | 'interior' | 'cellar';
  title: string;
  description: string;
  aspectRatio: string;
  imageFallbackGradient: string;
  accentIcon?: string;
  photographerCredit?: string;
  badge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  dish: string;
  comment: string;
  date: string;
  avatarSeed: string;
}
