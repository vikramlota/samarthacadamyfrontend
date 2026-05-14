import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { SectionHeader, Badge } from '@/components/ui';
import { FOUNDERS } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function FounderCard({ founder }) {
  const initials = founder.name ? founder.name.split(' ').map(n => n[0]).join('') : '';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden h-full">
      {/* Avatar band */}
      <div className="gradient-primary h-32 flex items-end px-8 pb-0 relative">
        <div className="absolute bottom-0 translate-y-1/2 left-8 w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center border-4 border-white overflow-hidden">
          {founder.photo ? (
            <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-black text-red-500">{initials}</span>
          )}
        </div>
      </div>

      <div className="pt-14 px-8 pb-8">
        <h3 className="text-xl font-bold text-gray-900">{founder.name}</h3>
        <p className="text-sm text-red-500 font-medium mt-0.5">{founder.title}</p>
        <p className="text-xs text-gray-500 mt-1">{founder.formerRole || (founder.yearsOfService ? `${founder.yearsOfService}+ Years` : '')}</p>

        <div className="mt-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Credentials</p>
          <div className="flex flex-wrap gap-2">
            {(founder.credentials || []).map((cred, i) => (
              <Badge key={i} variant="outline" size="sm" className="bg-gray-50 border-gray-100 text-gray-600">
                {cred}
              </Badge>
            ))}
          </div>
        </div>

        <p className="mt-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 line-clamp-4">
          {founder.bio}
        </p>
      </div>
    </div>
  );
}

export default function FoundersGrid({ founders: apiFounders }) {
  const list = (apiFounders && apiFounders.length > 0) ? apiFounders : FOUNDERS;

  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="founders-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Meet the Founders"
          title="Officers Who Teach What They Lived"
          description="Both founders served in government posts before starting Samarth Academy. They teach from direct experience — not textbooks."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {list.map((founder, i) => (
            <motion.div key={founder.name || i} variants={staggerItem}>
              <FounderCard founder={founder} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
