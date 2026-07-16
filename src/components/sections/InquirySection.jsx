import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
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

export default function InquirySection() {
  const form = useInquiry();
  const { data: courses } = useApiData('/courses', { fallback: fallbackCourses });

  const courseOptions = [
    { value: '', label: 'Select a course (optional)' },
    ...(courses || fallbackCourses).map(c => ({ value: c.slug, label: c.title })),
  ];

  const inquiryLabel = form.formData.inquiryType
    ? (LABELS[form.formData.inquiryType] || 'Quick Inquiry')
    : 'Quick Inquiry';

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-t border-b border-gray-100" aria-labelledby="inquiry-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-center">

          {/* Left Side: Copy & Info */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-6 lg:pr-8"
          >
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100">
                <FaQuestionCircle className="text-red-500 shrink-0" aria-hidden="true" />
                Have Queries? Get in Touch
              </span>
            </motion.div>

            <motion.h2
              id="inquiry-heading"
              variants={staggerItem}
              className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight"
            >
              Have Questions? We are here to Help!
            </motion.h2>

            <motion.p variants={staggerItem} className="text-gray-600 leading-relaxed text-lg">
              Whether you want to learn about the batch timings, query about the fee structure, check scholarship options, or book a specific demo class — submit your query here and we will get back to you within 2 hours.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3 pt-2">
              {[
                'Instant WhatsApp support from course advisors',
                'Detailed fee structure and discounts sheet',
                'Custom batch timing slots for college students & working professionals',
                'One-on-one strategy call with Ex-Officer faculty members',
              ].map(point => (
                <motion.li
                  key={point}
                  variants={staggerItem}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <FaCheckCircle className="text-green-500 shrink-0 text-lg" aria-hidden="true" />
                  <span className="text-sm font-medium">{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <a
                href={CONTACT.phoneTel}
                className="inline-flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                <FaPhoneAlt className="text-red-500" aria-hidden="true" />
                Call: {CONTACT.phone}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                <FaWhatsapp aria-hidden="true" />
                WhatsApp Chat
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Inquiry Card Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={viewportConfig}
          >
            <Card hover={false} className="p-6 md:p-8 bg-white border border-gray-150 shadow-lg rounded-2xl">
              {form.isSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <FaCheckCircle className="text-3xl text-green-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Query Received!</h3>
                  <p className="text-sm text-gray-600">
                    Thank you. We have saved your inquiry and our academic counselor will contact you shortly.
                  </p>
                  <Button variant="ghost" size="sm" onClick={form.reset}>Submit another inquiry</Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{inquiryLabel}</h3>
                    <p className="text-xs text-gray-500 mt-1">Please fill the form below and we'll reply soon.</p>
                  </div>

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
                      label="Mobile Number"
                      placeholder="10-digit mobile"
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
                    label="Email Address (optional)"
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
                    options={[{ value: '', label: 'Select Inquiry Type' }, ...INQUIRY_TYPES]}
                    error={form.errors.inquiryType}
                    required
                  />

                  <Select
                    name="course"
                    label="Course of Interest (optional)"
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
                    label="How can we help you? (optional)"
                    placeholder="Enter your message or questions..."
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

                  <Button type="submit" size="lg" className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-bold" loading={form.isSubmitting}>
                    Submit Inquiry
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
