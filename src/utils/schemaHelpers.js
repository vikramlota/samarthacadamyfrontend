// Task 2 — Course page schema helper
export const generateCourseSchema = (courseName, courseSlug, courseKeywords) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": `${courseName} in Amritsar`,
  "description": `Best ${courseName} coaching in Amritsar at Samarth Academy. Expert faculty, comprehensive study material, regular mock tests.`,
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://thesamarthacademy.in/#organization",
    "name": "Samarth Academy",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "UT Market, Opposite Guru Nanak Dev University",
      "addressLocality": "Amritsar",
      "addressRegion": "Punjab",
      "addressCountry": "IN"
    }
  },
  "url": `https://thesamarthacademy.in/${courseSlug}`,
  "educationalLevel": "Professional Certification",
  "teaches": courseKeywords,
  "inLanguage": ["en", "hi", "pa"],
  "offers": {
    "@type": "Offer",
    "category": "Coaching",
    "availability": "https://schema.org/InStock",
    "url": `https://thesamarthacademy.in/${courseSlug}`
  }
});

// Task 3 — Blog post schema helper
export const generateArticleSchema = (title, description, image, publishedDate, modifiedDate, slug) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "image": image || "https://thesamarthacademy.in/images/purelogo.png",
  "author": {
    "@type": "Organization",
    "name": "Samarth Academy",
    "@id": "https://thesamarthacademy.in/#organization"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Samarth Academy",
    "logo": {
      "@type": "ImageObject",
      "url": "https://thesamarthacademy.in/images/purelogo.png"
    }
  },
  "datePublished": publishedDate,
  "dateModified": modifiedDate || publishedDate,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://thesamarthacademy.in/blog/${slug}`
  }
});

// Task 4 — FAQ schema helper
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({ question, answer }) => ({
    "@type": "Question",
    "name": question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": typeof answer === 'string' ? answer.replace(/<[^>]*>/g, '').trim() : String(answer)
    }
  }))
});

// Task 5 — BreadcrumbList schema helper
export const generateBreadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": `https://thesamarthacademy.in${crumb.path}`
  }))
});
