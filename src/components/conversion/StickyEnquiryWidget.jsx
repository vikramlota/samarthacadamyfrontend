import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPhone, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { Button, Input, Card } from '@/components/ui';
import { useLeadForm } from '@/hooks/useLeadForm';
import { cn } from '@/lib/utils';

export default function StickyEnquiryWidget({ courseSlug, examShortName }) {
  const [isVisible,  setIsVisible]  = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);

  const { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit } =
    useLeadForm({ source: `sticky-widget-${courseSlug}` });

  // Detect viewport size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Show after 800px scroll (past hero)
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 800) setIsVisible(true); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  const sharedForm = (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <Input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        autoComplete="name"
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Mobile Number"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
        autoComplete="tel"
      />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <Button type="submit" variant="primary" className="w-full" loading={isSubmitting}>
        Get Free Callback
      </Button>
      {examShortName && (
        <p className="text-xs text-gray-400 text-center">Course: {examShortName}</p>
      )}
    </form>
  );

  const successState = (
    <div className="text-center py-4 space-y-2">
      <FaCheckCircle className="text-3xl text-green-500 mx-auto" aria-hidden="true" />
      <p className="font-semibold text-gray-900">Request received!</p>
      <p className="text-sm text-gray-600">We'll call you shortly.</p>
    </div>
  );

  // ── Desktop: side tab + slide-out panel ──────────────────────────────
  if (!isMobile) {
    return (
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              key="tab"
              onClick={() => setIsExpanded(true)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-red-500 text-white px-3 py-6 rounded-l-card shadow-card flex flex-col items-center gap-2 hover:bg-red-600 transition-colors duration-150"
              aria-label="Open enquiry form"
            >
              <FaPhone className="text-lg" aria-hidden="true" />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ writingMode: 'vertical-lr' }}
              >
                ENQUIRE NOW
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="w-80"
            >
              <Card variant="elevated" hover={false} className="rounded-r-none border-r-0 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Quick Enquiry</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Get a free callback</p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                    aria-label="Close enquiry form"
                  >
                    <FaTimes className="text-gray-400 text-sm" aria-hidden="true" />
                  </button>
                </div>
                {isSuccess ? successState : sharedForm}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Mobile: bottom bar + bottom sheet ────────────────────────────────
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white z-30 shadow-lifted lg:hidden">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center gap-2 font-semibold py-3.5 text-sm"
        >
          <FaPhone aria-hidden="true" />
          Get Free Callback{examShortName ? ` — ${examShortName}` : ''}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 350 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[1.5rem] p-6 z-50 lg:hidden shadow-lifted"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Quick Enquiry</h3>
                  <p className="text-sm text-gray-500 mt-0.5">We'll call you within a few hours</p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                  aria-label="Close"
                >
                  <FaTimes className="text-gray-400" aria-hidden="true" />
                </button>
              </div>
              {isSuccess ? successState : sharedForm}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
