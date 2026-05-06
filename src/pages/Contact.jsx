import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  VisitInfo,
  WhatsAppQuickAction,
} from '@/components/sections/contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Samarth Academy | Call, WhatsApp or Visit Us in Amritsar</title>
        <meta
          name="description"
          content="Contact Samarth Academy in Amritsar. Call +91 99889 49969, WhatsApp us, or fill the form for a free demo class booking or course enquiry."
        />
        <link rel="canonical" href="https://thesamarthacademy.in/contact" />

        <meta property="og:title"       content="Contact Samarth Academy | Call, WhatsApp or Visit Us in Amritsar" />
        <meta property="og:description" content="Contact Samarth Academy in Amritsar. Call +91 99889 49969, WhatsApp us, or fill the form for a free demo class booking or course enquiry." />
        <meta property="og:image"       content="https://thesamarthacademy.in/og.jpg" />
        <meta property="og:url"         content="https://thesamarthacademy.in/contact" />
        <meta property="og:type"        content="website" />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Contact Samarth Academy | Call, WhatsApp or Visit Us in Amritsar" />
        <meta name="twitter:description" content="Contact Samarth Academy in Amritsar. Call +91 99889 49969, WhatsApp us, or fill the form for a free demo class booking or course enquiry." />
        <meta name="twitter:image"       content="https://thesamarthacademy.in/og.jpg" />
      </Helmet>

      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <VisitInfo />
      <WhatsAppQuickAction />
    </>
  );
}
