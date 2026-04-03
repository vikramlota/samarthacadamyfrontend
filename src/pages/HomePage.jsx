import React, { Suspense } from 'react';
import { useHomepageData } from '../utils/customHooks';
import { ComponentSkeleton } from '../components/SkeletonLoader';
import { SEOHead, StructuredData } from '../utils/seoHelpers';

// Lazy load heavy components
const Hero = React.lazy(() => import('../components/HeroSlider'));
const WhyUs = React.lazy(() => import('../components/WhyUs'));
const SelectionSlider = React.lazy(() => import('../components/SelectionSlider'));
const AboutUs = React.lazy(() => import('../components/AboutUs'));
const FAQ = React.lazy(() => import('../components/FAQ'));
const Map = React.lazy(() => import('../components/Map'));

const HomePage = () => {
  const { data, loading, error } = useHomepageData();

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Samarth Academy - Best Online Coaching for SSC, Banking & Defense Exams"
        description="Expert online coaching for SSC, Banking, State, Defense, Teaching & UPSC exams. Get quality courses, mock tests, and expert guidance at Samarth Academy."
        canonical="https://thesamarthacademy.in"
        keywords="SSC coaching, Banking exams, Defense exams, UPSC coaching, State exams, Competitive exams india"
      />

      {/* Structured Data */}
      <StructuredData
        type="Organization"
        data={{
          sameAs: [
            'https://www.facebook.com/samarthacademy',
            'https://www.youtube.com/samarthacademy'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            telephone: '+91-XXXXXXXXXX',
            email: 'contact@thesamarthacademy.in'
          }
        }}
      />

      <Suspense fallback={<ComponentSkeleton size="large" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<ComponentSkeleton size="medium" />}>
        <WhyUs />
      </Suspense>

      <Suspense fallback={<ComponentSkeleton size="large" />}>
        <SelectionSlider data={data?.data?.successStories} loading={loading} />
      </Suspense>

      <Suspense fallback={<ComponentSkeleton size="large" />}>
        <AboutUs />
      </Suspense>

      <Suspense fallback={<ComponentSkeleton size="medium" />}>
        <FAQ />
      </Suspense>

      <Suspense fallback={<ComponentSkeleton size="medium" />}>
        <Map />
      </Suspense>
    </>
  );
};

export default React.memo(HomePage);