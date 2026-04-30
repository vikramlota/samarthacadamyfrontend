const SITE_URL   = 'https://thesamarthacademy.in';
const ORG_PHONE  = '+91-99889-49969';
const ORG_EMAIL  = 'samarth.academy2006@gmail.com';
const DEFAULT_OG = `${SITE_URL}/og.jpg`;

// ─── Course / FAQ / Breadcrumb (used by landing pages) ────────────────────

export function getCourseSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Course',
    name:        page.examFullName,
    description: page.seo?.description,
    provider: {
      '@type':  'EducationalOrganization',
      name:     'Samarth Academy',
      sameAs:   SITE_URL,
      address: {
        '@type':           'PostalAddress',
        streetAddress:     'SCF 68, UT Market, Opp. GNDU',
        addressLocality:   'Amritsar',
        addressRegion:     'Punjab',
        addressCountry:    'IN',
      },
    },
    offers: page.courseDetails?.fees?.discounted ? {
      '@type':        'Offer',
      price:          page.courseDetails.fees.discounted,
      priceCurrency:  page.courseDetails.fees.currency || 'INR',
      availability:   'https://schema.org/InStock',
    } : undefined,
    hasCourseInstance: {
      '@type':      'CourseInstance',
      courseMode:   'Blended',
      instructor: { '@type': 'Person', name: 'Samarth Academy Faculty' },
    },
  };
}

export function getFAQSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:  faqs.map(faq => ({
      '@type': 'Question',
      name:    faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    typeof faq.answer === 'string'
          ? faq.answer.replace(/<[^>]*>/g, '').trim()
          : String(faq.answer),
      },
    })),
  };
}

// Flexible BreadcrumbList — accepts [{name, href?}] array.
// Home is NOT auto-prepended here; callers pass the full list.
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type':    'ListItem',
      position:   idx + 1,
      name:       item.name,
      item:       item.href
        ? `${SITE_URL}${item.href === '/' ? '' : item.href}`
        : undefined,
    })),
  };
}

// ─── Organization / WebSite / LocalBusiness (root schemas, every page) ────

export function getOrganizationSchema() {
  return {
    '@context':     'https://schema.org',
    '@type':        'EducationalOrganization',
    '@id':          `${SITE_URL}/#organization`,
    name:           'Samarth Academy',
    alternateName:  'Samarth Academy Amritsar',
    url:            SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url:     `${SITE_URL}/images/purelogo.png`,
      width:   512,
      height:  512,
    },
    image:          DEFAULT_OG,
    description:    "Samarth Academy is Amritsar's premier coaching institute for SSC, Banking, Punjab Police, and other government exams. Founded by ex-government officers.",
    telephone:      ORG_PHONE,
    email:          ORG_EMAIL,
    foundingDate:   '2006',
    founders: [
      { '@type': 'Person', name: 'Sidharth', jobTitle: 'Co-Founder & Ex-Bank Manager, Bank of India' },
      { '@type': 'Person', name: 'Deepika',  jobTitle: 'Co-Founder & Ex-GST & Customs Inspector'    },
    ],
    address: {
      '@type':         'PostalAddress',
      streetAddress:   'SCF 68, UT Market, Opp. GNDU',
      addressLocality: 'Amritsar',
      addressRegion:   'Punjab',
      postalCode:      '143005',
      addressCountry:  'IN',
    },
    sameAs: [],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type':    ['EducationalOrganization', 'LocalBusiness'],
    '@id':      `${SITE_URL}/#localbusiness`,
    name:       'Samarth Academy',
    image:      DEFAULT_OG,
    url:        SITE_URL,
    telephone:  ORG_PHONE,
    email:      ORG_EMAIL,
    address: {
      '@type':         'PostalAddress',
      streetAddress:   'SCF 68, UT Market, Opp. GNDU',
      addressLocality: 'Amritsar',
      addressRegion:   'Punjab',
      postalCode:      '143005',
      addressCountry:  'IN',
    },
    geo: {
      '@type':    'GeoCoordinates',
      latitude:   '31.6340',
      longitude:  '74.8723',
    },
    openingHoursSpecification: [{
      '@type':      'OpeningHoursSpecification',
      dayOfWeek:    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens:        '09:00',
      closes:       '19:00',
    }],
    priceRange:     '₹₹',
    paymentAccepted: ['Cash', 'UPI', 'Bank Transfer'],
    areaServed:     { '@type': 'City', name: 'Amritsar' },
    knowsAbout: [
      'SSC Coaching', 'Banking Exam Preparation', 'Punjab Police Exam',
      'IBPS PO Coaching', 'Government Exam Coaching',
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context':   'https://schema.org',
    '@type':      'WebSite',
    '@id':        `${SITE_URL}/#website`,
    url:          SITE_URL,
    name:         'Samarth Academy',
    description:  'Best coaching institute in Amritsar for government exams',
    publisher:    { '@id': `${SITE_URL}/#organization` },
    inLanguage:   'en-IN',
  };
}

// ─── Page-specific schemas ────────────────────────────────────────────────

export function getCoursesListSchema(courses) {
  return {
    '@context':      'https://schema.org',
    '@type':         'ItemList',
    name:            'Courses at Samarth Academy',
    description:     'Government exam coaching courses in Amritsar',
    numberOfItems:   courses.length,
    itemListElement: courses.map((c, idx) => ({
      '@type':    'ListItem',
      position:   idx + 1,
      url:        `${SITE_URL}/${c.slug}`,
      name:       c.examShortName || c.title,
    })),
  };
}

export function getPersonSchema(faculty) {
  return {
    '@context':   'https://schema.org',
    '@type':      'Person',
    name:         faculty.name,
    jobTitle:     faculty.designation || faculty.credential,
    worksFor:     { '@id': `${SITE_URL}/#organization` },
    image:        faculty.photo,
    description:  faculty.bio || faculty.shortBio,
    knowsAbout:   faculty.subjects || [],
  };
}
