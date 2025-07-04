import React from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

/**
 * AppLayout wraps all pages with a consistent navigation and footer, and provides accessibility landmarks.
 * @component
 */
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white" data-testid="app-layout">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-cyan-700 text-white px-4 py-2 rounded shadow-lg"
        tabIndex={0}
      >
        Skip to main content
      </a>
      <Navbar />
      <main
        id="main-content"
        className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-8 py-8"
        role="main"
        tabIndex={-1}
        data-testid="main-content"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
