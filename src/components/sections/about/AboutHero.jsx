import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { Button, Badge } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function AboutHero({ hero }) {
  const eyebrow = hero?.eyebrow || 'Our Story';
  const title   = hero?.title   || 'Built by Officers, For Aspirants';
  const description = hero?.description ||
    'Samarth Academy was founded in 2006 by two government officers who cleared competitive exams themselves — and decided to teach what actually works.';

  return (
    <section className="relative gradient-primary section-padding overflow-hidden" aria-labelledby="about-hero-heading">
      {/* dot overlay */}
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-10 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          <motion.div variants={staggerItem}>
            <Badge variant="orange" size="sm" className="mb-4">
              {eyebrow}
            </Badge>
          </motion.div>

          <motion.h1
            id="about-hero-heading"
            variants={staggerItem}
            className="heading-display text-4xl md:text-5xl font-bold text-white leading-tight text-balance mb-6"
          >
            {title}
          </motion.h1>

          <motion.p variants={staggerItem} className="text-lg md:text-xl text-red-100 leading-relaxed mb-8 max-w-2xl">
            {description}
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
            <Button to="/book-demo" size="lg" variant="secondary" iconRight={FaArrowRight}>
              Book Free Demo
            </Button>
            <Button href={CONTACT.phoneTel} size="lg" variant="outline" icon={FaPhoneAlt}
              className="border-white text-white hover:bg-white/10">
              {CONTACT.phone}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
