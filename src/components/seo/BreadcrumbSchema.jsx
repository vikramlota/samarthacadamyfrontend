import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateBreadcrumbSchema } from '@/utils/schemaHelpers';

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
  const schemaData = generateBreadcrumbSchema(full.map(item => ({ name: item.name, path: item.href })));

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
