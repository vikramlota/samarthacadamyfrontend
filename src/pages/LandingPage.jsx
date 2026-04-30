import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useApiData } from '@/hooks/useApiData';
import { getCourseSchema, getFAQSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import {
  LandingHero,
  LandingQuickInfo,
  LandingOverview,
  LandingWhyChoose,
  LandingCourseDetails,
  LandingSyllabus,
  LandingFaculty,
  LandingMidCta,
  LandingSelections,
  LandingTestimonials,
  LandingBatches,
  LandingFaq,
  LandingLocation,
  LandingFinalCta,
  LandingPageSkeleton,
  LandingNotFound,
} from '@/components/sections/landing';
import { StickyEnquiryWidget, StickyPhoneBar } from '@/components/conversion';

export default function LandingPage() {
  const { slug } = useParams();
  const { data: page, isLoading, error } = useApiData(`/landing-pages/${slug}`);

  if (isLoading) return <LandingPageSkeleton />;
  if (error || !page) return <LandingNotFound slug={slug} />;

  const faqSchema    = getFAQSchema(page.faqs);
  const courseSchema = getCourseSchema(page);

  return (
    <>
      <Helmet>
        <title>{page.seo?.title}</title>
        <meta name="description" content={page.seo?.description} />
        {page.seo?.keywords && <meta name="keywords" content={page.seo.keywords} />}
        {page.seo?.canonical && <link rel="canonical" href={page.seo.canonical} />}

        <meta property="og:title"       content={page.seo?.title} />
        <meta property="og:description" content={page.seo?.description} />
        <meta property="og:url"         content={page.seo?.canonical} />
        <meta property="og:type"        content="website" />
        {page.seo?.ogImage && <meta property="og:image" content={page.seo.ogImage} />}

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={page.seo?.title} />
        <meta name="twitter:description" content={page.seo?.description} />

        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <Breadcrumbs items={[
        { name: 'Courses', href: '/courses' },
        { name: page.examShortName || page.slug },
      ]} />

      <StickyPhoneBar />

      <LandingHero
        hero={page.hero}
        courseSlug={page.slug}
        examShortName={page.examShortName}
      />
      <LandingQuickInfo info={page.quickInfo} />
      <LandingOverview
        overview={page.overview}
        examShortName={page.examShortName}
      />
      <LandingWhyChoose
        features={page.whyChoose}
        examShortName={page.examShortName}
      />
      <LandingCourseDetails
        details={page.courseDetails}
        examShortName={page.examShortName}
        courseSlug={page.slug}
      />
      <LandingSyllabus syllabus={page.syllabus} />
      <LandingFaculty
        courseSlug={page.slug}
        examShortName={page.examShortName}
      />
      <LandingMidCta
        midCta={page.midCta}
        courseSlug={page.slug}
      />
      <LandingSelections
        courseSlug={page.slug}
        examShortName={page.examShortName}
      />
      <LandingTestimonials
        courseSlug={page.slug}
        examShortName={page.examShortName}
      />
      <LandingBatches
        courseSlug={page.slug}
        examShortName={page.examShortName}
      />
      <LandingFaq
        faqs={page.faqs}
        examShortName={page.examShortName}
      />
      <LandingLocation />
      <LandingFinalCta
        finalCta={page.finalCta}
        courseSlug={page.slug}
      />

      <StickyEnquiryWidget
        courseSlug={page.slug}
        examShortName={page.examShortName}
      />
    </>
  );
}
