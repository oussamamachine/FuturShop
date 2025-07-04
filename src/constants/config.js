/**
 * Global app configuration constants for API, UI, and business logic.
 * @module constants/config
 */

export const API_ENDPOINTS = Object.freeze({
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  USERS: '/api/users',
  UPLOAD: '/api/upload',
});

export const FILE_UPLOAD = Object.freeze({
  MAX_SIZE: 5 * 1024 * 1024, 
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  QUALITY: 0.8,
});

export const ANIMATION_DURATION = Object.freeze({
  SHORT: 200,
  MEDIUM: 300,
  LONG: 500,
});

export const BREAKPOINTS = Object.freeze({
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
});

export const PRODUCT_CATEGORIES = Object.freeze({
  JACKETS: 'jackets',
  ACCESSORIES: 'accessories',
  TECH: 'tech',
});

export const ORDER_STATUS = Object.freeze({
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
});

export const CURRENCIES = Object.freeze({
  USD: { symbol: '$', code: 'USD' },
  EUR: { symbol: '€', code: 'EUR' },
  GBP: { symbol: '£', code: 'GBP' },
});
