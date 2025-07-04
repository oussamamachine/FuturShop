/**
 * SEOHead - Dynamically manages document title and meta tags for SEO/social sharing.
 * Accessible, robust, and idempotent. No visual output.
 * @component
 */
import { useEffect } from 'react';

export default function SEOHead({
  title = 'FUTURSHOP - Future Fashion Today',
  description = 'Discover the future of fashion with AI-powered customization, AR try-on, and quantum shipping.',
  image = '/images/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
}) {
  const siteTitle = 'FUTURSHOP';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteTitle, true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical link
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [fullTitle, description, image, url, type, siteTitle]);

  return null; // No visual output
}
