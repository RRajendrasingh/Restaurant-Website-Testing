import React, { useState } from 'react';
import { Camera, Sparkles, Building, Wine, Utensils, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData.ts';
import { GalleryItem } from '../types/index.ts';

interface GallerySectionProps {
  onOpenLightbox: (index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenLightbox }) => {
  const [filter, setFilter] = useState<'all' | 'plating' | 'interior' | 'cellar'>('all');

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const renderVisualCard = (item: GalleryItem, index: number) => {
    return (
      <div
        key={item.id}
        onClick={() => onOpenLightbox(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenLightbox(index);
          }
        }}
        className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#181816] border border-white/5 hover:border-[#C5A880]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
      >
        {/* Aesthetic Visual Canvas with Gradient and Vector Elements */}
        <div
          className={`aspect-[4/3] w-full bg-gradient-to-br ${item.imageFallbackGradient} relative flex flex-col items-center justify-center p-6 text-center transition-transform duration-500 group-hover:scale-105`}
        >
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-radial-at-t from-white/5 to-transparent pointer-events-none" />

          {/* Center Graphic */}
          <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-3 group-hover:bg-[#C5A880]/20 transition-colors">
            {item.category === 'plating' && <Utensils className="w-8 h-8 text-[#C5A880]" />}
            {item.category === 'interior' && <Building className="w-8 h-8 text-[#C5A880]" />}
            {item.category === 'cellar' && <Wine className="w-8 h-8 text-[#C5A880]" />}
          </div>

          <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
            {item.category}
          </div>

          <h3 className="text-lg font-serif-luxury text-[#FDFBF7] font-medium leading-snug max-w-xs">
            {item.title}
          </h3>

          {/* Hover Zoom Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <div className="text-center space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <ZoomIn className="w-6 h-6 text-[#C5A880] mx-auto" />
              <p className="text-xs text-[#D6D3D1] max-w-xs line-clamp-3">
                {item.description}
              </p>
              <span className="text-[11px] text-[#A8A29E] block">Click to expand</span>
            </div>
          </div>
        </div>

        {/* Card Metadata Footer */}
        <div className="p-3 bg-[#141413] border-t border-white/5 flex items-center justify-between text-xs text-[#78716C]">
          <span className="capitalize">{item.category}</span>
          <span className="truncate max-w-[160px]">{item.photographerCredit}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#121211] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium mb-3">
            Atmosphere & Plating Archive
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#FDFBF7] tracking-tight mb-4">
            Visual Harmony & Cellar Craft
          </h2>
          <p className="text-sm sm:text-base text-[#A8A29E] leading-relaxed">
            Step inside our dining room, observe the meticulous culinary finishing at the counter, and explore our climate-controlled subterranean cellar.
          </p>
        </div>

        {/* Filter Controls (Interactive Segmented Buttons) */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Perspectives' },
            { id: 'plating', label: 'Culinary Plating' },
            { id: 'interior', label: 'Dining Architecture' },
            { id: 'cellar', label: 'Subterranean Cellar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[#C5A880] text-[#121211] font-bold shadow-sm'
                  : 'bg-[#181816] text-[#A8A29E] hover:text-[#FDFBF7] hover:bg-[#20201D] border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => renderVisualCard(item, idx))}
        </div>
      </div>
    </section>
  );
};
