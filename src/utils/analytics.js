/**
 * analytics.js - Web Vitals and custom analytics for Futur app.
 * @module utils/analytics
 */
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = process.env.REACT_APP_VITALS_URL;

function sendToAnalytics(metric) {
  if (!vitalsUrl) return;
  const body = JSON.stringify(metric);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body);
  } else {
    fetch(vitalsUrl, {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * reportWebVitals - Sends core web vitals to analytics endpoint in production.
 */
export function reportWebVitals() {
  if (process.env.NODE_ENV === 'production') {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }
}

/**
 * trackCustomEvent - Track custom analytics events (Google Analytics, Mixpanel, etc).
 * @param {string} eventName
 * @param {object} properties
 */
export const trackCustomEvent = (eventName, properties = {}) => {
  if (process.env.REACT_APP_ENABLE_ANALYTICS === 'true') {
    // Integrate with analytics provider here (console.log removed for production cleanliness)
    // Example: window.gtag('event', eventName, properties);
  }
};

/**
 * trackPageView - Track a page view event.
 * @param {string} page
 */
export const trackPageView = (page) => {
  trackCustomEvent('page_view', { page });
};

/**
 * trackUserAction - Track a user action event.
 * @param {string} action
 * @param {object} details
 */
export const trackUserAction = (action, details = {}) => {
  trackCustomEvent('user_action', { action, ...details });
};
