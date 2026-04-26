import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { SectionHeader, Badge, Button } from '@/components/ui';
import { BLOG_POSTS } from '@/data/homeStaticContent';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';

function BlogCard({ post }) {
  return (
    <Link
      to={post.slug}
      className="group flex flex-col h-full bg-white rounded-card shadow-soft border border-gray-100 p-6 transition-all duration-base hover:-translate-y-0.5 hover:shadow-card"
      aria-label={post.title}
    >
      <div className="flex items-center justify-between mb-4">
        <Badge variant="gray" size="sm">{post.category}</Badge>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <FaClock aria-hidden="true" />
          {post.readTime}
        </span>
      </div>

      <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-red-500 transition-colors duration-base">
        {post.title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed flex-1">{post.excerpt}</p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">{post.date}</span>
        <span className="flex items-center gap-1 text-sm font-medium text-red-500 group-hover:gap-2 transition-all duration-base">
          Read more <FaArrowRight className="text-xs" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPreview() {
  const enabled = useFeatureFlag('blog');
  if (!enabled) return null;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Resources"
          title="Exam Tips & Study Guides"
          description="Practical advice from people who've cleared the exams you're preparing for."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BLOG_POSTS.map(post => (
            <motion.div key={post.id} variants={staggerItem}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Button to="/current-affairs" variant="outline" size="lg" iconRight={FaArrowRight}>
            Read All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
