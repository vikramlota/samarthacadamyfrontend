import React from 'react';

export default function BlogPostContent({ post }) {
  return (
    <section className="py-12 md:py-16">
      <div className="container-custom max-w-3xl">
        <div
          className={[
            'prose prose-lg max-w-none',
            'prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900',
            'prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4',
            'prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3',
            'prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2',
            'prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4',
            'prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline prose-a:font-medium',
            'prose-strong:text-gray-900 prose-strong:font-semibold',
            'prose-ul:text-gray-700 prose-ol:text-gray-700',
            'prose-li:my-1.5',
            'prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic',
            'prose-code:text-red-600 prose-code:bg-red-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
            'prose-pre:bg-gray-900 prose-pre:text-gray-100',
            'prose-img:rounded-card prose-img:shadow-soft',
            'prose-hr:border-gray-200',
          ].join(' ')}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
