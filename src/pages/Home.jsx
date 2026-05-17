import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  NotificationStrip,
  HeroSection,
} from '@/components/sections';

const StatsBar            = lazy(() => import('@/components/sections/StatsBar'));
const CoursesGrid         = lazy(() => import('@/components/sections/CoursesGrid'));
const WhyChooseUs         = lazy(() => import('@/components/sections/WhyChooseUs'));
const FoundersStory       = lazy(() => import('@/components/sections/FoundersStory'));
const MidPageLeadForm     = lazy(() => import('@/components/sections/MidPageLeadForm'));
const RecentSelections    = lazy(() => import('@/components/sections/RecentSelections'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const ExamSpotlight       = lazy(() => import('@/components/sections/ExamSpotlight'));
const BlogPreview         = lazy(() => import('@/components/sections/BlogPreview'));
const FaqSection          = lazy(() => import('@/components/sections/FaqSection'));
const FinalCTA            = lazy(() => import('@/components/sections/FinalCTA'));

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Samarth Academy — Government Exam Coaching in Amritsar</title>
        <meta
          name="description"
          content="Officer-led coaching for IBPS, SBI, SSC, Punjab Police & more. Ex-Bank Manager + Ex-GST Inspector faculty. Limited batches of 30. 800+ selections since 2006."
        />
        <meta property="og:title"       content="Samarth Academy — Government Exam Coaching in Amritsar" />
        <meta property="og:description" content="Taught by ex-government officers. Limited batches, individual attention, 800+ selections." />
        <meta property="og:image"       content="https://thesamarthacademy.in/og.jpg" />
        <meta property="og:url"         content="https://thesamarthacademy.in/" />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Samarth Academy — Government Exam Coaching in Amritsar" />
        <meta name="twitter:description" content="Taught by ex-government officers. Limited batches, individual attention, 800+ selections." />
        <meta name="twitter:image"       content="https://thesamarthacademy.in/og.jpg" />

        <link rel="canonical" href="https://thesamarthacademy.in/" />
      </Helmet>

      {/* Notification strip — hides itself when API returns empty */}
      <NotificationStrip />

      {/* Hero + lead form (above fold) */}
      <HeroSection />

      {/* Below the fold sections lazy loaded */}
      <Suspense fallback={<div className="h-32 animate-pulse bg-brand-bg opacity-20" />}>
        {/* Trust signal: key stats on dark bg */}
        <StatsBar />

        {/* Exam spotlight — hides itself when API returns null */}
        <ExamSpotlight />

        {/* Course catalogue */}
        <CoursesGrid />

        {/* Differentiator: why not mass coaching */}
        <WhyChooseUs />

        {/* Founders story — THE conversion differentiator */}
        <FoundersStory />

        {/* Mid-page conversion form (red gradient) */}
        <MidPageLeadForm />

        {/* Hall of Fame — hides itself when API returns empty */}
        <RecentSelections />

        {/* Social proof — hides itself when API returns empty */}
        <TestimonialsSection />

        {/* Blog — feature-flagged (VITE_FF_BLOG=true to enable) */}
        <BlogPreview />

        {/* FAQ */}
        <FaqSection />

        {/* Final CTA with contact details */}
        <FinalCTA />
      </Suspense>
    </>
  );
}

