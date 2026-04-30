import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function CoursesCta() {
  return (
    <section className="relative gradient-primary section-padding" aria-labelledby="courses-cta-heading">
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="max-w-2xl mx-auto space-y-6"
        >
          <motion.h2
            id="courses-cta-heading"
            variants={staggerItem}
            className="heading-display text-3xl md:text-4xl font-bold text-white text-balance"
          >
            Not Sure Which Course Is Right for You?
          </motion.h2>

          <motion.p variants={staggerItem} className="text-red-100 text-lg leading-relaxed">
            Book a free counselling session. We'll understand your exam target, current preparation level, and recommend the right course — no pressure, no commitment.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-4">
            <Button to="/book-demo" size="lg" variant="secondary" iconRight={FaArrowRight}>
              Book Free Counselling
            </Button>
            <Button
              href={CONTACT.whatsapp}
              size="lg"
              icon={FaWhatsapp}
              className="bg-green-500 hover:bg-green-600 text-white border-transparent"
            >
              WhatsApp Us
            </Button>
            <Button
              href={CONTACT.phoneTel}
              size="lg"
              variant="outline"
              icon={FaPhoneAlt}
              className="border-white text-white hover:bg-white/10"
            >
              {CONTACT.phone}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
