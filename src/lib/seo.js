export function getCourseSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: page.examFullName,
    description: page.seo?.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Samarth Academy',
      sameAs: 'https://thesamarthacademy.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'SCF 68, UT Market, Opp. GNDU',
        addressLocality: 'Amritsar',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
    },
    offers: page.courseDetails?.fees?.discounted
      ? {
          '@type': 'Offer',
          price: page.courseDetails.fees.discounted,
          priceCurrency: page.courseDetails.fees.currency || 'INR',
          availability: 'https://schema.org/InStock',
        }
      : undefined,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      instructor: {
        '@type': 'Person',
        name: 'Samarth Academy Faculty',
      },
    },
  };
}

export function getFAQSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string'
          ? faq.answer.replace(/<[^>]*>/g, '').trim()
          : String(faq.answer),
      },
    })),
  };
}

export function getBreadcrumbSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thesamarthacademy.in/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Courses',
        item: 'https://thesamarthacademy.in/courses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.examShortName,
        item: page.seo?.canonical,
      },
    ],
  };
}
