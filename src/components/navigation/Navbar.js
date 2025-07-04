
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from '../ui/DarkModeToggle';



/**
 * Navbar - Accessible, animated, and professional site navigation bar.
 * @component
 */
export default function Navbar() {
  const { cartItems, itemCount, setIsCartOpen } = useCart();
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/legal', label: 'Legal' },
  ];
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Glitch effect for logo
  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 300);
  };

  // Cart pulse animation
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  // Trap focus in mobile menu (full focus trap)
  useEffect(() => {
    if (!mobileOpen) return;
    const focusableSelectors = 'a, button, [tabindex]:not([tabindex="-1"])';
    const menu = mobileMenuRef.current;
    const focusables = menu?.querySelectorAll(focusableSelectors);
    const firstFocusable = focusables?.[0];
    const lastFocusable = focusables?.[focusables.length - 1];
    setTimeout(() => firstFocusable?.focus(), 0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setTimeout(() => mobileMenuButtonRef.current?.focus(), 0);
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };
    menu?.addEventListener('keydown', handleKeyDown);
    return () => menu?.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <nav
      className="bg-black/80 backdrop-blur-md border-b border-cyan-400/20 py-4 sticky top-0 z-50"
      aria-label="Site navigation"
      data-testid="site-navbar"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className={`text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent \
            ${glitchEffect ? 'translate-x-1 skew-x-12' : 'transition-all duration-500 hover:skew-x-0'}`}
          onMouseEnter={triggerGlitch}
          aria-label="Futurshop home"
          data-testid="navbar-logo"
        >
          <span className="relative">
            FUTUR<span className="text-purple-400">SHOP</span>
            <span className={`absolute left-0 top-0 text-white opacity-0 ${glitchEffect ? 'animate-glitch opacity-100' : ''}`} aria-hidden="true">
              FUTUR_SHOP
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-lg font-medium" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:text-cyan-400 transition-colors"
                aria-current={location.pathname === to ? 'page' : undefined}
                data-testid={`navbar-link-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${mobileOpen ? 'bg-cyan-400/20 scale-110' : 'hover:bg-cyan-400/10'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            ref={mobileMenuButtonRef}
            data-testid="navbar-mobile-toggle"
          >
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="block"
            >
              {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </motion.span>
          </button>
          <DarkModeToggle />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 group rounded-full border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
            aria-label="Open cart"
            data-testid="navbar-cart-btn"
          >
            <div className="relative">
              <FiShoppingCart
                size={24}
                className="text-cyan-400 group-hover:text-purple-400 transition-colors"
                aria-hidden="true"
              />
              {cartItems.length > 0 && (
                <span className={`
                  absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold h-6 w-6
                  flex items-center justify-center rounded-full border border-cyan-400
                  ${cartPulse ? 'animate-ping-once' : ''}
                `}
                  aria-label={`Cart contains ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                  data-testid="navbar-cart-count"
                >
                  {itemCount}
                </span>
              )}
            </div>
            <span className="absolute inset-0 rounded-full bg-cyan-400/10 group-hover:bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-black/95 shadow-2xl z-[100] flex flex-col gap-8 p-8 md:hidden"
            aria-label="Mobile menu"
            tabIndex={-1}
            ref={mobileMenuRef}
            data-testid="navbar-mobile-menu"
          >
            <button
              className="self-end mb-8 p-2 rounded-full hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              data-testid="navbar-mobile-close"
            >
              <FiX size={28} />
              <span className="sr-only">Close menu</span>
            </button>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-lg font-medium py-2 hover:text-cyan-400 transition-colors"
                aria-current={location.pathname === to ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                data-testid={`navbar-mobile-link-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <style jsx>{`
        @keyframes glitch {
          0% { clip-path: inset(10% 0 90% 0); transform: skewX(0deg); }
          20% { clip-path: inset(80% 0 20% 0); transform: skewX(30deg); }
          40% { clip-path: inset(30% 0 70% 0); transform: skewX(-20deg); }
          60% { clip-path: inset(60% 0 40% 0); transform: skewX(15deg); }
          80% { clip-path: inset(20% 0 80% 0); transform: skewX(-10deg); }
          100% { clip-path: inset(0); transform: skewX(0deg); }
        }
        .animate-glitch {
          animation: glitch 0.3s linear;
        }
        @keyframes ping-once {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-ping-once {
          animation: ping-once 0.5s ease-out;
        }
      `}</style>
    </nav>
  );
}
