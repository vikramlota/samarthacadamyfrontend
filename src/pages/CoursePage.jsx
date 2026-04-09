import React from 'react';
import CoursesPage from '../components/CoursePage';
import { SEOHead } from '../utils/seoHelpers';

const CoursePage = () => {
  return (
    <>
      <SEOHead
        title="Courses | Samarth Academy — SSC, Banking & Defense Prep"
        description="Explore all coaching courses at Samarth Academy, Amritsar. SSC CGL, IBPS PO, State exams, Defense — expert faculty and small batches for focused learning."
        canonical="https://thesamarthacademy.in/courses"
        keywords="SSC CGL course, IBPS PO coaching, banking exam Amritsar, defense exam preparation, state exam coaching Punjab"
      />
      <CoursesPage />
    </>
  );
};

export default CoursePage;
