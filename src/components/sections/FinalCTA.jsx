import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

export default function FinalCTA() {
  return (
    <section className="bg-gray-900 py-16 md:py-24" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: CTA copy */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="space-y-6"
          >
            <motion.p variants={staggerItem} className="text-red-400 text-sm font-semibold uppercase tracking-widest">
              Take the First Step
            </motion.p>

            <motion.h2
              variants={staggerItem}
              id="cta-heading"
              className="text-3xl sm:text-4xl font-bold text-white leading-tight"
            >
              Your Government Job<br />
              <span className="text-red-400">Starts With One Call</span>
            </motion.h2>

            <motion.p variants={staggerItem} className="text-gray-400 leading-relaxed">
              Visit us in Amritsar or call to book a free demo class. Meet the faculty,
              see the batch, and decide with full information — no pressure.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Button to="/book-demo" size="lg" icon={FaCalendarAlt}>
                Book Free Demo
              </Button>
              <Button
                href={CONTACT.whatsappDemo}
                variant="outline"
                size="lg"
                icon={FaWhatsapp}
                className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:border-gray-500"
              >
                WhatsApp Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={viewportConfig}
            className="bg-gray-800 rounded-card p-6 md:p-8 space-y-5"
          >
            <h3 className="text-lg font-semibold text-white">Contact & Location</h3>

            <div className="space-y-4">
              <a
                href={CONTACT.phoneTel}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors duration-150">
                  <FaPhoneAlt className="text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-white font-medium group-hover:text-red-400 transition-colors duration-150">
                    {CONTACT.phone}
                  </p>
                </div>
              </a>

              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors duration-150">
                  <FaWhatsapp className="text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="text-white font-medium group-hover:text-green-400 transition-colors duration-150">
                    +91 90419 73105
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-gray-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-white font-medium">{CONTACT.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center shrink-0">
                  <FaClock className="text-gray-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hours</p>
                  <p className="text-white font-medium">{CONTACT.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
