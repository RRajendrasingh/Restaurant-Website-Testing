import React, { useState } from 'react';
import { Phone, MessageSquare, Calendar, Clock, Users, Check, Copy, Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

export const ReservationSection: React.FC = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>(defaultDate);
  const [timeSlot, setTimeSlot] = useState<string>('19:00');
  const [seatingArea, setSeatingArea] = useState<string>('Main Grill Lounge');
  const [guestName, setGuestName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const timeSlots = [
    '12:00', '13:00', '14:30', '18:00', '19:00', '19:30', '20:15', '21:00'
  ];

  const seatingOptions = [
    { id: 'Main Grill Lounge', label: 'Main Grill Lounge', desc: 'Vibrant booths with direct kitchen view' },
    { id: 'Craft Beer Bar Counter', label: 'Bar Counter', desc: 'High-top stools by the local craft taps' },
    { id: 'Outdoor Patio', label: 'Outdoor Heated Patio', desc: 'Covered sidewalk terrace on Broadway' },
  ];

  const formattedMessage = `Hello CRAVE Host Stand, I would like to reserve a table for ${partySize} ${
    partySize === 1 ? 'guest' : 'guests'
  } on ${date} at ${timeSlot} in the ${seatingArea}.${
    guestName ? ` Name: ${guestName}.` : ''
  }${phone ? ` Phone: ${phone}.` : ''}${notes ? ` Notes: ${notes}.` : ''}`;

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
    formattedMessage
  )}`;

  const smsUrl = `sms:${RESTAURANT_INFO.contact.rawPhone}?body=${encodeURIComponent(
    formattedMessage
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCalendar = () => {
    const [hours, minutes] = timeSlot.split(':');
    const eventDate = new Date(date);
    eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    const endDate = new Date(eventDate.getTime() + 1.5 * 60 * 60 * 1000);

    const formatDateForIcs = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d+/g, '');

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CRAVE Craft Kitchen//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Table at CRAVE Kitchen (${partySize} guests)`,
      `DESCRIPTION:Reserved table at CRAVE in ${seatingArea}. Phone: ${RESTAURANT_INFO.contact.primaryPhone}`,
      `LOCATION:${RESTAURANT_INFO.address.fullFormatted}`,
      `DTSTART:${formatDateForIcs(eventDate)}`,
      `DTEND:${formatDateForIcs(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CRAVE-Table-${date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservations" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111114] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#F5A623] font-extrabold mb-3">
            Direct Host Connection
          </div>
          <h2 className="text-4xl sm:text-5xl font-display-punch font-black tracking-tight text-white uppercase">
            Book a Table or VIP Party
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
            We connect directly with you through phone and WhatsApp. Select your party size and timing below to connect with our host in one tap.
          </p>
        </div>

        {/* Direct Call Quick Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-6 bg-[#18181C] border border-[#F5A623]/30 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#F5A623] font-bold mb-1">
                Direct Host Hotline
              </div>
              <div className="text-2xl font-black text-white tracking-wider">
                {RESTAURANT_INFO.contact.primaryPhone}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Fastest way to confirm seats for tonight
              </div>
            </div>
            <a
              href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
              className="p-4 bg-[#F5A623] text-black rounded-full hover:bg-[#ffb438] transition-colors shadow-lg"
              title="Call Host Stand Now"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <div className="p-6 bg-[#18181C] border border-white/10 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
                WhatsApp Live Concierge
              </div>
              <div className="text-2xl font-black text-white tracking-wider">
                {RESTAURANT_INFO.contact.whatsappNumber}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Instant message confirmation & group parties
              </div>
            </div>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#22C55E] text-black rounded-full hover:bg-[#16a34a] transition-colors shadow-lg"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Interactive Reservation Form */}
        <div className="bg-[#17171B] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-3">
                  Number of Guests
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`py-2 text-sm font-black rounded-xl transition-all ${
                        partySize === size
                          ? 'bg-[#F5A623] text-black shadow-md scale-105'
                          : 'bg-[#212126] text-[#9CA3AF] hover:text-white hover:bg-[#2A2A30]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-date-crave"
                    className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-2"
                  >
                    Select Date
                  </label>
                  <input
                    id="res-date-crave"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="res-time-crave"
                    className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-2"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="res-time-crave"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-3">
                  Seating Vibe
                </label>
                <div className="space-y-2">
                  {seatingOptions.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setSeatingArea(area.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        seatingArea === area.id
                          ? 'bg-[#292218] border-[#F5A623]'
                          : 'bg-[#212126] border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          {area.label}
                        </span>
                        {seatingArea === area.id && (
                          <span className="text-xs text-[#F5A623] font-extrabold">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{area.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guest-name-crave"
                      className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="guest-name-crave"
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-phone-crave"
                      className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                    >
                      Your Mobile Number
                    </label>
                    <input
                      id="guest-phone-crave"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="guest-notes-crave"
                    className="block text-xs uppercase tracking-wider text-[#9CA3AF] font-bold mb-1"
                  >
                    Special Requests (Birthday, High Chairs, etc.)
                  </label>
                  <textarea
                    id="guest-notes-crave"
                    rows={2}
                    placeholder="e.g. Table near the window, celebrating friend birthday"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#212126] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#F5A623] resize-none"
                  />
                </div>

                <div className="bg-[#121215] p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="font-bold text-white uppercase tracking-wider">
                      Auto-Formatted Message Draft
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="hover:text-white flex items-center space-x-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-stone-300 font-mono leading-relaxed bg-[#1A1A1F] p-3 rounded-lg">
                    "{formattedMessage}"
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <a
                  href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
                  className="w-full py-3.5 px-4 bg-[#F5A623] hover:bg-[#ffb438] text-black font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Confirm Table: {RESTAURANT_INFO.contact.primaryPhone}</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 bg-[#22C55E] hover:bg-[#16a34a] text-black text-xs font-bold rounded-full flex items-center justify-center space-x-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>

                  <a
                    href={smsUrl}
                    className="py-3 px-3 bg-[#26262B] hover:bg-[#323238] border border-white/10 text-white text-xs font-bold rounded-full flex items-center justify-center space-x-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#F5A623]" />
                    <span>Send via SMS</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="w-full py-2.5 px-4 text-xs text-stone-400 hover:text-white border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center space-x-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Save to Phone Calendar (.ics)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
