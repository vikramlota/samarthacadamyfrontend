import React, { Suspense } from 'react';
import { SEOHead, StructuredData } from '../utils/seoHelpers';
import { ComponentSkeleton } from '../components/SkeletonLoader';

// Above-fold & lightweight sections — not lazy
import NotifBar        from '../components/home/NotifBar';
import Hero            from '../components/home/Hero';
import StatsBar        from '../components/home/StatsBar';
import FeaturedExam    from '../components/home/FeaturedExam';
import CoursesGrid     from '../components/home/CoursesGrid';
import Testimonials    from '../components/home/Testimonials';
import LeadForm        from '../components/home/LeadForm';

// Existing below-fold components — lazy (already in separate chunks)
const WhyUs          = React.lazy(() => import('../components/WhyUs'));
const SelectionSlider = React.lazy(() => import('../components/SelectionSlider'));
const FAQ             = React.lazy(() => import('../components/FAQ'));
const Map             = React.lazy(() => import('../components/Map'));

const HomePage = () => (
  <>
    <SEOHead
      title="Samarth Academy | Best SSC, Banking & Govt Exam Coaching in Amritsar"
      description="Samarth Academy, Amritsar — top coaching for SSC CGL, IBPS PO, Banking, Punjab Police & Govt exams. 20+ years · 1,200+ selections · Small batches · Expert faculty."
      canonical="https://thesamarthacademy.in"
      keywords="best coaching institute in Amritsar, top coaching institute in Amritsar, government exam coaching Amritsar, SSC coaching Amritsar, banking coaching institute Amritsar, govt job coaching near me, coaching near GNDU Amritsar, SSC CGL coaching Amritsar, IBPS PO coaching Punjab, Punjab Police coaching Amritsar, UGC NET coaching Amritsar, affordable coaching Amritsar"
    />

    <StructuredData
      type="Organization"
      data={{
        sameAs: [
          'https://www.facebook.com/samarthacademy2006',
          'https://www.instagram.com/gyanm.samarth.academy',
          'https://youtube.com/@samarth.academyy',
        ],
        contactPoint: {
          '@type':       'ContactPoint',
          contactType:   'Customer Service',
          telephone:     '+91-9988949969',
          email:         'samarth.academy2006@gmail.com',
          areaServed:    'IN',
          availableLanguage: ['Hindi', 'Punjabi', 'English'],
        },
      }}
    />

    {/* Rotating announcements strip */}
    <NotifBar />

    {/* Hero — headline + inline lead-capture form */}
    <Hero />

    {/* Trust numbers — dark bar */}
    <StatsBar />

    {/* Spotlight exam — hidden when backend returns data: null */}
    <FeaturedExam />

    {/* Courses grid */}
    <CoursesGrid />

    {/* "The Samarth Edge" bento section */}
    <Suspense fallback={<ComponentSkeleton size="large" />}>
      <WhyUs />
    </Suspense>

    {/* Hall of Fame — student selections */}
    <Suspense fallback={<ComponentSkeleton size="large" />}>
      <SelectionSlider />
    </Suspense>

    {/* Testimonials grid */}
    <Testimonials />

    {/* Mid-page conversion form */}
    <LeadForm />

    {/* FAQ */}
    <Suspense fallback={<ComponentSkeleton size="medium" />}>
      <FAQ />
    </Suspense>

    {/* Google Maps embed */}
    <Suspense fallback={<ComponentSkeleton size="medium" />}>
      <Map />
    </Suspense>
  </>
);

export default React.memo(HomePage);
