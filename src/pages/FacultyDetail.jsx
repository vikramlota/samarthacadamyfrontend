import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useApiData } from '@/hooks/useApiData';
import { Skeleton, Button, Breadcrumbs } from '@/components/ui';
import { FacultyDetailHero, FacultyAchievements } from '@/components/sections/faculty';
import { getPersonSchema } from '@/lib/seo';

function FacultyDetailSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom grid md:grid-cols-[160px_1fr] gap-8">
          <Skeleton className="h-40 w-40 rounded-2xl" />
          <div className="space-y-3 pt-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-3/4 max-w-lg" />
          </div>
        </div>
      </div>
      <div className="py-16 bg-brand-bg">
        <div className="container-custom grid sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FacultyDetailPage() {
  const { idOrSlug } = useParams();
  const { data: member, isLoading, error } = useApiData(
    `/faculty/${idOrSlug}`,
    { fallback: null, enabled: Boolean(idOrSlug) }
  );

  if (isLoading) return <FacultyDetailSkeleton />;

  if (error || !member) {
    return (
      <div className="py-24 text-center space-y-4">
        <p className="text-gray-500">Faculty member not found.</p>
        <Button to="/faculty" variant="outline">Back to Faculty</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{member.name} — Samarth Academy Faculty</title>
        <meta
          name="description"
          content={`${member.name} — ${member.credential}. ${member.bio || 'Faculty at Samarth Academy, Amritsar.'}`}
        />
        <script type="application/ld+json">{JSON.stringify(getPersonSchema(member))}</script>
      </Helmet>

      <Breadcrumbs items={[
        { name: 'Faculty', href: '/faculty' },
        { name: member.name },
      ]} />
      <FacultyDetailHero    member={member} />
      <FacultyAchievements  member={member} />
    </>
  );
}
