import React from 'react';
import BookDemo from '../components/BookDemo';
import { SEOHead } from '../utils/seoHelpers';

const BookDemoPage = () => {
  return (
    <>
      <SEOHead
        title="Book a Free Demo Class | Samarth Academy Amritsar"
        description="Register for a free demo class at Samarth Academy, Amritsar. Experience our teaching methodology before enrolling in SSC, Banking or State exam courses."
        canonical="https://thesamarthacademy.in/book-demo"
        keywords="free demo class Amritsar, SSC coaching demo, banking exam demo class, Samarth Academy registration, coaching institute with mock test in Amritsar, affordable coaching in Amritsar, govt job coaching near me, SSC coaching near me"
      />
      <BookDemo />
    </>
  );
};

export default BookDemoPage;
