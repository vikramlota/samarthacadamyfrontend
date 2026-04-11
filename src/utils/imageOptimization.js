/**
 * Image Optimization Utility
 * Converts regular Cloudinary URLs to optimized versions with:
 * - Automatic format (f_auto)
 * - Quality adjustment (q_auto)
 * - Responsive width
 * - Lazy loading
 */

const CLOUDINARY_BASE = 'https://res.cloudinary.com';

/**
 * Extract Cloudinary public ID from full URL
 * Handles different URL formats
 */
const extractCloudinaryId = (url) => {
  if (!url) return null;
  
  // Already optimized - extract the original upload path
  if (url.includes('/image/upload/')) {
    const match = url.match(/\/upload\/(?:[^/]*\/)*(.+?)(?:\.\w+)?$/);
    return match ? match[1] : null;
  }
  
  // Regular cloudinary URL
  if (url.includes(CLOUDINARY_BASE)) {
    const match = url.match(/\/image\/upload\/(.+?)(?:\?\S*)?$/);
    return match ? match[1] : null;
  }
  
  return null;
};

/**
 * Generate optimized Cloudinary URL with transformations
 * @param {string} url - Original image URL or Cloudinary public ID
 * @param {object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getOptimizedImageUrl = (
  url,
  {
    width = 800,
    quality = 'auto',
    format = 'auto',
    responsive = false,
    crop = 'fill',
    gravity = 'auto'
  } = {}
) => {
  if (!url) return null;

  let cloudinaryId = url;

  // If it's an HTTP(S) URL, try to extract the Cloudinary ID
  if (url.startsWith('http')) {
    cloudinaryId = extractCloudinaryId(url);
  }

  if (!cloudinaryId) {
    console.warn('Could not extract Cloudinary ID from URL:', url);
    return url; // Fallback to original URL
  }

  // Build transformation parameters
  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
    `g_${gravity}`
  ];

  // Add responsive sizes if needed
  if (responsive) {
    transformations.push('dpr_auto');
  }

  const transformationString = transformations.join(',');
  
  return `${CLOUDINARY_BASE}/thesamarthacademy/image/upload/${transformationString}/${cloudinaryId}`;
};

/**
 * Get multiple responsive sizes for srcset
 * @param {string} url - Original image URL
 * @param {array} sizes - Array of widths to generate
 * @returns {string} srcset string for img tag
 */
export const getResponsiveSrcSet = (url, sizes = [400, 800, 1200, 1600]) => {
  return sizes
    .map(width => `${getOptimizedImageUrl(url, { width })} ${width}w`)
    .join(', ');
};

/**
 * React component for optimized images with lazy loading
 */
import React from 'react';

export const OptimizedImage = React.memo(({
  src,
  alt,
  width = 800,
  height,
  responsive = true,
  className = '',
  sizes,
  priority = false,
  ...props
}) => {
  const optimizedSrc = getOptimizedImageUrl(src, { width });
  
  // Generate srcset for responsive images
  const srcSet = responsive 
    ? getResponsiveSrcSet(src, [400, 800, 1200, 1600])
    : optimizedSrc;

  // Calculate aspect ratio if height is provided to prevent layout shift
  const aspectRatioStyle = height ? { aspectRatio: `${width}/${height}` } : {};

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw'}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      width={width}
      height={height}
      className={`${className}`}
      style={aspectRatioStyle}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

/**
 * Hook for getting optimized image URLs
 */
export const useOptimizedImage = (url, options = {}) => {
  return React.useMemo(() => {
    return getOptimizedImageUrl(url, options);
  }, [url, options]);
};

/**
 * Generate picture element with multiple sources for progressive enhancement
 */
export const PictureImage = React.memo(({
  src,
  alt,
  webpWidth = 800,
  jpgWidth = 1000,
  height,
  className = '',
  priority = false
}) => {
  const webpSrc = getOptimizedImageUrl(src, { 
    width: webpWidth, 
    format: 'auto'
  });
  
  const jpgSrc = getOptimizedImageUrl(src, { 
    width: jpgWidth, 
    format: 'auto'
  });

  const aspectRatioStyle = height ? { aspectRatio: `${jpgWidth}/${height}` } : {};

  return (
    <picture style={aspectRatioStyle}>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={jpgSrc} type="image/jpeg" />
      <img
        src={jpgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={jpgWidth}
        height={height}
        className={className}
      />
    </picture>
  );
});

PictureImage.displayName = 'PictureImage';

export default {
  getOptimizedImageUrl,
  getResponsiveSrcSet,
  OptimizedImage,
  PictureImage,
  useOptimizedImage
};
