import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram, Facebook, Compass, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO, getLiveRestaurantStatus } from '../data/restaurantData.ts';

export const ContactSection: React.FC = () => {
  const liveStatus = getLiveRestaurantStatus();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Catering & Events',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('Please provide your name, phone number, and message.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      inquiryType: 'Catering & Events',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D0E] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold mb-3">
            Get in Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-display-punch font-black tracking-tight text-white uppercase">
            Location, Hours & Direct Contact
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            Stop by our grill on Broadway or connect directly with our kitchen for group catering and fast delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Kitchen Status Card */}
            <div className="p-6 bg-[#161619] rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-5 h-5 text-[#F5A623]" />
                  <h3 className="text-base font-extrabold text-white">
                    Kitchen Operating Hours
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      liveStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-white font-bold">{liveStatus.statusText}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                {RESTAURANT_INFO.hours.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1 text-[#9CA3AF] border-b border-white/5 last:border-0"
                  >
                    <span className="font-bold text-white">{schedule.days}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-[#F5A623] font-mono font-bold">{schedule.time}</span>
                      <span className="text-stone-500 hidden sm:inline">({schedule.note})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Hotline Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#161619] rounded-3xl border border-white/5 space-y-2">
                <div className="flex items-center space-x-2 text-[#F5A623] text-xs font-extrabold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Downtown Grill</span>
                </div>
                <p className="text-sm text-white font-medium leading-relaxed">
                  {RESTAURANT_INFO.address.street}
                  <br />
                  {RESTAURANT_INFO.address.neighborhood}, {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.zip}
                </p>
                <a
                  href={RESTAURANT_INFO.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-[#F5A623] hover:underline pt-2 font-bold"
                >
                  <span>Open Directions in Maps</span>
                  <Compass className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>

              <div className="p-6 bg-[#161619] rounded-3xl border border-white/5 space-y-2">
                <div className="flex items-center space-x-2 text-[#F5A623] text-xs font-extrabold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>Direct Hotline</span>
                </div>
                <div className="space-y-1">
                  <div>
                    <span className="text-xs text-stone-400 block">Orders & Reservations:</span>
                    <a
                      href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
                      className="text-white hover:text-[#F5A623] text-lg font-black tracking-wider"
                    >
                      {RESTAURANT_INFO.contact.primaryPhone}
                    </a>
                  </div>
                  <div className="pt-1">
                    <span className="text-xs text-stone-400 block">WhatsApp Concierge:</span>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-bold"
                    >
                      {RESTAURANT_INFO.contact.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="p-6 bg-[#161619] rounded-3xl border border-white/5 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-extrabold">
                Follow On Social
              </span>
              <div className="flex items-center space-x-5">
                <a
                  href={RESTAURANT_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-white hover:text-[#F5A623] font-bold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#F5A623]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={RESTAURANT_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-white hover:text-[#F5A623] font-bold transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#F5A623]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#161619] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            {submitted ? (
              <div className="my-auto text-center py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#F5A623] mx-auto" />
                <h3 className="text-2xl font-black text-white">
                  Message Transmitted!
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed max-w-sm mx-auto">
                  Thanks, {formData.name}! Our kitchen manager will contact you at {formData.phone} shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs text-black bg-[#F5A623] hover:bg-[#ffb438] rounded-full font-extrabold transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-1">
                    Direct Catering & Inquiries
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    Planning a party, corporate lunch, or have an allergy question? Reach our kitchen team directly.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="contact-name-crave"
                    className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name-crave"
                    type="text"
                    required
                    placeholder="Jordan Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="contact-phone-crave"
                      className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="contact-phone-crave"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-type-crave"
                      className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                    >
                      Inquiry
                    </label>
                    <select
                      id="contact-type-crave"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    >
                      <option value="Catering & Events">Group Catering (10–100 pax)</option>
                      <option value="Allergy Question">Allergy Question</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message-crave"
                    className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message-crave"
                    required
                    rows={3}
                    placeholder="Tell us what you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#F5A623] hover:bg-[#ffb438] text-black font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit to Kitchen</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
