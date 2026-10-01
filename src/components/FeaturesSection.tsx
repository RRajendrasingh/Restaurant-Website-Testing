import React from 'react';
import { Clock, Leaf, Flame, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Clock,
      tag: 'Lightning Delivery',
      title: 'Under 30 Minutes',
      description: 'Our proprietary prep line guarantees your burgers leave the kitchen within 8 minutes of ordering.',
      highlightColor: 'text-[#F5A623]',
      bgColor: 'bg-[#F5A623]/10',
    },
    {
      icon: Leaf,
      tag: 'Pure Provenance',
      title: '100% Natural Organic',
      description: 'Zero antibiotics, zero hormones. 100% grass-fed Angus beef and daily baked artisanal potato brioche.',
      highlightColor: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
    {
      icon: Flame,
      tag: 'Signature Method',
      title: 'Charcoal-Smash Crust',
      description: 'Pressed onto 500°F cast iron plates for that iconic lacy, caramelized edge and ultra-juicy center.',
      highlightColor: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
    },
    {
      icon: Phone,
      tag: 'Zero Middleman Fees',
      title: 'Direct Phone & Chat',
      description: 'Order directly through phone or WhatsApp to skip delivery app markups and get personalized host service.',
      highlightColor: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111113] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold mb-3">
            Why We Hit Different
          </div>
          <h2 className="text-4xl sm:text-5xl font-display-punch font-black tracking-tight text-white uppercase">
            Crafted for Unapologetic Flavor
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            We ditched generic commercial fast food to engineer the ultimate burger experience—uncompromising quality, ultra-fast delivery, and direct human connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#17171B] rounded-2xl border border-white/5 hover:border-white/15 transition-all duration-300 space-y-4 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${feat.bgColor} flex items-center justify-center ${feat.highlightColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  {feat.tag}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
