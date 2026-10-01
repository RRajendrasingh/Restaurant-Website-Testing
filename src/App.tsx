import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FeaturesSection } from './components/FeaturesSection.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { ReservationSection } from './components/ReservationSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { DishDetailModal } from './components/DishDetailModal.tsx';
import { DeploymentModal } from './components/DeploymentModal.tsx';
import { MenuItem, CartItem } from './types/index.ts';
import { MENU_ITEMS } from './data/menuData.ts';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [deploymentGuideOpen, setDeploymentGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Add item to cart
  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchFocus = () => {
    scrollToMenu();
    // highlight/focus search input if desired
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-[#F3F4F6] selection:bg-[#F5A623]/30 selection:text-[#FFFFFF] flex flex-col font-sans">
      {/* Top Floating Capsule Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenDeploymentGuide={() => setDeploymentGuideOpen(true)}
        onSearchClick={handleSearchFocus}
      />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* Hero Section matching the user's sample image */}
        <HeroSection
          onOrderNow={() => {
            // If empty, add default flagship Smoky Bloom or open cart
            if (cart.length === 0) {
              const smokyBloom = MENU_ITEMS[0];
              if (smokyBloom) handleAddToCart(smokyBloom);
            } else {
              setCartOpen(true);
            }
          }}
          onExploreMenu={scrollToMenu}
          onSelectProduct={(dish) => setSelectedDish(dish)}
        />

        {/* Why We Hit Different (30 min delivery, organic, smash method) */}
        <FeaturesSection />

        {/* Full Interactive Menu with Search & Category Pills */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToCart={(dish) => handleAddToCart(dish)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Table Reservation & Phone Connection (connecting through numbers) */}
        <ReservationSection />

        {/* Customer Reviews & 4.9 Score */}
        <ReviewsSection />

        {/* Location, Hours, Contact Form & Social Media */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenDeploymentGuide={() => setDeploymentGuideOpen(true)} />

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(item) => handleAddToCart(item)}
      />

      {/* Hostinger & GitHub Production Deployment Guide Modal */}
      <DeploymentModal
        isOpen={deploymentGuideOpen}
        onClose={() => setDeploymentGuideOpen(false)}
      />
    </div>
  );
}
