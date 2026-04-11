import { Helmet } from 'react-helmet-async';
import React from 'react';

/**
 * SEO Meta Tags Component
 * Set page-specific meta data for better search engine optimization
 *
 * Rules:
 * - viewport, charset, and favicon live in index.html ONLY (not here)
 * - Everything else (title, description, canonical, og:*) lives here
 * - This prevents duplicate meta tag errors caught by Seobility/Google
 */
export const SEOHead = ({
  title = 'Samarth Academy | SSC, Banking & Govt Exam Coaching',
  description = 'Samarth Academy, Amritsar — top coaching for SSC CGL, IBPS PO, Banking, State & Govt exams. Expert faculty, small batches, proven results.',
  canonical = 'https://thesamarthacademy.in',
  ogTitle = null,
  ogDescription = null,
  ogImage = 'https://thesamarthacademy.in/logo.png',
  ogType = 'website',
  author = 'Samarth Academy',
  keywords = 'SSC, Banking, UPSC, State Exams, Defense, Competitive Exams'
}) => {
  return (
    <Helmet>
      {/* Title & core meta — viewport/charset stay in index.html */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

      {/* ISO-standard language (not "english" — that is non-standard) */}
      <meta httpEquiv="content-language" content="en" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Samarth Academy" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};


/**
 * Structured Data (JSON-LD) for Rich Snippets
 */
export const StructuredData = ({ type = 'Organization', data = {} }) => {
  let schemaData = {};

  switch (type) {
    case 'Organization':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Samarth Academy',
        url: 'https://thesamarthacademy.in',
        logo: 'https://thesamarthacademy.in/logo.png',
        description: 'Online coaching for SSC, Banking, State, Defense exams',
        ...data
      };
      break;

    case 'Course':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: data.name || 'Exam Preparation Course',
        description: data.description || '',
        provider: {
          '@type': 'Organization',
          name: 'Samarth Academy',
          sameAs: 'https://thesamarthacademy.in'
        },
        ...data
      };
      break;

    case 'LocalBusiness':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Samarth Academy',
        image: 'https://thesamarthacademy.in/logo.png',
        telephone: '+91-XXXXXXXXXX',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
          addressRegion: 'Punjab'
        },
        ...data
      };
      break;

    default:
      schemaData = data;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

/**
 * Breadcrumb Navigation for SEO
 */
export const BreadcrumbSchema = ({ items = [] }) => {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbList)}
      </script>
    </Helmet>
  );
};
