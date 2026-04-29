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
      </Helmet>

      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <VisitInfo />
      <WhatsAppQuickAction />
    </>
  );
}
