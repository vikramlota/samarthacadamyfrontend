import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import { Breadcrumbs } from '@/components/ui';
import {
  AboutHero,
  FounderStory,
  FoundersGrid,
  AboutStats,
  MissionVisionValues,
  JourneyTimeline,
  AwardsRecognition,
  InfrastructureGallery,
  MediaCoverage,
  FounderVideo,
  AboutCta,
  AboutPageSkeleton,
} from '@/components/sections/about';

export default function AboutPage() {
  const { data: page, isLoading } = useApiData('/about', { fallback: null });

  if (isLoading) return <AboutPageSkeleton />;

  return (
    <>
      <Helmet>
        <title>About Samarth Academy | Officer-Led Coaching in Amritsar</title>
        <meta
          name="description"
          content="Meet the founders of Samarth Academy — ex-Bank Manager and ex-GST Inspector who left government service to teach what actually works in competitive exams."
        />
        <link rel="canonical" href="https://thesamarthacademy.in/about" />

        <meta property="og:title"       content="About Samarth Academy | Officer-Led Coaching in Amritsar" />
        <meta property="og:description" content="Meet the founders of Samarth Academy — ex-Bank Manager and ex-GST Inspector who left government service to teach what actually works in competitive exams." />
        <meta property="og:image"       content="https://thesamarthacademy.in/og.jpg" />
        <meta property="og:url"         content="https://thesamarthacademy.in/about" />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="About Samarth Academy | Officer-Led Coaching in Amritsar" />
        <meta name="twitter:description" content="Meet the founders of Samarth Academy — ex-Bank Manager and ex-GST Inspector who left government service to teach what actually works in competitive exams." />
        <meta name="twitter:image"       content="https://thesamarthacademy.in/og.jpg" />
      </Helmet>

      <Breadcrumbs items={[{ name: 'About' }]} />
      <AboutHero       hero={page?.hero} />
      <FounderStory    story={page?.story} />
      <FoundersGrid    founders={page?.founders} />
      <AboutStats />
      <MissionVisionValues mvv={page?.mvv} />
      <JourneyTimeline milestones={page?.milestones} />
      <AwardsRecognition   awards={page?.awards} />
      <InfrastructureGallery gallery={page?.gallery} />
      <MediaCoverage       media={page?.media} />
      <FounderVideo        video={page?.video} />
      <AboutCta            cta={page?.cta} />
    </>
  );
}
