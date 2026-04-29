import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function AboutCta({ cta }) {
  const title       = cta?.title       || 'Ready to Start Your Government Exam Journey?';
  const description = cta?.description || 'Book a free demo class. No commitment. Just one session to see if Samarth Academy is the right fit for you.';

  return (
    <section className="relative gradient-primary section-padding" aria-labelledby="about-cta-heading">
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
            id="about-cta-heading"
            variants={staggerItem}
            className="heading-display text-3xl md:text-4xl font-bold text-white text-balance"
          >
            {title}
          </motion.h2>

          <motion.p variants={staggerItem} className="text-red-100 text-lg leading-relaxed">
            {description}
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-4">
            <Button to="/book-demo" size="lg" variant="secondary" iconRight={FaArrowRight}>
              Book Free Demo
            </Button>
            <Button href={CONTACT.whatsapp} size="lg" icon={FaWhatsapp}
              className="bg-green-500 hover:bg-green-600 text-white border-transparent">
              WhatsApp Us
            </Button>
            <Button href={CONTACT.phoneTel} size="lg" variant="outline" icon={FaPhoneAlt}
              className="border-white text-white hover:bg-white/10">
              Call Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
