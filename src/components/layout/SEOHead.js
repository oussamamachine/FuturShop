import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';


/**
 * SEOHead - Sets up SEO and social meta tags for each page.
 * @component
 * @param {object} props
 * @param {string} [props.title] - Page title
 * @param {string} [props.description] - Page description
 * @param {string} [props.image] - Social share image URL
 * @param {React.ReactNode} [props.children] - Additional Helmet children
 */
export default function SEOHead({ title, description, image, children }) {
  const location = useLocation();
  const url = `${window.location.origin}${location.pathname}`;
  // Calculate the meta title, description and image URL
  const metaTitle = title ? `${title} | Futur` : 'Futur – Next-Gen Fashion';
  const metaDescription = description || 'Design, preview, and shop extraordinary fashion with AI, AR, and 3D.';
  const metaImage = image || '/logo512.png';

  return (
    <Helmet data-testid="seo-head">
      {/* Page title, shown in the browser title bar */}
      <title>{metaTitle}</title>
      {/* Page description, shown in search engine results */}
      <meta name="description" content={metaDescription} />
      {/* Facebook, Twitter, and other social media meta tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {/* Canonical link, to prevent duplicate content */}
      <link rel="canonical" href={url} />
      {/* If you want to add structured data or additional meta tags, pass them as children. */}
      {/*
        If you want to add structured data or additional meta tags, pass them as children.
      */}
      {children}
    </Helmet>
  );
}

