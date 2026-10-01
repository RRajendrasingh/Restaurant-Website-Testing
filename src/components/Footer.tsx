import React from 'react';
import { Utensils, Phone, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface FooterProps {
  onOpenDeploymentGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeploymentGuide }) => {
  return (
    <footer className="bg-[#0A0A0C] border-t border-white/5 py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2 text-2xl font-black tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#F5A623]">
                <Utensils className="w-4 h-4" />
              </div>
              <span>
                CRAVE <span className="text-[#F5A623]">KITCHEN</span>
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] max-w-sm leading-relaxed">
              Crispy layers, bold flavors, and 100% natural organic ingredients that hit different. Prepared fresh on Broadway.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#F5A623] font-bold">
              <Phone className="w-3.5 h-3.5" />
              <a
                href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
                className="hover:underline"
              >
                {RESTAURANT_INFO.contact.primaryPhone}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="font-extrabold text-white uppercase tracking-wider block mb-3">
              Explore
            </span>
            <ul className="space-y-2 text-[#9CA3AF]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Craft Burgers & Shakes
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  30-Min Fast Delivery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-white transition-colors">
                  Phone Table Booking
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Hostinger & GitHub */}
          <div className="space-y-3">
            <span className="font-extrabold text-white uppercase tracking-wider block mb-3">
              Deployment & Domain
            </span>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Step-by-step Hostinger custom domain connection, GitHub sync, automatic deployment, and free SSL guide.
            </p>
            <button
              onClick={onOpenDeploymentGuide}
              className="px-4 py-2 bg-[#17171B] hover:bg-[#202025] border border-white/10 rounded-full text-[#F5A623] text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hostinger & GitHub Setup</span>
            </button>
          </div>
        </div>

        {/* Hairline Divider & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500">
            © {new Date().getFullYear()} CRAVE Craft Kitchen & Burger Bar. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-stone-500 text-xs">
            <span>100% Organic</span>
            <span>·</span>
            <span>WCAG Accessible</span>
            <span>·</span>
            <span>HTTPS Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
