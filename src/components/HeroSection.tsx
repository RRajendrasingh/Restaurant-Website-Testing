import React, { useState } from 'react';
import { ArrowUpRight, Star, Heart, ShoppingBag, ChevronLeft, ChevronRight, Leaf, ShieldCheck, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';
import { MenuItem } from '../types/index.ts';

interface HeroSectionProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
  onSelectProduct: (dish: MenuItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNow,
  onExploreMenu,
  onSelectProduct,
}) => {
  const [favoriteActive, setFavoriteActive] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroShowcaseCards = [
    {
      id: 'smoky-bloom',
      title: 'Smoky Bloom',
      description: 'Smoked mushrooms, garlic cream, pickles',
      price: '$4.39',
      bgColor: 'bg-[#F97316]',
      category: 'burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      emoji: '🍔',
      tag: 'Chef Favorite',
    },
    {
      id: 'fried-chicken',
      title: 'Fried chicken',
      description: 'Buttermilk 12-spice crispy drumsticks',
      price: '$5.99',
      bgColor: 'bg-[#FFE4E6]',
      category: 'chicken',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
      emoji: '🍗',
      tag: 'Crispy Gold',
    },
    {
      id: 'hot-dogs',
      title: 'Hot Dogs',
      description: 'All-beef loaded frank, mustard & relish',
      price: '$3.89',
      bgColor: 'bg-[#FECDD3]',
      category: 'hotdogs',
      image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&auto=format&fit=crop&q=80',
      emoji: '🌭',
      tag: 'Artisanal',
    },
  ];

  return (
    <section className="relative min-h-[95vh] pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-[#0D0D0E] overflow-hidden flex flex-col justify-center">
      {/* Background Ambient Lighting & Flying Seasoning Splashes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm amber / orange radial glow behind the burger */}
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#F5A623]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#EF4444]/5 rounded-full blur-[150px]" />

        {/* Flying Condiment / Droplet particles */}
        <div className="absolute top-28 right-[42%] w-3 h-3 rounded-full bg-[#F5A623] opacity-80 blur-[0.5px] animate-bounce" />
        <div className="absolute top-44 right-[12%] w-4 h-4 rounded-full bg-[#EF4444] opacity-75 blur-[0.5px]" />
        <div className="absolute top-64 right-[48%] w-2 h-2 rounded-full bg-[#F5A623] opacity-60" />
        <div className="absolute bottom-40 right-[35%] w-3 h-3 rounded-full bg-[#FBBF24] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Massive Headline & CTAs (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-7">
            {/* The Signature Big Punchy Headline */}
            <div className="relative">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-display-punch font-black uppercase tracking-tight leading-[0.88] select-none">
                  {/* Speckled confetti effect on SALAD LEFT */}
                  <span className="block text-confetti-mask">
                    SALAD LEFT
                  </span>
                  {/* Glowing Yellow-Gold THE CHAT */}
                  <span className="block text-[#F5A623] drop-shadow-[0_4px_24px_rgba(245,166,35,0.35)]">
                    THE CHAT
                  </span>
                </h1>

                {/* Circular 100% Organic Badge (matching sample screenshot!) */}
                <div className="inline-flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#16A34A] border-4 border-[#22C55E]/40 text-white shadow-xl shadow-green-950/60 p-1 text-center transform rotate-[-6deg] hover:rotate-0 transition-transform">
                  <div className="border border-white/40 rounded-full w-full h-full flex flex-col items-center justify-center p-1">
                    <span className="text-[8px] uppercase tracking-wider font-extrabold text-green-200">
                      Quality
                    </span>
                    <span className="text-xs sm:text-sm font-black leading-tight text-white">
                      100%
                    </span>
                    <span className="text-[8px] font-bold uppercase leading-none text-green-100">
                      Natural
                    </span>
                    <span className="text-[7px] text-green-200 font-medium">
                      Ingredients
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl font-normal leading-relaxed">
              Crispy layers, bold flavors, and chef-crafted meals that actually hit different. 100% certified organic farm-sourced meats and brioche.
            </p>

            {/* Two Primary Pill Buttons (Exact match to sample!) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Order Now (White Pill Button) */}
              <button
                type="button"
                onClick={onOrderNow}
                className="px-8 py-3.5 bg-white hover:bg-gray-100 text-black font-extrabold text-sm sm:text-base rounded-full flex items-center space-x-2 transition-all duration-200 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
              >
                <span>Order Now</span>
                <ArrowUpRight className="w-5 h-5 text-black stroke-[2.5]" />
              </button>

              {/* Explore Menu (Dark Pill Button with Border) */}
              <button
                type="button"
                onClick={onExploreMenu}
                className="px-8 py-3.5 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-white font-bold text-sm sm:text-base rounded-full flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none"
              >
                <span>Explore Menu</span>
                <ArrowUpRight className="w-5 h-5 text-white stroke-[2.5]" />
              </button>
            </div>

            {/* Social Proof Row with 3 Overlapping Avatars + Rating (matching sample!) */}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0D0D0E] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer avatar"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0D0D0E] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer avatar"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0D0D0E] object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Customer avatar"
                />
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-[#0D0D0E] bg-[#27272A] text-[10px] font-bold text-white">
                  1K
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center space-x-1 text-[#F5A623]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <div className="text-xs text-[#9CA3AF] font-medium">
                  <span className="text-white font-bold">4.9</span> (2,358 reviews)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Burger Showcase with Floating 30 Min Badge & Slider Cards (5-6 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 relative mt-8 lg:mt-0 flex flex-col items-center">
            {/* The Massive Gourmet Burger Centerpiece */}
            <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-square flex items-center justify-center">
              {/* Floating "Deliver in 30 Min" Card (Exact match to sample!) */}
              <div className="absolute top-4 left-0 sm:left-4 z-20 bg-[#1C1C20]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-0.5 transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="text-xs text-[#9CA3AF] font-medium">
                  Deliver in
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  30 Min
                </div>
                <div className="text-[11px] text-[#A1A1AA] pt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Super fast Delivery
                </div>
              </div>

              {/* Main Burger Photo with Flying Splashes */}
              <div className="relative w-full h-full flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80"
                  alt="Juicy gourmet double cheddar craft burger with sesame seeds and ripe tomatoes"
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Flying Sesame Seed / Sauce Sprinkles */}
                <div className="absolute top-12 right-6 w-3.5 h-3.5 rounded-full bg-[#EAB308] opacity-90 blur-[0.5px] animate-pulse" />
                <div className="absolute top-20 right-0 w-2.5 h-2.5 rounded-full bg-[#EF4444] opacity-80" />
                <div className="absolute bottom-28 left-6 w-3 h-3 rounded-full bg-[#F59E0B] opacity-85" />
              </div>
            </div>

            {/* Bottom-Right 3-Product Mini-Showcase Slider (Exact match to sample screenshot!) */}
            <div className="w-full mt-4 space-y-3">
              {/* Carousel Arrows Header */}
              <div className="flex items-center justify-end space-x-2 pr-2">
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : heroShowcaseCards.length - 1))}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-none"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev < heroShowcaseCards.length - 1 ? prev + 1 : 0))}
                  className="w-8 h-8 rounded-full bg-[#9333EA] hover:bg-[#A855F7] text-white flex items-center justify-center transition-colors shadow-md focus-visible:outline-none"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Interactive Cards side-by-side */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                {heroShowcaseCards.map((card, idx) => {
                  const isActive = idx === activeSlide;
                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveSlide(idx)}
                      className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'ring-2 ring-[#F5A623] scale-[1.02] shadow-2xl'
                          : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Top Surface with Background Color (Orange, Peach, Coral) */}
                      <div className={`relative h-24 sm:h-28 ${card.bgColor} p-2 flex items-center justify-center overflow-hidden`}>
                        {/* Heart / Favorite Button on active card */}
                        {isActive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFavoriteActive(!favoriteActive);
                            }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-stone-800 flex items-center justify-center shadow hover:scale-110 transition-transform"
                            aria-label="Favorite item"
                          >
                            <Heart className={`w-3.5 h-3.5 ${favoriteActive ? 'fill-red-500 text-red-500' : 'text-stone-800'}`} />
                          </button>
                        )}

                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-contain filter drop-shadow-md transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Bottom White/Light Card Surface */}
                      <div className="bg-white p-2.5 sm:p-3 text-left flex flex-col justify-between min-h-[70px]">
                        <div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 truncate">
                            {card.title}
                          </h4>
                          {isActive && (
                            <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                              {card.description}
                            </p>
                          )}
                        </div>

                        {isActive ? (
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                            <span className="text-xs sm:text-sm font-black text-stone-900">
                              {card.price}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOrderNow();
                              }}
                              className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-stone-800 transition-colors"
                              aria-label={`Add ${card.title} to order`}
                            >
                              <ShoppingBag className="w-3 h-3" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
