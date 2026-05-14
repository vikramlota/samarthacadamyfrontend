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
  const { data: pageResp, isLoading } = useApiData('/about', { fallback: null });
  const { data: mediaResp } = useApiData('/media-coverage', { fallback: null });

  if (isLoading) return <AboutPageSkeleton />;

  const aboutData = pageResp?.data || pageResp || {};
  const mediaData = mediaResp?.data || mediaResp || [];

  return (
    <>
      <Helmet>
        <title>{aboutData.seo?.title || 'About Samarth Academy | Officer-Led Coaching in Amritsar'}</title>
        <meta name="description" content={aboutData.seo?.description || 'Meet the founders of Samarth Academy.'} />
        {aboutData.seo?.canonical && <link rel="canonical" href={aboutData.seo.canonical} />}
        
        <meta property="og:title"       content={aboutData.seo?.title || 'About Samarth Academy | Officer-Led Coaching in Amritsar'} />
        <meta property="og:description" content={aboutData.seo?.description || 'Meet the founders of Samarth Academy.'} />
        <meta property="og:image"       content={aboutData.seo?.ogImage || 'https://thesamarthacademy.in/og.jpg'} />
      </Helmet>

      <Breadcrumbs items={[{ name: 'About' }]} />
      
      {aboutData && (
        <>
          <AboutHero       hero={aboutData.hero} />
          <FounderStory    story={aboutData.founderStory} />
          <FoundersGrid    founders={aboutData.founders} />
          <AboutStats      stats={aboutData.stats} />
          <MissionVisionValues mission={aboutData.mission} vision={aboutData.vision} values={aboutData.values} />
          <JourneyTimeline journey={aboutData.journey} />
          <AwardsRecognition   awards={aboutData.awards} />
          <InfrastructureGallery infrastructure={aboutData.infrastructure} />
          <MediaCoverage       media={mediaData} />
          <FounderVideo        video={aboutData.video} />
          <AboutCta            cta={aboutData.cta} />
        </>
      )}
    </>
  );
}
