import React from 'react';
import { Sparkles, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#151513] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Two-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Culinary Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#FDFBF7] leading-tight">
              Rooted in nature. Elevated by relentless craft.
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]" />
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#A8A29E] leading-relaxed">
            <p>
              Founded by Executive Chef Julian Vance and Master Sommelier Hélène Laurent, AURA was born from a singular conviction: that true fine dining should be unhurried, hyper-seasonal, and stripped of unnecessary theatrical pretension.
            </p>
            <p>
              We cultivate daily partnerships with fourth-generation growers across upstate New York, divers who harvest scallops by hand along sub-arctic shoals, and artisanal olive oil pressers in Andalusia. When an ingredient is at the pinnacle of its natural sweetness and aroma, our role in the kitchen is merely to listen and coax out its purest expression.
            </p>
            <p>
              Our subterranean cellar houses over 450 temperature-controlled references, ranging from biodynamic winemakers in the Jura to iconic Grand Cru Burgundies.
            </p>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Cards (No generic pills, clean typography) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
          <div className="p-6 bg-[#1A1A18] rounded border border-white/5 space-y-2">
            <div className="text-3xl font-serif-luxury text-[#C5A880] tabular-nums font-semibold">
              100%
            </div>
            <h3 className="text-sm font-semibold text-[#FDFBF7]">
              Biodynamic & Farm Direct
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Every vegetable, herb, and edible flower is harvested within 24 hours of dinner service from verified Hudson Valley regenerative farms.
            </p>
          </div>

          <div className="p-6 bg-[#1A1A18] rounded border border-white/5 space-y-2">
            <div className="text-3xl font-serif-luxury text-[#C5A880] tabular-nums font-semibold">
              450+
            </div>
            <h3 className="text-sm font-semibold text-[#FDFBF7]">
              Cellar References
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Curated by Master Sommelier Hélène Laurent, spanning rare European library vintages and sustainable low-intervention producers.
            </p>
          </div>

          <div className="p-6 bg-[#1A1A18] rounded border border-white/5 space-y-2">
            <div className="text-3xl font-serif-luxury text-[#C5A880] tabular-nums font-semibold">
              8 Seats
            </div>
            <h3 className="text-sm font-semibold text-[#FDFBF7]">
              Interactive Chef Counter
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              An intimate front-row view into the finishing line where each course is presented directly by our culinary team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
