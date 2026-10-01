import React from 'react';
import { X, Flame, Star, Plus, Phone, MessageSquare, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types/index.ts';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crave-dish-title"
    >
      <div
        className="relative w-full max-w-xl bg-[#161619] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Visual Banner */}
        <div
          className={`w-full h-48 sm:h-56 bg-gradient-to-br ${item.imageFallbackGradient} relative flex items-center justify-center overflow-hidden`}
        >
          <span className="text-8xl filter drop-shadow-2xl">{item.imageEmoji}</span>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-colors"
            aria-label="Close dish modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 flex gap-1.5">
            {item.dietary.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-bold text-white"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#F5A623] font-bold">
                {item.subtitle}
              </div>
              <h2 id="crave-dish-title" className="text-2xl sm:text-3xl font-black text-white">
                {item.name}
              </h2>
            </div>
            <div className="text-2xl font-black text-[#F5A623]">
              ${item.price.toFixed(2)}
            </div>
          </div>

          <p className="text-sm text-[#D1D5DB] leading-relaxed">
            {item.description}
          </p>

          <div className="p-4 bg-[#202025] rounded-2xl border border-white/5 space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-[#9CA3AF] font-bold">
              Key Farm Sourced Ingredients
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-white">
              {item.keyIngredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-black/40 border border-white/10 rounded-full"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {item.calories && (
            <div className="flex items-center justify-between text-xs text-stone-400 py-1 border-t border-white/5">
              <span>Nutritional Estimate:</span>
              <span className="text-white font-bold">{item.calories} kcal / serving</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#121215] border-t border-white/10 flex items-center justify-between gap-3">
          <a
            href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
            className="px-4 py-2.5 bg-[#26262C] hover:bg-[#32323A] text-white font-bold text-xs rounded-full flex items-center space-x-1.5 transition-colors border border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Call Kitchen</span>
          </a>

          <button
            onClick={() => {
              onAddToCart(item);
              onClose();
            }}
            className="flex-1 px-6 py-2.5 bg-[#F5A623] hover:bg-[#ffb438] text-black font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Order (${item.price.toFixed(2)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
