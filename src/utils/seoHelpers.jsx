import { Helmet } from 'react-helmet-async';
import React from 'react';

/**
 * SEO Meta Tags Component
 * Set page-specific meta data for better search engine optimization
 */
export const SEOHead = ({
  title = 'Samarth Academy - SSC, Banking & Defense Exams',
  description = 'Prepare for SSC, Banking, State, Defense exams with expert guidance at Samarth Academy. Top-quality courses and mock tests.',
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
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="charset" content="utf-8" />

      {/* Canonical URL for duplicate content prevention */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph Meta Tags for Social Sharing */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Samarth Academy" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content="index, follow" />

      {/* Preconnect to external resources for performance */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
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
