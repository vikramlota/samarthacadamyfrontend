import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaPhoneAlt } from 'react-icons/fa';
import { useLeadForm } from '@/hooks/useLeadForm';
import { useApiData } from '@/hooks/useApiData';
import { Button, Card, Input, Select } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { CONTACT } from '@/data/homeStaticContent';
import { fallbackCourses } from '@/data/courses';

const PREF_TIMES = [
  { value: 'morning',   label: 'Morning (9 AM – 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM – 4 PM)' },
  { value: 'evening',   label: 'Evening (4 PM – 7 PM)' },
];

export default function MidPageLeadForm() {
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });
  const courseOptions = [
    { value: '', label: 'Select a course' },
    ...(courses || fallbackCourses).map(c => ({ value: c.slug, label: c.title })),
  ];

  const { formData, errors, isSubmitting, isSuccess, submitError, handleChange, handleSubmit, reset } =
    useLeadForm({ source: 'home-midpage' });

  return (
    <section
      className="gradient-primary py-16 md:py-24"
      aria-labelledby="lead-form-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-6 text-white"
          >
            <motion.h2
              variants={staggerItem}
              id="lead-form-heading"
              className="text-3xl sm:text-4xl font-bold leading-tight"
            >
              Ready to Start Your<br />Government Exam Journey?
            </motion.h2>

            <motion.p variants={staggerItem} className="text-red-100 leading-relaxed text-lg">
              Fill this form and we'll schedule a free demo class at a time that works for you.
              No pressure, no commitment.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3">
              {[
                'Free demo — no obligation',
                'Personal counselling on exam strategy',
                'Meet the faculty before you enrol',
                'Know the batch schedule & fee structure',
              ].map(point => (
                <motion.li
                  key={point}
                  variants={staggerItem}
                  className="flex items-center gap-3 text-white/90"
                >
                  <FaCheckCircle className="text-red-200 shrink-0" aria-hidden="true" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 pt-2">
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <FaPhoneAlt aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <span className="text-white/40">·</span>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                <FaWhatsapp aria-hidden="true" />
                WhatsApp us
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={viewportConfig}
          >
            <Card hover={false} className="p-6 md:p-8">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <FaCheckCircle className="text-3xl text-green-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Request received!</h3>
                  <p className="text-gray-600 text-sm">
                    We'll call you to confirm your demo class. See you soon!
                  </p>
                  <Button variant="ghost" size="sm" onClick={reset}>Submit another enquiry</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Book Your Free Demo</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      label="Full Name"
                      placeholder="Your name"
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
                  </div>

                  <Input
                    name="email"
                    label="Email (optional)"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    autoComplete="email"
                  />

                  <Select
                    name="course"
                    label="Course Interest"
                    value={formData.course}
                    onChange={handleChange}
                    options={courseOptions}
                    placeholder="Select a course"
                  />

                  <Select
                    name="preferredTime"
                    label="Preferred Call Time"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    options={[{ value: '', label: 'Any time' }, ...PREF_TIMES]}
                    placeholder="Any time"
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

                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">
                      {submitError}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                    Request Free Demo Class
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
