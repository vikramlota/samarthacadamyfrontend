import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaChalkboardTeacher, FaUsers, FaPhoneAlt } from 'react-icons/fa';
import { useApiData } from '@/hooks/useApiData';
import { SectionHeader, Card, Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { CONTACT } from '@/data/homeStaticContent';

const formatDate = (dateStr) => {
  if (!dateStr) return 'TBA';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

function BatchCard({ b }) {
  const fillPct = b.totalSeats
    ? Math.min(((b.totalSeats - (b.seatsAvailable ?? b.totalSeats)) / b.totalSeats) * 100, 100)
    : 0;

  return (
    <Card
      hover
      className={cn('h-full', b.featured && 'ring-2 ring-red-500')}
    >
      {b.featured && (
        <Badge variant="orange" className="mb-3">🔥 Filling Fast</Badge>
      )}

      <h3 className="heading-display text-xl font-semibold text-gray-900 mb-4">{b.name}</h3>

      <div className="space-y-2.5 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <FaCalendar className="text-red-500 shrink-0" aria-hidden="true" />
          <span>Starts: <strong>{formatDate(b.startDate)}</strong></span>
        </div>
        {b.timing && (
          <div className="flex items-center gap-2 text-gray-700">
            <FaClock className="text-red-500 shrink-0" aria-hidden="true" />
            <span>{b.timing}</span>
          </div>
        )}
        {b.faculty && (
          <div className="flex items-center gap-2 text-gray-700">
            <FaChalkboardTeacher className="text-red-500 shrink-0" aria-hidden="true" />
            <span>Faculty: {b.faculty}</span>
          </div>
        )}
        {b.totalSeats != null && (
          <div className="flex items-center gap-2 text-gray-700">
            <FaUsers className="text-red-500 shrink-0" aria-hidden="true" />
            <span>
              <strong className={cn(b.seatsAvailable <= 5 ? 'text-red-500' : 'text-gray-900')}>
                {b.seatsAvailable ?? '—'}
              </strong>
              {' '}of {b.totalSeats} seats left
            </span>
          </div>
        )}
      </div>

      {b.totalSeats != null && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${fillPct}%` }}
              role="progressbar"
              aria-valuenow={fillPct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      <Button variant="primary" className="w-full mt-6" to="/book-demo">
        Reserve Seat
      </Button>
    </Card>
  );
}

export default function LandingBatches({ courseSlug, examShortName }) {
  const { data: batches, isLoading } = useApiData(
    `/batches?course=${courseSlug}&active=true`,
    { fallback: [] },
  );

  return (
    <section className="bg-brand-bg section-padding" aria-labelledby="batches-heading">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Upcoming Batches"
          title={`Join Our Next ${examShortName} Batch`}
          description="Limited seats per batch — enrol early to secure your spot."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-card border border-gray-100 p-6 animate-pulse space-y-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((__, j) => (
                    <div key={j} className="h-3 w-full bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="h-10 bg-gray-200 rounded-btn" />
              </div>
            ))}
          </div>
        ) : batches?.length ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {batches.map((b, i) => (
              <motion.div key={b.id || i} variants={staggerItem}>
                <BatchCard b={b} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center bg-white rounded-card shadow-soft border border-gray-100 py-12 px-6 max-w-lg mx-auto">
            <p className="text-gray-700 font-medium">Next batch dates coming soon.</p>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Call us to reserve your spot before the batch fills up.
            </p>
            <Button href={CONTACT.phoneTel} icon={FaPhoneAlt}>
              Call to Reserve: {CONTACT.phone}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
