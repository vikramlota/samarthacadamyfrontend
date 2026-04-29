import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { useInquiry } from '@/hooks/useInquiry';
import { useApiData } from '@/hooks/useApiData';
import { Button, Card, Input, Select, TextArea } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { fallbackCourses } from '@/data/courses';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

const INQUIRY_TYPES = [
  { value: 'demo',       label: 'Book a Free Demo Class' },
  { value: 'admission',  label: 'Course Admission Enquiry' },
  { value: 'fee',        label: 'Fee & Scholarship Query' },
  { value: 'general',    label: 'General Question' },
];

const LABELS = {
  demo:      'Book a Free Demo Class',
  admission: 'Course Admission Enquiry',
  fee:       'Fee & Scholarship Query',
  general:   'General Question',
};

export default function ContactForm() {
  const form = useInquiry();
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });

  const courseOptions = [
    { value: '', label: 'Select a course (optional)' },
    ...(courses || fallbackCourses).map(c => ({ value: c.slug, label: c.title })),
  ];

  const inquiryLabel = form.formData.inquiryType
    ? (LABELS[form.formData.inquiryType] || 'Contact Us')
    : 'Contact Us';

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="contact-form-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-start">

          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-6 lg:pt-4"
          >
            <motion.h2
              id="contact-form-heading"
              variants={staggerItem}
              className="heading-display text-3xl font-bold text-gray-900"
            >
              Send Us a Message
            </motion.h2>
            <motion.p variants={staggerItem} className="text-gray-600 leading-relaxed">
              Tell us what you need — a demo, fee details, or just a question. We'll reply within a few hours.
            </motion.p>

            <motion.div variants={staggerItem} className="space-y-3 text-sm text-gray-600">
              {INQUIRY_TYPES.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => form.handleChange({ target: { name: 'inquiryType', value: t.value } })}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-colors duration-150 ${
                    form.formData.inquiryType === t.value
                      ? 'bg-red-50 border-red-200 text-red-700 font-medium'
                      : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={viewportConfig}
          >
            <Card hover={false} className="p-6 md:p-8">
              {form.isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <FaCheckCircle className="text-3xl text-green-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Message received!</h3>
                  <p className="text-sm text-gray-600">We'll get back to you within a few hours during working hours.</p>
                  <Button href={CONTACT.whatsapp} variant="outline" icon={FaWhatsapp} size="sm">
                    Follow up on WhatsApp
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">{inquiryLabel}</h3>

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
                    name="inquiryType"
                    label="Type of Inquiry"
                    value={form.formData.inquiryType}
                    onChange={form.handleChange}
                    options={[{ value: '', label: 'Select type' }, ...INQUIRY_TYPES]}
                    error={form.errors.inquiryType}
                  />

                  <Select
                    name="course"
                    label="Course (optional)"
                    value={form.formData.course}
                    onChange={form.handleChange}
                    options={courseOptions}
                  />

                  {form.formData.inquiryType === 'demo' && (
                    <Input
                      name="preferredDate"
                      label="Preferred Demo Date (optional)"
                      value={form.formData.preferredDate}
                      onChange={form.handleChange}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  )}

                  <TextArea
                    name="message"
                    label="Message (optional)"
                    placeholder="Tell us about your exam goal, current preparation level, or any questions..."
                    value={form.formData.message}
                    onChange={form.handleChange}
                    rows={3}
                  />

                  {/* honeypot */}
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
                    Send Message
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
