/**
 * errorHandler.js - Error handling and validation utilities for Futur app.
 * @module utils/errorHandler
 */

/**
 * Wraps an async function and logs errors. 
 * @returns {Function}
 */
/**
 * Generic error reporting utility. Replace with Sentry, LogRocket, etc.
 * @param {Error} error
 * @param {string} [context]
 * @param {Function} [reporter] 
 */
export function reportError(error, context = '', reporter) {
  if (typeof reporter === 'function') {
    reporter(error, context);
  }
}

/**
 * Wraps an async function and reports errors. Optionally integrate with error reporting.
 * @param {Function} fn
 * @param {Function} [reporter]
 * @returns {Function}
 */
export function handleAsyncError(fn, reporter) {
  return (...args) => {
    Promise.resolve(fn(...args)).catch((error) => {
      reportError(error, 'Async error', reporter);
    });
  };
}

/**
 * Normalizes API/network errors for UI display.
 * @param {any} error
 * @returns {{message: string, status: number}}
 */
const ERROR_MESSAGES = Object.freeze({
  server: 'Server error occurred',
  network: 'Network error. Please check your connection.',
  unexpected: 'An unexpected error occurred',
  invalidFile: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.',
  fileTooLarge: 'File too large. Maximum size is 5MB.'
});

/**
 * Normalizes API/network errors for UI display.
 * @param {any} error
 * @returns {{message: string, status: number}}
 */
export function handleApiError(error) {
  if (error && error.response) {
    return {
      message: error.response.data?.message || ERROR_MESSAGES.server,
      status: error.response.status,
    };
  } else if (error && error.request) {
    return {
      message: ERROR_MESSAGES.network,
      status: 0,
    };
  } else {
    return {
      message: error?.message || ERROR_MESSAGES.unexpected,
      status: -1,
    };
  }
}

/**
 * Validates file type and size for uploads.
 * @param {File} file
 * @param {number} [maxSize=5*1024*1024]
 * @returns {boolean}
 * @throws {Error} if invalid
 */
const ALLOWED_FILE_TYPES = Object.freeze([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

/**
 * Validates file type and size for uploads.
 * @param {File} file
 * @param {number} [maxSize=5*1024*1024]
 * @returns {boolean}
 * @throws {Error} if invalid
 */
export function validateFileUpload(file, maxSize = 5 * 1024 * 1024) {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error(ERROR_MESSAGES.invalidFile);
  }
  if (file.size > maxSize) {
    throw new Error(ERROR_MESSAGES.fileTooLarge);
  }
  return true;
}
