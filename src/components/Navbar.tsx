import React, { useState, useEffect } from 'react';
import { Utensils, Search, ShoppingBag, Phone, Menu, X, ShieldCheck, User } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenDeploymentGuide: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenDeploymentGuide,
  onSearchClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Features', href: '#features' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0D0D0E]/95 backdrop-blur-md py-3 border-b border-white/5 shadow-2xl'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Lockup with Fork & Knife Icon (like in the sample image) */}
            <a
              href="#"
              className="flex items-center space-x-2 text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity focus-visible:outline-none"
              aria-label="CRAVE Restaurant Home"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#F5A623]">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-extrabold tracking-tight">
                CRAVE <span className="text-[#F5A623]">KITCHEN</span>
              </span>
            </a>

            {/* Zone 2: Central Floating Capsule Navigation Bar (exact match to sample image!) */}
            <nav
              className="hidden lg:flex items-center bg-[#17171B]/90 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-lg"
              aria-label="Primary Navigation"
            >
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => {
                  const isActive = activeNav === link.name;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setActiveNav(link.name)}
                      className={`px-5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-[#C084FC]/30 text-[#E9D5FF] shadow-sm'
                          : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}

                {/* Search Affordance */}
                <button
                  onClick={onSearchClick}
                  type="button"
                  className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-full transition-colors ml-1 focus-visible:ring-1 focus-visible:ring-[#F5A623]"
                  aria-label="Search menu items"
                  title="Search menu"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>

            {/* Zone 3: Actions (Cart Button + Avatar + Call Host) */}
            <div className="flex items-center space-x-3">
              {/* Hostinger & GitHub Deploy Helper */}
              <button
                onClick={onOpenDeploymentGuide}
                className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#9CA3AF] hover:text-white bg-[#18181B] border border-white/10 rounded-full transition-colors"
                title="View Hostinger and GitHub Deployment Guide"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Hostinger & GitHub</span>
              </button>

              {/* Direct Phone Dial Button */}
              <a
                href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-black bg-[#F5A623] hover:bg-[#ffb438] rounded-full transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Call kitchen hotline at ${RESTAURANT_INFO.contact.primaryPhone}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{RESTAURANT_INFO.contact.primaryPhone}</span>
              </a>

              {/* Cart Button (Circular White Button with Counter Badge like in sample!) */}
              <button
                onClick={onOpenCart}
                className="relative w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-black" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0D0D0E]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Avatar Circle (matching sample screenshot!) */}
              <div className="hidden sm:flex items-center space-x-1 pl-1">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#18181B] flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="User avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <User className="w-4 h-4 text-[#F5A623]" />
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white bg-[#18181B] border border-white/10 rounded-full focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121214] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-2xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <a
                href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
                className="w-full py-2.5 px-4 bg-[#F5A623] text-black font-bold text-center rounded-full flex items-center justify-center space-x-2 text-xs uppercase tracking-wider"
              >
                <Phone className="w-4 h-4" />
                <span>Call Kitchen: {RESTAURANT_INFO.contact.primaryPhone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDeploymentGuide();
                }}
                className="w-full py-2 px-4 border border-white/15 text-xs text-[#9CA3AF] rounded-full flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Hostinger & GitHub Setup Guide</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
