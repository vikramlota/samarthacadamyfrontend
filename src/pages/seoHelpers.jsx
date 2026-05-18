import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useLocation } from 'react-router-dom';

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
  keywords = 'best coaching institute in Amritsar, SSC coaching Amritsar, Punjab police coaching Amritsar, banking coaching institute in Amritsar, govt job coaching near me, SSC CGL coaching in Amritsar, IBPS PO coaching Punjab, PSSSB coaching Amritsar, coaching institute near GNDU, government exam coaching Punjab'
}) => {
  const { pathname } = useLocation();
  const canonicalUrl = `https://thesamarthacademy.in${pathname}`;

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://thesamarthacademy.in/#organization",
        "name": "Samarth Academy",
        "alternateName": "The Samarth Academy",
        "url": "https://thesamarthacademy.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://thesamarthacademy.in/images/purelogo.png",
          "width": 200,
          "height": 200
        },
        "description": "Top government exam coaching centre in Amritsar for SSC, Bank PO, Railway, Punjab Police, TET, UGC NET, CAT and PSSSB exams.",
        "telephone": "+91-XXXXXXXXXX",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "UT Market, Opposite Guru Nanak Dev University",
          "addressLocality": "Amritsar",
          "addressRegion": "Punjab",
          "postalCode": "143005",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "31.6340",
          "longitude": "74.8723"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "50",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": [
          "https://www.google.com/maps?cid=YOUR_GOOGLE_CID",
          "https://www.facebook.com/samarthacademy",
          "https://www.instagram.com/samarthacademy",
          "https://www.youtube.com/@samarthacademy"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Coaching Courses",
          "itemListElement": [
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "SSC Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Bank PO Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Railway Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Punjab Police Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "TET Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "UGC NET Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "CAT Coaching in Amritsar"}},
            {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "PSSSB Coaching in Amritsar"}}
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://thesamarthacademy.in/#website",
        "url": "https://thesamarthacademy.in",
        "name": "Samarth Academy",
        "publisher": {"@id": "https://thesamarthacademy.in/#organization"},
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://thesamarthacademy.in/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

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
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Samarth Academy" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />

      {pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
      )}
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
