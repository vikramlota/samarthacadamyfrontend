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

        <meta property="og:title"       content="Faculty | Samarth Academy — Officer-Led Teaching" />
        <meta property="og:description" content="Meet Samarth Academy's faculty — ex-government officers and subject specialists who have personally cleared the exams they teach." />
        <meta property="og:image"       content="https://thesamarthacademy.in/og.jpg" />
        <meta property="og:url"         content="https://thesamarthacademy.in/faculty" />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Faculty | Samarth Academy — Officer-Led Teaching" />
        <meta name="twitter:description" content="Meet Samarth Academy's faculty — ex-government officers and subject specialists who have personally cleared the exams they teach." />
        <meta name="twitter:image"       content="https://thesamarthacademy.in/og.jpg" />
      </Helmet>

      <Breadcrumbs items={[{ name: 'Faculty' }]} />
      <FacultyHero />
      <FacultyGrid />
    </>
  );
}
