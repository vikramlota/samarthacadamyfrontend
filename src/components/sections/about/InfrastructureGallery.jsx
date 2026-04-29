import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExpand } from 'react-icons/fa';
import { SectionHeader } from '@/components/ui';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function LightboxModal({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-3xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={image.url}
              alt={image.caption || 'Samarth Academy'}
              className="w-full rounded-2xl object-cover max-h-[80vh]"
            />
            {image.caption && (
              <p className="text-white/80 text-sm mt-3 text-center">{image.caption}</p>
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function InfrastructureGallery({ gallery }) {
  const [lightbox, setLightbox] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Our Campus"
          title="Infrastructure & Facilities"
          description="A focused learning environment designed for government exam preparation."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {gallery.map((image, i) => (
            <motion.div
              key={image.id || i}
              variants={staggerItem}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              onClick={() => setLightbox(image)}
            >
              <img
                src={image.url}
                alt={image.caption || `Campus photo ${i + 1}`}
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl" aria-hidden="true" />
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs">{image.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
