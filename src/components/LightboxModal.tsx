import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Sparkles, Building, Utensils, Wine } from 'lucide-react';
import { GalleryItem } from '../types/index.ts';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || !items[currentIndex]) return null;
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'sparkles':
      case 'flame':
        return <Sparkles className="w-12 h-12 text-[#C5A880]/60" />;
      case 'building':
      case 'users':
        return <Building className="w-12 h-12 text-[#C5A880]/60" />;
      case 'utensils':
        return <Utensils className="w-12 h-12 text-[#C5A880]/60" />;
      case 'wine':
      case 'glass':
        return <Wine className="w-12 h-12 text-[#C5A880]/60" />;
      default:
        return <Camera className="w-12 h-12 text-[#C5A880]/60" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Bar Navigation */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10 text-xs text-[#A8A29E]">
        <div className="flex items-center space-x-2">
          <span className="uppercase tracking-widest text-[#C5A880] font-semibold">
            {currentItem.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {currentIndex + 1} of {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#A8A29E] hover:text-[#FDFBF7] bg-white/5 hover:bg-white/10 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
          aria-label="Close photo lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Frame Container */}
      <div className="relative max-w-5xl w-full flex flex-col items-center justify-center my-auto">
        <div className="w-full relative aspect-video sm:aspect-[16/10] bg-gradient-to-br from-[#1C1A17] via-[#24201B] to-[#121211] border border-white/10 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-2xl">
          {/* Visual Atmosphere Rendering */}
          <div className="absolute inset-0 bg-radial-at-c from-[#C5A880]/10 via-transparent to-black/60 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center max-w-lg space-y-4">
            <div className="p-4 rounded-full bg-white/5 border border-white/10">
              {renderIcon(currentItem.accentIcon || 'camera')}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium">
              AURA Curated Archive
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif-luxury text-[#FDFBF7] leading-tight">
              {currentItem.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-md">
              {currentItem.description}
            </p>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#78716C] border-t border-white/5 pt-3">
            <div className="flex items-center space-x-1.5">
              <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{currentItem.photographerCredit}</span>
            </div>
            <span>Use Left/Right arrow keys to browse</span>
          </div>
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-[#FDFBF7] bg-[#181816]/80 hover:bg-[#C5A880] hover:text-[#121211] rounded-full border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-[#FDFBF7] bg-[#181816]/80 hover:bg-[#C5A880] hover:text-[#121211] rounded-full border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
