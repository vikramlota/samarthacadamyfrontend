import React from 'react';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { cn } from '../../lib/utils';

/**
 * FloatingButtons — fixed circle CTAs for instant contact.
 * Replaces the QuickConnect card widget in the layout.
 *
 * Props:
 *   phone           — tel: number, e.g. '+919988949969'
 *   whatsapp        — WA number without '+', e.g. '919041973105'
 *   whatsappMessage — URL-encoded pre-filled message
 *   show            — false hides both buttons (e.g. on /admin pages)
 */
const FloatingButtons = ({
  phone           = '+919988949969',
  whatsapp        = '919041973105',
  whatsappMessage = "Hi%2C%20I'm%20interested%20in%20Samarth%20Academy%20coaching.%20Please%20share%20details.",
  show            = true,
}) => {
  if (!show) return null;

  const waUrl = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      {/* ── Call button — bottom-left ── */}
      <div className="fixed bottom-6 left-6 z-50 group">
        <a
          href={`tel:${phone}`}
          aria-label="Call Samarth Academy"
          className={cn(
            'flex items-center justify-center rounded-full bg-green-500 text-white',
            'w-14 h-14 shadow-lifted',
            'transition-all duration-200 hover:scale-110 hover:bg-green-600 hover:shadow-xl',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
            'animate-pulse-soft',
          )}
        >
          <FaPhone className="text-xl" />
        </a>
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
            'px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
          )}
        >
          Call us now
        </span>
      </div>

      {/* ── WhatsApp button — bottom-right ── */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Samarth Academy"
          className={cn(
            'flex items-center justify-center rounded-full text-white',
            'w-14 h-14 shadow-lifted',
            'transition-all duration-200 hover:scale-110 hover:shadow-xl',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          )}
          style={{ backgroundColor: '#25D366' }}
        >
          <FaWhatsapp className="text-2xl" />
        </a>
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute bottom-full right-0 mb-2',
            'px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
          )}
        >
          Chat on WhatsApp
        </span>
      </div>
    </>
  );
};

export default FloatingButtons;
