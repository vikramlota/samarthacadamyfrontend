import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { useLeadForm } from '@/hooks/useLeadForm';
import { useApiData } from '@/hooks/useApiData';
import { Button, Card, Input, Select, TextArea } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { CONTACT } from '@/data/homeStaticContent';
import { fallbackCourses } from '@/data/courses';

const PREF_TIMES = [
  { value: 'morning',   label: 'Morning (9 AM – 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM – 4 PM)' },
  { value: 'evening',   label: 'Evening (4 PM – 7 PM)' },
];

export default function LandingMidCta({ midCta, courseSlug }) {
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });
  const courseOptions = [
    { value: '', label: 'Select a course' },
    ...(courses || fallbackCourses).map(c => ({ value: c.slug, label: c.title })),
  ];

  const form = useLeadForm({ source: `landing-${courseSlug}-midcta` });

  useEffect(() => {
    if (courseSlug) {
      form.handleChange({ target: { name: 'course', value: courseSlug } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug]);

  if (!midCta) return null;

  return (
    <section className="relative gradient-primary section-padding" aria-labelledby="midcta-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: White copy on red */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-5 text-white"
          >
            {midCta.eyebrow && (
              <motion.p variants={staggerItem} className="text-orange-200 text-sm font-semibold uppercase tracking-wider">
                {midCta.eyebrow}
              </motion.p>
            )}

            <motion.h2
              variants={staggerItem}
              id="midcta-heading"
              className="heading-display text-3xl md:text-4xl font-bold leading-tight text-balance"
            >
              {midCta.title}
            </motion.h2>

            {midCta.description && (
              <motion.p variants={staggerItem} className="text-lg text-red-100 leading-relaxed max-w-md">
                {midCta.description}
              </motion.p>
            )}

            {midCta.trustPoints?.length > 0 && (
              <motion.ul variants={staggerContainer} className="space-y-2.5">
                {midCta.trustPoints.map(point => (
                  <motion.li key={point} variants={staggerItem} className="flex items-center gap-3 text-white/90">
                    <FaCheckCircle className="text-red-200 shrink-0" aria-hidden="true" />
                    {point}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.p variants={staggerItem} className="text-red-200 text-sm">
              Or call directly:{' '}
              <a href={CONTACT.phoneTel} className="underline font-bold text-white hover:text-orange-200 transition-colors duration-150">
                {CONTACT.phone}
              </a>
            </motion.p>
          </motion.div>

          {/* Right: Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={viewportConfig}
          >
            <Card hover={false} className="p-6 md:p-8">
              {form.isSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <FaCheckCircle className="text-2xl text-green-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Request received!</h3>
                  <p className="text-sm text-gray-600">We'll call you to confirm your demo slot.</p>
                  <Button
                    href={CONTACT.whatsapp}
                    variant="outline"
                    icon={FaWhatsapp}
                    size="sm"
                  >
                    WhatsApp us
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Book Your Free Demo</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      label="Full Name"
                      placeholder="Your name"
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
                  </div>

                  <Input
                    name="email"
                    label="Email (optional)"
                    placeholder="you@example.com"
                    value={form.formData.email}
                    onChange={form.handleChange}
                    type="email"
                    autoComplete="email"
                  />

                  <Select
                    name="course"
                    label="Course Interest"
                    value={form.formData.course}
                    onChange={form.handleChange}
                    options={courseOptions}
                    placeholder="Select a course"
                  />

                  <Select
                    name="preferredTime"
                    label="Preferred Call Time"
                    value={form.formData.preferredTime}
                    onChange={form.handleChange}
                    options={[{ value: '', label: 'Any time' }, ...PREF_TIMES]}
                    placeholder="Any time"
                  />

                  <TextArea
                    name="message"
                    label="Message (optional)"
                    placeholder="Tell us your current preparation level or any specific questions..."
                    value={form.formData.message}
                    onChange={form.handleChange}
                    rows={3}
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
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">
                      {form.submitError}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" loading={form.isSubmitting}>
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
