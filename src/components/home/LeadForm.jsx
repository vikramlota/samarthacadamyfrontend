import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhoneAlt, FaUserGraduate, FaStar } from 'react-icons/fa';
import { Button, Input, Select, TextArea } from '../ui';
import { useLeadSubmit } from '../../utils/customHooks';
import { staggerContainer, staggerItem, viewportConfig } from '../../lib/motion';

const COURSE_OPTIONS = [
  { value: 'ssc-cgl',      label: 'SSC CGL' },
  { value: 'ssc-chsl',     label: 'SSC CHSL / MTS' },
  { value: 'ibps-po',      label: 'IBPS PO' },
  { value: 'sbi-po',       label: 'SBI PO' },
  { value: 'ibps-clerk',   label: 'IBPS Clerk' },
  { value: 'punjab-police',label: 'Punjab Police' },
  { value: 'ugc-net',      label: 'UGC NET' },
  { value: 'other',        label: 'Other / Not Sure' },
];

const TIME_OPTIONS = [
  { value: 'morning',   label: 'Morning (9 AM – 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM – 4 PM)' },
  { value: 'evening',   label: 'Evening (4 PM – 7 PM)' },
];

const BENEFITS = [
  { icon: FaPhoneAlt,     text: 'Free 15-minute counselling call' },
  { icon: FaUserGraduate, text: 'Attend a free demo class first' },
  { icon: FaStar,         text: 'No commitment, no pressure' },
];

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', course: '', preferredTime: '', message: '' });
  const { submit, submitting, submitted, submitError } = useLeadSubmit();

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    submit({ ...form, source: 'home-midpage' });
  };

  return (
    <section className="section-padding bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: CTA copy ── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="flex flex-col gap-6 lg:pt-4"
          >
            <motion.p variants={staggerItem} className="text-orange-400 text-xs font-bold uppercase tracking-widest">
              Free Demo Available
            </motion.p>

            <motion.h2
              variants={staggerItem}
              className="heading-display text-3xl md:text-4xl font-black text-white leading-tight"
            >
              Book Your Free Demo Class — No Commitment Required
            </motion.h2>

            <motion.p variants={staggerItem} className="text-gray-400 leading-relaxed">
              Experience our teaching style, meet the faculty, and see the infrastructure before you decide. We believe the result speaks for itself.
            </motion.p>

            <motion.ul variants={staggerItem} className="flex flex-col gap-3">
              {BENEFITS.map(b => (
                <li key={b.text} className="flex items-center gap-3 text-gray-300">
                  <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                    <b.icon className="text-red-400 text-xs" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{b.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={staggerItem}>
              <a
                href="tel:+919988949969"
                className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors text-sm"
              >
                <FaPhoneAlt className="text-xs" aria-hidden="true" />
                Or call us: +91 99889 49969
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            viewport={viewportConfig}
          >
            <div className="bg-white rounded-card p-8 shadow-lifted">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <FaCheckCircle className="text-3xl text-green-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Request Received!</h3>
                    <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                      Our team will call you within 2 hours to schedule your free demo class.
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    Questions? Call us at{' '}
                    <a href="tel:+919988949969" className="text-red-500 font-semibold">+91 99889 49969</a>
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Register for Free Demo</h3>
                    <p className="text-sm text-gray-500 mt-1">We'll get back to you within 2 hours</p>
                  </div>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Full Name" name="name" placeholder="Your name" value={form.name} onChange={onChange} required />
                      <Input label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={onChange} required />
                    </div>
                    <Select
                      label="Course Interest"
                      name="course"
                      placeholder="Which exam are you preparing for?"
                      options={COURSE_OPTIONS}
                      value={form.course}
                      onChange={onChange}
                    />
                    <Select
                      label="Preferred Demo Time"
                      name="preferredTime"
                      placeholder="When works best for you?"
                      options={TIME_OPTIONS}
                      value={form.preferredTime}
                      onChange={onChange}
                    />
                    <TextArea
                      label="Message (optional)"
                      name="message"
                      placeholder="Any specific questions or requirements?"
                      value={form.message}
                      onChange={onChange}
                      rows={3}
                    />

                    {submitError && (
                      <p className="text-sm text-red-600" role="alert">{submitError}</p>
                    )}

                    <Button type="submit" loading={submitting} size="lg" className="w-full mt-1">
                      Book Free Demo Class
                    </Button>

                    <p className="text-center text-xs text-gray-400">
                      By submitting, you agree to be contacted by our team.
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
