import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPhone, FaTimes } from 'react-icons/fa';

const PHONE = '+91 99889 49969';
const PHONE_TEL = 'tel:+919988949969';

export default function StickyPhoneBar() {
  const [isVisible,   setIsVisible]   = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('phoneBarDismissed')) {
      setIsDismissed(true);
      return;
    }
    const onScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('phoneBarDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -56 }}
          animate={{ y: 0 }}
          exit={{ y: -56 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 bg-red-500 text-white z-50 lg:hidden shadow-card"
        >
          <div className="container-custom flex items-center justify-between py-2.5">
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 font-semibold text-sm flex-1"
            >
              <FaPhone className="animate-pulse shrink-0" aria-hidden="true" />
              <span>Call us: {PHONE}</span>
            </a>
            <button
              onClick={dismiss}
              className="p-1.5 rounded hover:bg-red-600 transition-colors duration-150"
              aria-label="Dismiss phone bar"
            >
              <FaTimes className="text-sm" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
