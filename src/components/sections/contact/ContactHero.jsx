import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';

export default function ContactHero() {
  return (
    <section className="relative gradient-primary section-padding" aria-labelledby="contact-hero-heading">
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-2xl"
        >
          <motion.p variants={staggerItem} className="text-orange-200 text-sm font-semibold uppercase tracking-wider mb-3">
            Get in Touch
          </motion.p>
          <motion.h1
            id="contact-hero-heading"
            variants={staggerItem}
            className="heading-display text-4xl md:text-5xl font-bold text-white leading-tight text-balance mb-5"
          >
            Talk to Us — We Respond Fast
          </motion.h1>
          <motion.p variants={staggerItem} className="text-lg text-red-100 leading-relaxed">
            Call, WhatsApp, or fill the form. We respond to every inquiry within a few hours during working hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
