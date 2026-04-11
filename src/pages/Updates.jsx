import React from 'react';
import Updates from '../components/Updates';
import { SEOHead } from '../utils/seoHelpers';

const UpdatesPage = () => {
  return (
    <>
      <SEOHead
        title="Exam Notifications & Updates | Samarth Academy"
        description="Stay up to date with the latest government exam notifications, recruitment alerts and important updates curated by Samarth Academy for SSC, Banking and State exams."
        canonical="https://thesamarthacademy.in/notifications"
        keywords="exam notifications 2024, SSC CGL notification, IBPS PO notification, government job alerts Punjab, Punjab police constable coaching, Punjab police exam preparation institute, PSSSB coaching in Amritsar, railway coaching institute near me"
      />
      <Updates />
    </>
  );
};

export default UpdatesPage;
