import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { getBreadcrumbSchema } from '@/lib/seo';

/**
 * Visual breadcrumb nav + BreadcrumbList schema injected into <head>.
 *
 * @param {Array}  items     - [{ name, href? }] — Home is auto-prepended
 * @param {string} className
 */
export default function Breadcrumbs({ items, className }) {
  if (!items || items.length === 0) return null;

  const full = [{ name: 'Home', href: '/' }, ...items];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbSchema(full))}
        </script>
      </Helmet>

      <nav
        aria-label="Breadcrumb"
        className={cn('py-3 bg-white border-b border-gray-100', className)}
      >
        <div className="container-custom">
          <ol className="flex items-center flex-wrap gap-1.5 text-sm">
            {full.map((item, idx) => {
              const isLast = idx === full.length - 1;
              return (
                <li key={idx} className="flex items-center gap-1.5">
                  {idx === 0 && (
                    <FaHome className="text-gray-400 text-xs shrink-0" aria-hidden="true" />
                  )}
                  {isLast ? (
                    <span className="text-gray-800 font-medium" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        to={item.href}
                        className="text-gray-500 hover:text-red-500 transition-colors duration-150"
                      >
                        {item.name}
                      </Link>
                      <FaChevronRight className="text-gray-300 text-xs shrink-0" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
