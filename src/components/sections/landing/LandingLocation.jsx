import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa';
import { SectionHeader, Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';

const CONTACT_ROWS = [
  {
    icon: FaMapMarkerAlt,
    label: 'Address',
    content: CONTACT.address,
    href: 'https://maps.google.com/?q=SCF+68+UT+Market+Opp+GNDU+Amritsar',
    external: true,
  },
  {
    icon: FaPhoneAlt,
    label: 'Phone',
    content: CONTACT.phone,
    href: CONTACT.phoneTel,
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    content: '+91 90419 73105',
    href: CONTACT.whatsapp,
    external: true,
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    content: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: FaClock,
    label: 'Hours',
    content: CONTACT.hours,
  },
];

export default function LandingLocation() {
  return (
    <section className="bg-brand-bg section-padding" aria-labelledby="location-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Visit Our Centre"
          title="Samarth Academy, Amritsar"
          description="Walk in, meet the faculty, sit in a demo class — no appointment needed."
          className="mb-10"
        />

        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 items-stretch">

          {/* Left: Contact details */}
          <div className="bg-white rounded-card shadow-soft border border-gray-100 p-6 md:p-8 space-y-5">
            {CONTACT_ROWS.map(({ icon: Icon, label, content, href, external }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Icon className="text-red-500 text-sm" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-gray-900 hover:text-red-500 transition-colors duration-150 mt-0.5 block"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{content}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
              <Button href={CONTACT.phoneTel} icon={FaPhoneAlt} size="sm">
                Call Now
              </Button>
              <Button
                href={CONTACT.whatsappDemo}
                variant="outline"
                icon={FaWhatsapp}
                size="sm"
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Right: Google Map embed */}
          <div className="rounded-card overflow-hidden shadow-soft border border-gray-100 min-h-[300px]">
            <iframe
              title="Samarth Academy location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.8!2d74.8723!3d31.6340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zU0NGIDY4LCBVVCBNYXJrZXQsIE9wcC4gR05EVSwgQW1yaXRzYXI!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
