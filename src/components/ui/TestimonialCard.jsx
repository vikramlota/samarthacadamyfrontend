import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { cn } from '../../lib/utils';

/**
 * TestimonialCard — student success story card.
 *
 * Props:
 *   name, exam, selectionYear, rank — attribution meta
 *   photo   — URL string; falls back to initials avatar
 *   quote   — required testimonial text
 *   rating  — 1–5 (default 5)
 */
const TestimonialCard = ({
  name,
  exam,
  selectionYear,
  rank,
  photo,
  quote,
  rating    = 5,
  className,
}) => (
  <article
    className={cn(
      'relative bg-white rounded-card shadow-soft border border-gray-100 p-6 md:p-8',
      'transition-all duration-[250ms] hover:-translate-y-0.5 hover:shadow-card',
      className,
    )}
  >
    {/* Decorative quote mark — visual only */}
    <FaQuoteLeft
      className="absolute top-6 right-6 text-4xl text-red-100 pointer-events-none select-none"
      aria-hidden="true"
    />

    {/* Star rating */}
    <div className="flex items-center gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={cn('text-sm', i < rating ? 'text-orange-400' : 'text-gray-200')} aria-hidden="true" />
      ))}
    </div>

    {/* Quote text */}
    <p className="text-base text-gray-700 leading-relaxed mb-6 relative z-10">
      "{quote}"
    </p>

    {/* Author row */}
    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-red-100 flex-shrink-0"
        />
      ) : (
        <div
          className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-red-500 font-bold text-lg">{name?.[0]}</span>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">
          {exam}
          {selectionYear && ` · ${selectionYear}`}
          {rank && ` · Rank ${rank}`}
        </p>
      </div>
    </div>
  </article>
);

export default TestimonialCard;
