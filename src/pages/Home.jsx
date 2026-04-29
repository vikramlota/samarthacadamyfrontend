import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  NotificationStrip,
  HeroSection,
  StatsBar,
  CoursesGrid,
  WhyChooseUs,
  FoundersStory,
  MidPageLeadForm,
  RecentSelections,
  TestimonialsSection,
  ExamSpotlight,
  FaqSection,
  FinalCTA,
} from '@/components/sections';

// BlogPreview is feature-flagged — lazy-load so it tree-shakes when disabled
const BlogPreview = lazy(() => import('@/components/sections/BlogPreview'));

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Samarth Academy — Government Exam Coaching in Amritsar</title>
        <meta
          name="description"
          content="Officer-led coaching for IBPS, SBI, SSC, Punjab Police & more. Ex-Bank Manager + Ex-GST Inspector faculty. Limited batches of 30. 800+ selections since 2006."
        />
        <meta property="og:title" content="Samarth Academy — Government Exam Coaching in Amritsar" />
        <meta
          property="og:description"
          content="Taught by ex-government officers. Limited batches, individual attention, 800+ selections."
        />
        <link rel="canonical" href="https://samarthacademy.in/" />
      </Helmet>

      {/* Notification strip — hides itself when API returns empty */}
      <NotificationStrip />

      {/* Hero + lead form (above fold) */}
      <HeroSection />

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
      <Suspense fallback={null}>
        <BlogPreview />
      </Suspense>

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA with contact details */}
      <FinalCTA />
    </>
  );
}
