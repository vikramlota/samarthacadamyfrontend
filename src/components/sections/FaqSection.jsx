import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { SectionHeader, Button } from '@/components/ui';
import { FAQS, CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { cn } from '@/lib/utils';

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150"
      >
        <span className="text-sm font-semibold text-gray-900">{faq.question}</span>
        <FaChevronDown
          className={cn(
            'text-gray-400 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-5 bg-white border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Common Questions"
          description="Everything you need to know before you call us."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="space-y-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div key={faq.question} variants={staggerItem}>
              <FaqItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Still have questions?{' '}
          <a
            href={CONTACT.phoneTel}
            className="text-red-500 font-medium hover:underline"
          >
            Call us directly
          </a>
          {' '}or{' '}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 font-medium hover:underline"
          >
            WhatsApp us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
