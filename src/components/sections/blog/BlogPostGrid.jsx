import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/motion';
import { Skeleton } from '@/components/ui';
import BlogPostCard from './BlogPostCard';

const COL_CLASSES = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export default function BlogPostGrid({ posts = [], isLoading = false, columns = 3 }) {
  const colClass = COL_CLASSES[columns] || COL_CLASSES[3];

  if (isLoading) {
    return (
      <div className={`grid ${colClass} gap-6`}>
        {Array.from({ length: columns * 2 }).map((_, idx) => (
          <Skeleton key={idx} className="h-80 rounded-card" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      className={`grid ${colClass} gap-6`}
    >
      {posts.map(post => (
        <motion.div key={post._id || post.slug} variants={staggerItem} className="h-full">
          <BlogPostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
