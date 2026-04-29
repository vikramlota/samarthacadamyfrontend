import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function LandingFinalCta({ finalCta, courseSlug }) {
  const eyebrow  = finalCta?.eyebrow  || 'Take the First Step';
  const title    = finalCta?.title    || 'Your Selection Starts With One Call';
  const subtitle = finalCta?.subtitle || 'Book a free demo class and meet the faculty before you decide.';

  return (
    <section className="bg-gray-900 section-padding" aria-labelledby="finalcta-heading">
      <div className="container-custom text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <motion.p variants={staggerItem} className="text-red-400 text-sm font-semibold uppercase tracking-widest">
            {eyebrow}
          </motion.p>

          <motion.h2
            variants={staggerItem}
            id="finalcta-heading"
            className="heading-display text-3xl sm:text-4xl font-bold text-white leading-tight text-balance"
          >
            {title}
          </motion.h2>

          <motion.p variants={staggerItem} className="text-gray-400 leading-relaxed text-lg">
            {subtitle}
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-3 pt-2">
            <Button to="/book-demo" size="xl" icon={FaCalendarAlt}>
              Book Free Demo
            </Button>
            <Button
              href={CONTACT.phoneTel}
              variant="outline"
              size="xl"
              icon={FaPhoneAlt}
              className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:border-gray-500"
            >
              {CONTACT.phone}
            </Button>
            <Button
              href={CONTACT.whatsappDemo}
              variant="outline"
              size="xl"
              icon={FaWhatsapp}
              className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:border-gray-500"
            >
              WhatsApp Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
