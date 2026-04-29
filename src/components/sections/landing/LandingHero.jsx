import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { useLeadForm } from '@/hooks/useLeadForm';
import { useApiData } from '@/hooks/useApiData';
import { Button, Card, Input, Select, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, slideInRight } from '@/lib/motion';
import { CONTACT } from '@/data/homeStaticContent';
import { fallbackCourses } from '@/data/courses';

const PREF_TIMES = [
  { value: 'morning',   label: 'Morning (9 AM – 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM – 4 PM)' },
  { value: 'evening',   label: 'Evening (4 PM – 7 PM)' },
];

export default function LandingHero({ hero, courseSlug, examShortName }) {
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });
  const courseOptions = [
    { value: '', label: 'Select a course' },
    ...(courses || fallbackCourses).map(c => ({ value: c.slug, label: c.title })),
  ];

  const form = useLeadForm({ source: `landing-${courseSlug}` });

  // Pre-fill the course field with the current exam
  useEffect(() => {
    if (examShortName) {
      form.handleChange({ target: { name: 'course', value: examShortName } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examShortName]);

  const renderHeadline = () => {
    if (!hero.headlineAccent || !hero.headline?.includes(hero.headlineAccent)) {
      return hero.headline;
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
    <section className="relative gradient-accent-soft overflow-hidden py-12 md:py-20">
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative container-custom">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-5"
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
              <motion.p variants={staggerItem} className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {hero.subheadline}
              </motion.p>
            )}

            {hero.trustPoints?.length > 0 && (
              <motion.ul variants={staggerContainer} className="space-y-2">
                {hero.trustPoints.map(point => (
                  <motion.li
                    key={point}
                    variants={staggerItem}
                    className="flex items-center gap-2.5 text-gray-700 text-sm"
                  >
                    <FaCheckCircle className="text-red-500 shrink-0" aria-hidden="true" />
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 pt-1">
              <Button href={CONTACT.phoneTel} size="lg" icon={FaPhoneAlt}>
                Call Now
              </Button>
              <Button href={CONTACT.whatsappDemo} variant="accent" size="lg" icon={FaWhatsapp}>
                WhatsApp Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={slideInRight.initial}
            animate={slideInRight.animate}
            transition={{ ...slideInRight.transition, delay: 0.15 }}
          >
            <Card variant="elevated" hover={false} className="p-5 md:p-6">
              {form.isSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <FaCheckCircle className="text-2xl text-green-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">We'll call you soon!</h3>
                  <p className="text-sm text-gray-600">Our team will reach out within 24 hours.</p>
                  <Button href={CONTACT.whatsapp} variant="outline" icon={FaWhatsapp} size="sm">
                    WhatsApp us directly
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit} noValidate className="space-y-3">
                  <div className="mb-1">
                    <h2 className="text-base font-bold text-gray-900">
                      Book Free {examShortName} Counselling
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">We'll call you within 24 hours</p>
                  </div>

                  <Input
                    name="name"
                    label="Name"
                    placeholder="Your full name"
                    value={form.formData.name}
                    onChange={form.handleChange}
                    error={form.errors.name}
                    required
                    autoComplete="name"
                  />
                  <Input
                    name="phone"
                    label="Mobile"
                    placeholder="10-digit number"
                    value={form.formData.phone}
                    onChange={form.handleChange}
                    error={form.errors.phone}
                    required
                    type="tel"
                    autoComplete="tel"
                  />
                  <Select
                    name="preferredTime"
                    label="Preferred Time"
                    value={form.formData.preferredTime}
                    onChange={form.handleChange}
                    options={[{ value: '', label: 'Any time' }, ...PREF_TIMES]}
                    placeholder="Any time"
                  />

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.formData.website}
                    onChange={form.handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {form.submitError && (
                    <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">
                      {form.submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    loading={form.isSubmitting}
                    icon={FaCalendarAlt}
                  >
                    Book Free Demo
                  </Button>
                  <p className="text-xs text-center text-gray-400">No spam. Free demo, no obligation.</p>
                </form>
              )}
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
