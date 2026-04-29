import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { CONTACT } from '@/data/homeStaticContent';
import { slideInLeft, slideInRight, viewportConfig } from '@/lib/motion';

const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.3!2d74.87!3d31.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSamarth+Academy+Amritsar!5e0!3m2!1sen!2sin!4v1';
const MAPS_LINK  = 'https://maps.google.com/?q=SCF+68+UT+Market+Opp+GNDU+Amritsar';

export default function VisitInfo() {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="visit-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <motion.div
            initial={slideInLeft.initial}
            whileInView={slideInLeft.animate}
            transition={slideInLeft.transition}
            viewport={viewportConfig}
            className="space-y-6"
          >
            <div>
              <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Visit Us</p>
              <h2 id="visit-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Come Meet Us in Amritsar
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We're located right opposite GNDU (Guru Nanak Dev University), easily accessible from all parts of Amritsar.
              </p>
            </div>

            <div className="bg-brand-bg rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Address</p>
                  <p className="text-sm text-gray-600 mt-0.5">{CONTACT.address}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1 pl-6">
                <p><strong className="text-gray-800">Landmark:</strong> Opposite GNDU main gate</p>
                <p><strong className="text-gray-800">Nearest bus stop:</strong> GNDU, Amritsar</p>
                <p><strong className="text-gray-800">Parking:</strong> Available in UT Market</p>
              </div>
            </div>

            <Button href={MAPS_LINK} icon={FaExternalLinkAlt} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </Button>
          </motion.div>

          <motion.div
            initial={slideInRight.initial}
            whileInView={slideInRight.animate}
            transition={slideInRight.transition}
            viewport={viewportConfig}
            className="rounded-2xl overflow-hidden shadow-card h-80 md:h-96"
          >
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Samarth Academy location map"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
