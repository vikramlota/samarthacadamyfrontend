import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FacultyHero, FacultyGrid } from '@/components/sections/faculty';
import { Breadcrumbs } from '@/components/ui';

export default function FacultyPage() {
  return (
    <>
      <Helmet>
        <title>Faculty | Samarth Academy — Officer-Led Teaching</title>
        <meta
          name="description"
          content="Meet Samarth Academy's faculty — ex-government officers and subject specialists who have personally cleared the exams they teach."
        />
        <link rel="canonical" href="https://thesamarthacademy.in/faculty" />
      </Helmet>

      <Breadcrumbs items={[{ name: 'Faculty' }]} />
      <FacultyHero />
      <FacultyGrid />
    </>
  );
}
