import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { useLeadForm } from '@/hooks/useLeadForm';
import { useApiData } from '@/hooks/useApiData';
import { Button, Card, Input, Select } from '@/components/ui';
import { staggerContainer, staggerItem, slideInRight } from '@/lib/motion';
import { HERO_CONTENT, CONTACT } from '@/data/homeStaticContent';
import { fallbackCourses } from '@/data/courses';

export default function HeroSection() {
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });
  const courseOptions = [
    { value: '', label: 'Select a course (optional)' },
    ...(courses || fallbackCourses).map(c => ({ value: c.slug, label: c.title })),
  ];

  const { formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit } =
    useLeadForm({ source: 'home-hero' });

  return (
    <section className="relative bg-brand-bg overflow-hidden py-16 md:py-24">
      <div
        className="absolute inset-0 bg-dot-pattern-dark opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full border border-red-100">
                <FaCheckCircle className="text-red-500 shrink-0" aria-hidden="true" />
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-gray-900 leading-tight"
            >
              {HERO_CONTENT.headline[0]}{' '}
              <span className="text-red-500">{HERO_CONTENT.headline[1]}</span>
            </motion.h1>

            <motion.p variants={staggerItem} className="text-lg text-gray-600 leading-relaxed max-w-lg">
              {HERO_CONTENT.subheadline}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Button to="/book-demo" size="lg" icon={FaCalendarAlt}>
                Book a Free Demo
              </Button>
              <Button href={CONTACT.whatsappDemo} variant="outline" size="lg" icon={FaWhatsapp}>
                Chat on WhatsApp
              </Button>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-8 pt-2 border-t border-gray-200">
              {HERO_CONTENT.miniStats.map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Lead form */}
          <motion.div
            initial={slideInRight.initial}
            animate={slideInRight.animate}
            transition={{ ...slideInRight.transition, delay: 0.2 }}
          >
            <Card variant="elevated" hover={false} className="p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <FaCheckCircle className="text-3xl text-green-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">We'll call you soon!</h3>
                  <p className="text-gray-600 text-sm">
                    Thank you. Our team will reach out within a few hours to confirm your demo slot.
                  </p>
                  <Button href={CONTACT.whatsapp} variant="outline" icon={FaWhatsapp} size="sm">
                    Or WhatsApp us directly
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Get a Free Demo Class</h2>
                    <p className="text-sm text-gray-500 mt-1">We'll call you to confirm the slot</p>
                  </div>

                  <Input
                    name="name"
                    label="Your Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    autoComplete="name"
                  />
                  <Input
                    name="phone"
                    label="Mobile Number"
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                    type="tel"
                    autoComplete="tel"
                  />
                  <Select
                    name="course"
                    label="Course Interest"
                    value={formData.course}
                    onChange={handleChange}
                    options={courseOptions}
                    placeholder="Select a course (optional)"
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

                  <Button type="submit" size="lg" className="w-full mt-2" loading={isSubmitting}>
                    Book Free Demo Class
                  </Button>
                  <p className="text-xs text-center text-gray-400">
                    No spam. We call only to confirm your slot.
                  </p>
                </form>
              )}
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
