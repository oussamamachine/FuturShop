import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';


/**
 * DarkModeToggle - Accessible, animated dark/light mode toggle button.
 * @component
 */
export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-full border border-cyan-400/30 hover:border-cyan-400/60 bg-white/10 dark:bg-black/30 text-cyan-400 dark:text-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      tabIndex={0}
      data-testid="darkmode-toggle"
      type="button"
    >
      {dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      <span className="sr-only">{dark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}
