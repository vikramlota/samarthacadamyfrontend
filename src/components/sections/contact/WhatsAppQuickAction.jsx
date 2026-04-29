import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { scaleIn, viewportConfig } from '@/lib/motion';

const QUICK_MESSAGES = [
  { label: 'Book a demo class',        href: 'https://wa.me/919041973105?text=Hi%2C%20I%20want%20to%20book%20a%20free%20demo%20class' },
  { label: 'Ask about IBPS coaching',  href: 'https://wa.me/919041973105?text=Hi%2C%20I%20want%20to%20know%20about%20IBPS%20coaching' },
  { label: 'Ask about SSC coaching',   href: 'https://wa.me/919041973105?text=Hi%2C%20I%20want%20to%20know%20about%20SSC%20coaching' },
  { label: 'Ask about fee structure',  href: 'https://wa.me/919041973105?text=Hi%2C%20I%20want%20to%20know%20the%20fee%20structure' },
];

export default function WhatsAppQuickAction() {
  return (
    <section className="py-16 md:py-24 bg-green-50" aria-labelledby="whatsapp-heading">
      <div className="container-custom">
        <motion.div
          initial={scaleIn.initial}
          whileInView={scaleIn.animate}
          transition={scaleIn.transition}
          viewport={viewportConfig}
          className="bg-white rounded-2xl shadow-card p-8 md:p-12 max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <FaWhatsapp className="text-3xl text-green-500" aria-hidden="true" />
          </div>

          <h2 id="whatsapp-heading" className="text-2xl font-bold text-gray-900 mb-3">
            Prefer WhatsApp? Just Tap & Ask.
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We respond to WhatsApp messages quickly during working hours. Pick a topic to start a conversation:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {QUICK_MESSAGES.map(msg => (
              <a
                key={msg.label}
                href={msg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors duration-150"
              >
                <FaWhatsapp aria-hidden="true" />
                {msg.label}
              </a>
            ))}
          </div>

          <Button
            href={CONTACT.whatsapp}
            icon={FaWhatsapp}
            className="bg-green-500 hover:bg-green-600 text-white border-transparent"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp Chat
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
