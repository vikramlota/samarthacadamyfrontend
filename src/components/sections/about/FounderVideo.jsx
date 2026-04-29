import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { SectionHeader } from '@/components/ui';
import { scaleIn, viewportConfig } from '@/lib/motion';

export default function FounderVideo({ video }) {
  const [playing, setPlaying] = useState(false);

  if (!video?.embedUrl && !video?.thumbnailUrl) return null;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="video-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="From the Founders"
          title={video.title || 'Hear It Directly From Us'}
          description={video.description || 'Why we started Samarth Academy — in our own words.'}
          className="mb-10"
        />

        <motion.div
          initial={scaleIn.initial}
          whileInView={scaleIn.animate}
          transition={scaleIn.transition}
          viewport={viewportConfig}
          className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-card aspect-video bg-gray-900"
        >
          {playing && video.embedUrl ? (
            <iframe
              src={`${video.embedUrl}?autoplay=1`}
              title={video.title || 'Founder Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              {video.thumbnailUrl && (
                <img
                  src={video.thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-75"
                />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  onClick={() => setPlaying(true)}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-150 group"
                  aria-label="Play founder video"
                >
                  <FaPlay className="text-white text-xl ml-1 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
