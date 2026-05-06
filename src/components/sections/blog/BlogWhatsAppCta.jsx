import React from 'react';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';

const WHATSAPP_MSG = encodeURIComponent(
  "Hi! I just read an article on your blog. I'd like to know more about your coaching programs.",
);

export default function BlogWhatsAppCta() {
  const whatsappUrl = `https://wa.me/919041973105?text=${WHATSAPP_MSG}`;

  return (
    <section className="py-12 md:py-16 bg-brand-bg">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-card shadow-card p-6 md:p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-4">
            <FaWhatsapp className="text-3xl text-green-500" aria-hidden="true" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            Have Questions? Let&rsquo;s Talk.
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Got specific questions about your exam preparation? Want to know about our coaching
            programs? Chat with us directly on WhatsApp — we respond within an hour.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button
              href={whatsappUrl}
              size="lg"
              icon={FaWhatsapp}
              className="bg-green-500 hover:bg-green-600 text-white border-transparent shadow-soft"
            >
              Chat on WhatsApp
            </Button>
            <Button variant="outline" size="lg" iconRight={FaArrowRight} to="/contact">
              Visit Contact Page
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Free counselling &bull; No spam &bull; Response within an hour
          </p>
        </div>
      </div>
    </section>
  );
}
