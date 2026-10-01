import React from 'react';
import { X, Trash2, Plus, Minus, Phone, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/index.ts';
import { RESTAURANT_INFO } from '../data/restaurantData.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const formattedOrderText = `Hello CRAVE Kitchen, I would like to place an order:\n${items
    .map(
      (ci) => `• ${ci.quantity}x ${ci.item.name} ($${(ci.item.price * ci.quantity).toFixed(2)})`
    )
    .join('\n')}\nTotal: $${subtotal.toFixed(2)}`;

  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.contact.whatsappNumber}?text=${encodeURIComponent(
    formattedOrderText
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Order Cart Slide-over"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131316] border-l border-white/10 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161619]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F5A623] text-black flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Order</h3>
                <p className="text-xs text-[#9CA3AF]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in bag
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#9CA3AF] hover:text-white rounded-full hover:bg-white/5 transition-colors focus-visible:outline-none"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#9CA3AF]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white">Your Bag is Empty</h4>
                <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto">
                  Browse our craft burgers, crispy chicken, and loaded hot dogs to start building your meal.
                </p>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="p-3.5 bg-[#1B1B1F] rounded-xl border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{cartItem.item.imageEmoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {cartItem.item.name}
                      </h4>
                      <span className="text-xs text-[#F5A623] font-black">
                        ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-[#27272A] rounded-full p-1 border border-white/5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-2">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.item.id)}
                      className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Direct Phone/WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-[#161619] border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#9CA3AF]">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#9CA3AF] text-xs">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-400 font-bold">Free (30 Min)</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/5">
                  <span>Total Due</span>
                  <span className="text-[#F5A623]">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Direct Ordering Through Numbers (User Requirement) */}
              <div className="space-y-2">
                <a
                  href={`tel:${RESTAURANT_INFO.contact.rawPhone}`}
                  className="w-full py-3.5 px-4 bg-[#F5A623] hover:bg-[#ffb338] text-black font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Order: {RESTAURANT_INFO.contact.primaryPhone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
