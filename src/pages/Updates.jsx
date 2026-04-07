import React from 'react';
import Updates from '../components/Updates';
import { Helmet } from 'react-helmet';
const UpdatesPage = () => {
  return (
<>

    <Helmet>
      <title>Latest Govt Exam Notifications & Updates | Samarth Academy</title>
      <meta name="description" content="Stay updated with the latest notifications, admit cards, and exam dates for SSC, Banking, Punjab Police, and State exams." />
    </Helmet>
 < Updates/>  
   
</>
  )}
export default UpdatesPage;