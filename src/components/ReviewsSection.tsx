import React from 'react';
import { Star, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { REVIEWS } from '../data/menuData.ts';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold mb-2">
              Loved by 2,000+ Foodies
            </div>
            <h2 className="text-4xl sm:text-5xl font-display-punch font-black tracking-tight text-white uppercase">
              What The Streets Are Saying
            </h2>
          </div>

          <div className="flex items-center space-x-3 bg-[#17171B] px-5 py-3 rounded-2xl border border-white/10 shrink-0">
            <div className="flex items-center space-x-1 text-[#F5A623]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F5A623] text-[#F5A623]" />
              ))}
            </div>
            <div className="text-sm font-extrabold text-white">
              {RESTAURANT_INFO.rating} <span className="text-stone-400 font-normal">({RESTAURANT_INFO.reviewsCount})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-[#161619] rounded-2xl border border-white/5 hover:border-[#F5A623]/30 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#F5A623]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                  <span className="text-xs text-stone-500 font-medium">{rev.date}</span>
                </div>

                <p className="text-sm text-[#D1D5DB] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {rev.author}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <span className="text-xs text-[#F5A623] font-medium">
                    Ordered: {rev.dish}
                  </span>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#27272A] flex items-center justify-center font-bold text-white text-xs">
                  {rev.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
