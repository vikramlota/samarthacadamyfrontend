import React from 'react';
import InquirySection from '../components/sections/InquirySection';
import { SEOHead } from '../utils/seoHelpers';

const InquiryPage = () => {
  return (
    <>
      <SEOHead
        title="Inquiry & Support | Samarth Academy Amritsar"
        description="Submit your queries about courses, fee structure, batch timings or scholarships at Samarth Academy. Our academic counselors will get back to you shortly."
        canonical="https://thesamarthacademy.in/inquiry"
        keywords="Samarth Academy inquiry, contact coaching institute Amritsar, course query, fee structure, batch timings"
      />
      <InquirySection />
    </>
  );
};

export default InquiryPage;
