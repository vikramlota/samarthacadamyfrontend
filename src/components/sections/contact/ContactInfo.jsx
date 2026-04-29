import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

const INFO_ITEMS = [
  {
    icon:  FaPhoneAlt,
    label: 'Phone',
    value: CONTACT.phone,
    href:  CONTACT.phoneTel,
    color: 'red',
  },
  {
    icon:  FaWhatsapp,
    label: 'WhatsApp',
    value: 'Chat with us',
    href:  CONTACT.whatsapp,
    color: 'green',
  },
  {
    icon:  FaEnvelope,
    label: 'Email',
    value: CONTACT.email,
    href:  `mailto:${CONTACT.email}`,
    color: 'orange',
  },
  {
    icon:  FaMapMarkerAlt,
    label: 'Address',
    value: CONTACT.address,
    href:  null,
    color: 'red',
  },
  {
    icon:  FaClock,
    label: 'Working Hours',
    value: CONTACT.hours,
    href:  null,
    color: 'gray',
  },
];

const COLOR_MAP = {
  red:    'bg-red-50 text-red-500',
  green:  'bg-green-50 text-green-500',
  orange: 'bg-orange-50 text-orange-500',
  gray:   'bg-gray-100 text-gray-500',
};

export default function ContactInfo() {
  return (
    <section className="py-12 bg-brand-bg border-t border-gray-100" aria-label="Contact information">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {INFO_ITEMS.map(item => {
            const Icon       = item.icon;
            const colorClass = COLOR_MAP[item.color] || COLOR_MAP.gray;

            return (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClass}`}>
                  <Icon className="text-lg" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-800 hover:text-red-500 transition-colors duration-150 break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-700">{item.value}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
