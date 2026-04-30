import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getOrganizationSchema, getWebSiteSchema, getLocalBusinessSchema } from '@/lib/seo';

// Injected once at App level — appears on every page.
export default function RootSchemas() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getWebSiteSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(getLocalBusinessSchema())}</script>
    </Helmet>
  );
}
