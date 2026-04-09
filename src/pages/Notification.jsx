import React from 'react';
import { useParams } from 'react-router-dom';
import Notification from '../components/Notification';
import { SEOHead } from '../utils/seoHelpers';

const NotificationPage = () => {
  return (
    <>
      <SEOHead
        title="Exam Notification Details | Samarth Academy"
        description="Full details of this government exam notification. Eligibility, important dates, syllabus and how to apply — explained by Samarth Academy experts."
        canonical="https://thesamarthacademy.in/notifications"
        keywords="exam notification details, SSC notification, banking notification, government recruitment"
      />
      <Notification />
    </>
  );
};

export default NotificationPage;
