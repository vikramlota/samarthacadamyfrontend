import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
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
        title="Samarth Academy | SSC, Banking & Govt Exam Coaching"
        description="Samarth Academy, Amritsar — top coaching for SSC CGL, IBPS PO, Banking, State & Govt exams. Expert faculty, small batches, proven results."
        canonical="https://thesamarthacademy.in"
        keywords="best coaching institute in Amritsar, top coaching institute in Amritsar, government exam coaching in Amritsar, SSC coaching Amritsar, banking coaching institute in Amritsar, govt job coaching near me, coaching institute near GNDU Amritsar, coaching classes in Amritsar near me, affordable coaching in Amritsar, best institute for govt jobs Punjab, coaching institute in Amritsar with fees, SSC CGL coaching Amritsar, IBPS PO coaching Punjab, banking exam coaching, government exam coaching India"
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

      <h1 className="text-3xl md:text-4xl font-black text-center text-gray-900 py-6 px-4">
        Samarth Academy — Top Coaching for SSC, Banking &amp; Government Exams in Amritsar
      </h1>

      <section aria-label="Quick navigation" className="pb-4 px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { to: '/courses', label: 'Browse Courses' },
            { to: '/current-affairs', label: 'Current Affairs' },
            { to: '/notifications', label: 'Exam Notifications' },
            { to: '/about', label: 'About Us' },
            { to: '/book-demo', label: 'Book a Demo' },
            { to: '/Selections', label: 'Our Selections' },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-brand-red hover:text-white hover:border-brand-red transition">
              {label}
            </Link>
          ))}
        </div>
      </section>

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