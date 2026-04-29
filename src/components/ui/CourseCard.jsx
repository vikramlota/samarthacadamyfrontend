import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUsers, FaArrowRight } from 'react-icons/fa';
import { cn } from '../../lib/utils';

/**
 * CourseCard — clickable course listing card.
 *
 * Props:
 *   title, description, icon — content
 *   duration     — e.g. '6 months'
 *   studentCount — e.g. '500+ enrolled'
 *   href         — React Router path (required)
 *   featured     — adds red-50 tint + red border accent
 */
const CourseCard = ({
  title,
  description,
  icon: Icon,
  duration,
  studentCount,
  href,
  featured  = false,
  className,
}) => (
  <Link
    to={href}
    className={cn(
      'group block rounded-card p-6 md:p-7 transition-all duration-[250ms]',
      'hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2',
      featured
        ? 'bg-red-50 border border-red-200 shadow-soft hover:shadow-card hover:border-red-300'
        : 'bg-white border border-gray-100 shadow-soft hover:shadow-card hover:border-red-200',
      className,
    )}
  >
    {/* Icon badge */}
    {Icon && (
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-5 group-hover:bg-red-100 transition-colors duration-200">
        <Icon className="text-xl" aria-hidden="true" />
      </div>
    )}

    {/* Title */}
    <h3 className="heading-display text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-200">
      {title}
    </h3>

    {/* Description */}
    {description && (
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-5">
        {description}
      </p>
    )}

    {/* Footer row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {duration && (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaClock className="text-gray-400" aria-hidden="true" />{duration}
          </span>
        )}
        {studentCount && (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaUsers className="text-gray-400" aria-hidden="true" />{studentCount}
          </span>
        )}
      </div>
      {/* Arrow slides right on hover */}
      <span className="text-red-500 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
        <FaArrowRight className="text-sm" />
      </span>
    </div>
  </Link>
);

export default CourseCard;
