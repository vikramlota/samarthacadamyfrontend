import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getBreadcrumbSchema } from '@/lib/seo';

/**
 * Injects BreadcrumbList JSON-LD schema with no visible UI.
 * Use in pages where Breadcrumbs UI is intentionally omitted.
 *
 * @param {Array} items - [{ name: string, href: string }]
 *   Home is auto-prepended.
 */
export default function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null;

  const full = [{ name: 'Home', href: '/' }, ...items];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getBreadcrumbSchema(full))}
      </script>
    </Helmet>
  );
}
