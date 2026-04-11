import React from 'react';
import About from '../components/About';
import { SEOHead } from '../utils/seoHelpers';

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="About Samarth Academy | Expert Coaches in Amritsar"
        description="Meet the founders of Samarth Academy — ex-bank officers and government officials training aspirants for SSC, Banking & State exams in Amritsar, Punjab."
        canonical="https://thesamarthacademy.in/about"
        keywords="best coaching institute in Amritsar, top coaching institute in Amritsar, coaching institute near GNDU Amritsar, best institute near GNDU Amritsar, Samarth Academy founders, SSC coaching Amritsar, banking exam coaching Punjab, Sidharth Khanna, Deepika Dhir, affordable govt job coaching in Amritsar"
      />
      <About />
    </>
  );
};

export default AboutPage;
