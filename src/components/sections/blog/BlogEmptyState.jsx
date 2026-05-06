import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function BlogEmptyState({ search, onClear }) {
  return (
    <div className="py-16 max-w-md mx-auto text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <FaSearch className="text-3xl text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="font-display text-2xl font-bold text-gray-900">No posts found</h3>
      {search ? (
        <p className="text-gray-600 mt-3">
          We couldn&rsquo;t find posts matching &ldquo;
          <span className="font-medium">{search}</span>
          &rdquo;. Try a different search term.
        </p>
      ) : (
        <p className="text-gray-600 mt-3">
          Posts in this category are coming soon. Check back later or browse all posts.
        </p>
      )}
      {onClear && (
        <button
          onClick={onClear}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-colors"
        >
          <FaTimes aria-hidden="true" />
          Clear Filters
        </button>
      )}
    </div>
  );
}
