/**
 * Cloudinary image optimization helpers
 * Automatically serves WebP/AVIF, resizes, and crops images via URL params.
 * No extra dependencies needed — Cloudinary handles everything server-side.
 */

/**
 * Returns an optimized Cloudinary URL with auto format (WebP/AVIF) and quality.
 * @param {string} url    - Original Cloudinary URL
 * @param {number} width  - Max display width in px
 */
export const getCloudinaryUrl = (url, width = 800) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

/**
 * Returns a Cloudinary URL cropped to exact dimensions (good for cards).
 * @param {string} url
 * @param {number} width
 * @param {number} height
 */
export const getCroppedUrl = (url, width, height) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`);
};

/**
 * Returns a low-quality blur placeholder URL for lazy loading.
 * @param {string} url
 */
export const getBlurPlaceholder = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/w_20,q_10,e_blur:200/');
};
