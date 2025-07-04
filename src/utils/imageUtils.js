
/**
 * @fileoverview Image utilities for optimization, preview, and compression.
 * All options and defaults are immutable for maintainability.
 */

const DEFAULTS = Object.freeze({
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1080,
  outputFormat: 'image/jpeg',
});

/**
 * Optimizes an image file by resizing and compressing it.
 * @param {File} file - The image file to optimize.
 * @param {number} [quality=0.8] - JPEG quality (0-1).
 * @param {number} [maxWidth=1920] - Max width in px.
 * @param {number} [maxHeight=1080] - Max height in px.
 * @returns {Promise<Blob>} - Resolves to optimized image blob.
 */
export function optimizeImage(file, quality = DEFAULTS.quality, maxWidth = DEFAULTS.maxWidth, maxHeight = DEFAULTS.maxHeight) {
  return compressImage(file, { quality, maxWidth, maxHeight, outputFormat: DEFAULTS.outputFormat });
}

/**
 * Generates a data URL preview for an image file.
 * @param {File} file
 * @returns {Promise<string>} - Resolves to data URL.
 */
export function generateImagePreview(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses and resizes an image file.
 * @param {File} file - The image file to compress.
 * @param {Object} [options]
 * @param {number} [options.quality=0.8] - Compression quality (0-1).
 * @param {number} [options.maxWidth=1920] - Max width in px.
 * @param {number} [options.maxHeight=1080] - Max height in px.
 * @param {string} [options.outputFormat='image/jpeg'] - Output MIME type.
 * @returns {Promise<Blob>} - Resolves to compressed image blob.
 */
export function compressImage(file, options = {}) {
  const {
    quality = DEFAULTS.quality,
    maxWidth = DEFAULTS.maxWidth,
    maxHeight = DEFAULTS.maxHeight,
    outputFormat = DEFAULTS.outputFormat,
  } = options;
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        let { width, height } = img;
        // Calculate new dimensions while preserving aspect ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Image compression failed.'));
          }
        }, outputFormat, quality);
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(new Error('Image processing error.'));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image.'));
    };
    img.src = url;
  });
}
