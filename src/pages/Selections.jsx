import React from 'react';
import Selections from '../components/Selections';
import { SEOHead } from '../utils/seoHelpers';

const SelectionsPage = () => {
  return (
    <>
      <SEOHead
        title="Student Selections & Success Stories | Samarth Academy"
        description="See our students who cleared SSC CGL, IBPS PO, State Exams and Defense exams. Samarth Academy's proven track record of results in Amritsar."
        canonical="https://thesamarthacademy.in/Selections"
        keywords="Samarth Academy results, SSC selections Amritsar, IBPS PO selections Punjab, government exam success stories, best coaching for Punjab Police Constable 2026, Punjab police exam preparation institute, Punjab govt exam coaching, best institute for govt jobs Punjab"
      />
      <Selections />
    </>
  );
};

export default SelectionsPage;
