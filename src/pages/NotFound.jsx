import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../utils/seoHelpers';

const NotFound = () => (
  <>
    <SEOHead
      title="Page Not Found | Samarth Academy"
      description="This page doesn't exist. Browse our courses or return to the homepage."
      canonical="https://thesamarthacademy.in/404"
    />
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
      <div className="text-9xl font-black text-gray-100 select-none mb-4">404</div>
      <h1 className="text-3xl font-black text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/"
          className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition">
          Go to Homepage
        </Link>
        <Link to="/courses"
          className="border border-brand-red text-brand-red px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition">
          Browse Courses
        </Link>
        <Link to="/book-demo"
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
          Book a Demo
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
