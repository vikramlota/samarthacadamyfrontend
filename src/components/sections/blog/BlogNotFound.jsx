import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBookOpen, FaArrowLeft } from 'react-icons/fa';
import { Button } from '@/components/ui';

export default function BlogNotFound() {
  return (
    <>
      <Helmet>
        <title>Article Not Found | Samarth Academy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-24">
        <div className="container-custom max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
            <FaBookOpen className="text-3xl text-red-500" aria-hidden="true" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Article Not Found</h1>
          <p className="text-gray-600 mt-3">
            The article you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
          <Button variant="primary" icon={FaArrowLeft} to="/blog" className="mt-6">
            Browse All Articles
          </Button>
        </div>
      </section>
    </>
  );
}
