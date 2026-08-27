import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { Button, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, slideInRight } from '@/lib/motion';
import { CONTACT } from '@/data/homeStaticContent';

export default function LandingHero({ hero = {}, courseSlug, examShortName, courseThumbnail }) {
  const renderHeadline = () => {
    if (!hero.headlineAccent || !hero.headline?.includes(hero.headlineAccent)) {
      return hero.headline || '';
    }
    const [before, after] = hero.headline.split(hero.headlineAccent);
    return (
      <>
        {before}
        <span className="text-red-500">{hero.headlineAccent}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative gradient-accent-soft overflow-hidden py-10 md:py-16">
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative container-custom">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Copy & Action Buttons */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-7 space-y-5"
          >
            {hero.badge && (
              <motion.div variants={staggerItem}>
                <Badge variant="red" icon={FaShieldAlt}>{hero.badge}</Badge>
              </motion.div>
            )}

            <motion.h1
              variants={staggerItem}
              className="heading-display text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] text-balance"
            >
              {renderHeadline()}
            </motion.h1>

            {hero.subheadline && (
              <motion.p variants={staggerItem} className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl">
                {hero.subheadline}
              </motion.p>
            )}

            {hero.trustPoints?.length > 0 && (
              <motion.ul variants={staggerContainer} className="space-y-2.5 pt-1">
                {hero.trustPoints.map(point => (
                  <motion.li
                    key={point}
                    variants={staggerItem}
                    className="flex items-center gap-2.5 text-gray-700 text-sm font-medium"
                  >
                    <FaCheckCircle className="text-red-500 shrink-0 text-base" aria-hidden="true" />
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Action Buttons Row */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 pt-3">
              <Button to="/inquiries" size="md" icon={FaCalendarAlt} className="shadow-md">
                Book Free Demo
              </Button>
              <Button href={CONTACT.phoneTel} variant="secondary" size="md" icon={FaPhoneAlt}>
                Call Now
              </Button>
              <Button href={CONTACT.whatsappDemo} variant="accent" size="md" icon={FaWhatsapp}>
                WhatsApp Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Large Course Thumbnail Image */}
          <motion.div
            initial={slideInRight.initial}
            animate={slideInRight.animate}
            transition={{ ...slideInRight.transition, delay: 0.15 }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group hover:shadow-red-500/10 transition-all duration-300">
              <img
                src={courseThumbnail || 'https://thesamarthacademy.in/images/purelogo.png'}
                alt={`${examShortName || 'Course'} coaching at Samarth Academy`}
                className="w-full h-auto max-h-[520px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
