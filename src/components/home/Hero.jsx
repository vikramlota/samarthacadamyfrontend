import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Button, Input, Select } from '../ui';
import { useLeadSubmit } from '../../utils/customHooks';
import { staggerContainer, staggerItem } from '../../lib/motion';

const COURSE_OPTIONS = [
  { value: 'ssc-cgl',     label: 'SSC CGL' },
  { value: 'ssc-chsl',    label: 'SSC CHSL / MTS' },
  { value: 'ibps-po',     label: 'IBPS PO' },
  { value: 'sbi-po',      label: 'SBI PO' },
  { value: 'ibps-clerk',  label: 'IBPS Clerk' },
  { value: 'punjab-police', label: 'Punjab Police' },
  { value: 'ugc-net',     label: 'UGC NET' },
  { value: 'other',       label: 'Other / Not Sure' },
];

const TRUST = [
  '20+ Years of Excellence',
  '1,200+ Govt. Selections',
  'Small Batches Only',
];

export default function Hero() {
  const [form, setForm] = useState({ name: '', phone: '', course: '' });
  const { submit, submitting, submitted, submitError } = useLeadSubmit();

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    submit({ ...form, source: 'home-hero' });
  };

  return (
    <section className="relative overflow-hidden bg-brand-bg">
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern-dark opacity-30 pointer-events-none" aria-hidden="true" />
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-gradient-to-br from-red-100 to-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-red-50 rounded-full blur-2xl opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow badge */}
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-soft" aria-hidden="true" />
                Amritsar's Most Trusted Coaching · Since 2006
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={staggerItem}
              className="heading-display text-4xl md:text-5xl xl:text-6xl font-black text-gray-900 leading-[1.1] text-pretty"
            >
              Turn Your Govt. Job{' '}
              <br className="hidden md:block" />
              Dream Into{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-red-500">Reality</span>
                <span className="absolute bottom-0.5 left-0 w-full h-3 bg-orange-200/70 -z-10 rounded-full" aria-hidden="true" />
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={staggerItem} className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Expert coaching for SSC, Banking, Punjab Police &amp; more. Personal attention, small batches, and a proven track record since 2006.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Button to="/book-demo" size="lg">
                Book Free Demo Class
              </Button>
              <Button to="/courses" variant="outline" size="lg" iconRight={FaArrowRight}>
                Browse Courses
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.ul variants={staggerItem} className="flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map(item => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
                  <FaCheckCircle className="text-green-500 text-xs shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── Right: Lead Capture Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="bg-white rounded-card shadow-lifted p-8 border border-red-50">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <FaCheckCircle className="text-3xl text-green-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">We'll Call You Back!</h2>
                    <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                      Our counsellor will reach out within 2 hours. Meanwhile, explore our courses.
                    </p>
                  </div>
                  <Button to="/courses" variant="outline" size="sm">
                    Browse Courses
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Get Free Counselling</h2>
                    <p className="text-sm text-gray-500 mt-1">Talk to an expert · No obligations</p>
                  </div>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Input
                      label="Your Name"
                      name="name"
                      placeholder="e.g. Priya Singh"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={onChange}
                      required
                    />
                    <Select
                      label="Course Interest"
                      name="course"
                      placeholder="Select a course"
                      options={COURSE_OPTIONS}
                      value={form.course}
                      onChange={onChange}
                    />

                    {submitError && (
                      <p className="text-sm text-red-600" role="alert">{submitError}</p>
                    )}

                    <Button type="submit" loading={submitting} className="w-full mt-1">
                      Get Free Callback
                    </Button>

                    <p className="text-center text-xs text-gray-400">
                      No spam · We reply within 2 hours
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
