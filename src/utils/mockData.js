// MOCK_MODE: true during dev (no backend needed), false in production.
// Override with VITE_MOCK_MODE=false in .env.local when backend is ready.
export const MOCK_MODE =
  import.meta.env.VITE_MOCK_MODE === 'false'
    ? false
    : import.meta.env.DEV || import.meta.env.VITE_MOCK_MODE === 'true';

export const MOCK = {
  '/stats': {
    success: true,
    data: {
      yearsOfExperience: 20,
      totalStudents: 5000,
      totalSelections: 1200,
      facultyCount: 12,
      examCategories: 20,
    },
  },

  '/notifications': {
    success: true,
    data: [
      { _id: 'n1', text: '🎯 SSC CGL 2026 — New Batch Starting May 1st · Limited 30 seats', href: '/notifications', active: true },
      { _id: 'n2', text: '🏆 IBPS PO 2025 — 48 Students Selected · Congratulations to all achievers!', href: '/Selections', active: true },
      { _id: 'n3', text: '📚 Punjab Police Constable — Free Demo Class every Saturday 10 AM', href: '/book-demo', active: true },
      { _id: 'n4', text: '🔔 SSC CHSL 2025 Notification Released — Enroll now for early batch', href: '/notifications', active: true },
      { _id: 'n5', text: '📱 ClassPlus App · Code: Kaylhy · Access study material anytime, anywhere', href: '/notifications', active: true },
    ],
  },

  '/featured-exam': {
    success: true,
    data: {
      _id: 'fe1',
      isActive: true,
      badge: '🔥 Filling Fast',
      name: 'SSC CGL 2026',
      tagline: 'New Batch Starting May 1st',
      description:
        'Comprehensive preparation for SSC CGL 2026 with our most experienced faculty. Step-by-step subject coverage, weekly mock tests, and personal doubt sessions included.',
      highlights: [
        { label: 'Duration',    value: '9 months' },
        { label: 'Batch Size',  value: '30 students max' },
        { label: 'Includes',    value: 'Mock tests + Study material + Doubt sessions' },
        { label: 'Fee',         value: '₹15,000 (EMI available)' },
      ],
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=700',
      ctaPrimaryLabel:   'Enroll Now',
      ctaPrimaryHref:    '/book-demo',
      ctaSecondaryLabel: 'Know More',
      ctaSecondaryHref:  '/courses/ssc-coaching',
    },
  },

  '/courses': {
    success: true,
    data: [
      { _id: 'c1', slug: 'ssc-coaching',  title: 'SSC Coaching',  shortDescription: 'Complete prep for SSC CGL, CHSL, MTS & CPO with subject-wise modules', icon: 'FaGraduationCap', duration: '6–9 months', studentCount: '800+', featured: true,  displayOrder: 1, active: true },
      { _id: 'c2', slug: 'banking',        title: 'Banking',        shortDescription: 'IBPS PO, SBI PO & Clerk coaching with full mock test series',            icon: 'FaUniversity',   duration: '6 months',   studentCount: '600+', featured: false, displayOrder: 2, active: true },
      { _id: 'c3', slug: 'punjab-police',  title: 'Punjab Police',  shortDescription: 'Constable & SI preparation with physical training guidance',             icon: 'FaShieldAlt',    duration: '4 months',   studentCount: '500+', featured: false, displayOrder: 3, active: true },
      { _id: 'c4', slug: 'ssc-cgl',        title: 'SSC CGL',        shortDescription: 'Dedicated Combined Graduate Level batch with full syllabus coverage',    icon: 'FaFileAlt',      duration: '9 months',   studentCount: '400+', featured: false, displayOrder: 4, active: true },
      { _id: 'c5', slug: 'ibps-po',        title: 'IBPS PO',        shortDescription: 'Probationary Officer coaching with interview preparation included',      icon: 'FaMoneyBillWave',duration: '6 months',   studentCount: '350+', featured: false, displayOrder: 5, active: true },
      { _id: 'c6', slug: 'ugc-net',        title: 'UGC NET',        shortDescription: 'National Eligibility Test — Paper I & subject-specific Paper II',       icon: 'FaBookOpen',     duration: '5 months',   studentCount: '200+', featured: false, displayOrder: 6, active: true },
    ],
  },

  '/testimonials': {
    success: true,
    data: [
      { _id: 't1', name: 'Priya Singh',     exam: 'IBPS PO',          selectionYear: 2024, post: 'Probationary Officer, Bank of India',       photo: null, quote: 'Samarth Academy gave me the structure and discipline I was missing in self-study. The faculty is incredibly supportive and the mock tests are bang-on.', rating: 5, featured: true },
      { _id: 't2', name: 'Rohit Sharma',    exam: 'SSC CGL',          selectionYear: 2024, rank: 'AIR 342', post: 'Inspector, Income Tax Dept.', photo: null, quote: 'Cleared SSC CGL on my first attempt. The personalised attention at Samarth made all the difference — small batch means no one gets left behind.',       rating: 5, featured: true },
      { _id: 't3', name: 'Manpreet Kaur',   exam: 'Punjab Police SI', selectionYear: 2023, post: 'Sub-Inspector, Punjab Police',               photo: null, quote: 'The coaching quality at Samarth is unmatched in Amritsar. They helped with both written and physical preparation. Forever grateful!',                  rating: 5, featured: true },
      { _id: 't4', name: 'Vikram Thakur',   exam: 'SBI PO',           selectionYear: 2024, post: 'Probationary Officer, State Bank of India',  photo: null, quote: 'I had failed twice before joining Samarth. Their systematic approach and weekly doubt sessions cracked the code for me. Highly recommend!',              rating: 5, featured: true },
      { _id: 't5', name: 'Simran Bhatia',   exam: 'SSC CHSL',         selectionYear: 2023, post: 'LDC, Department of Posts',                   photo: null, quote: 'Affordable fees, experienced teachers, and a focused environment — everything a serious aspirant needs. Thank you Samarth Academy!',                   rating: 5, featured: true },
      { _id: 't6', name: 'Arjun Mehta',     exam: 'UGC NET',          selectionYear: 2024, post: 'Assistant Professor (qualified)',             photo: null, quote: 'Excellent guidance for UGC NET. The paper analysis sessions and previous year question practice were incredibly helpful and focused.',                     rating: 5, featured: true },
    ],
    total: 42,
  },

  // Used by existing SelectionSlider (GET /api/results)
  '/results': {
    success: true,
    data: [
      { _id: 's1', name: 'Rahul Kumar',      imageUrl: null, examCleared: 'SSC CGL',          year: 2024, rank: 'AIR 234' },
      { _id: 's2', name: 'Anjali Verma',     imageUrl: null, examCleared: 'IBPS PO',          year: 2024 },
      { _id: 's3', name: 'Harpreet Singh',   imageUrl: null, examCleared: 'Punjab Police SI', year: 2023 },
      { _id: 's4', name: 'Nisha Gupta',      imageUrl: null, examCleared: 'SBI PO',           year: 2024 },
      { _id: 's5', name: 'Deepak Malhotra',  imageUrl: null, examCleared: 'SSC CHSL',         year: 2023 },
      { _id: 's6', name: 'Pooja Sharma',     imageUrl: null, examCleared: 'UGC NET',          year: 2024 },
      { _id: 's7', name: 'Suresh Yadav',     imageUrl: null, examCleared: 'SSC CGL',          year: 2023, rank: 'AIR 891' },
      { _id: 's8', name: 'Gurpreet Kaur',    imageUrl: null, examCleared: 'IBPS Clerk',       year: 2024 },
    ],
  },
};
