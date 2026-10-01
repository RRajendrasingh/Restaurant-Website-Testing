import React, { useState, useMemo } from 'react';
import { Search, Plus, Star, Flame, Leaf, ShoppingBag, Info } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData.ts';
import { MenuCategory, MenuItem } from '../types/index.ts';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onAddToCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');

  const categories: { key: MenuCategory; label: string; emoji: string }[] = [
    { key: 'all', label: 'All Items', emoji: '✨' },
    { key: 'burgers', label: 'Craft Burgers', emoji: '🍔' },
    { key: 'chicken', label: 'Crispy Chicken', emoji: '🍗' },
    { key: 'hotdogs', label: 'Loaded Dogs', emoji: '🌭' },
    { key: 'sides', label: 'Truffle Fries & Sides', emoji: '🍟' },
    { key: 'drinks', label: 'Artisanal Shakes', emoji: '🥤' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      const searchMatch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold mb-2">
              Flavors That Hit Different
            </div>
            <h2 className="text-4xl sm:text-5xl font-display-punch font-black tracking-tight text-white uppercase">
              Our Full Menu & Signature Crushes
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, tenders, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#17171B] border border-white/10 rounded-full text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#F5A623] transition-colors"
            />
          </div>
        </div>

        {/* Category Pills (matching the sample capsule aesthetic) */}
        <div className="flex items-center overflow-x-auto pb-4 gap-2 scrollbar-none mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-200 flex items-center space-x-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#F5A623] text-black shadow-lg shadow-[#F5A623]/20 scale-105'
                    : 'bg-[#17171B] text-[#9CA3AF] hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#161619] border border-white/10 hover:border-[#F5A623]/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
              onClick={() => onSelectDish(item)}
            >
              {/* Product Visual Area */}
              <div
                className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${item.imageFallbackGradient} relative flex items-center justify-center p-4 overflow-hidden mb-4`}
              >
                <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {item.imageEmoji}
                </span>

                {/* Dietary Badge */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                  {item.dietary.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-extrabold text-white"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-bold text-[#F5A623] flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-[#F5A623]" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1.5 flex-1 mb-4">
                <div className="text-[11px] text-[#F5A623] font-bold uppercase tracking-wider">
                  {item.subtitle}
                </div>
                <h3 className="text-lg font-extrabold text-white group-hover:text-[#F5A623] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <span className="text-lg font-black text-white">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.calories && (
                    <span className="text-[10px] text-stone-500 block">
                      {item.calories} kcal
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item);
                  }}
                  className="px-3.5 py-1.5 bg-[#F5A623] hover:bg-[#ffb53d] text-black font-extrabold text-xs rounded-full flex items-center space-x-1.5 transition-colors shadow-sm active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
