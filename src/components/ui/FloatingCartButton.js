import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

/**
 * FloatingCartButton
 * A fixed, accessible, animated floating cart button with badge.
 * Opens the cart drawer on click. Keyboard and screen reader accessible.
 * @component
 */
export default function FloatingCartButton() {
  const { setIsCartOpen, cartItems } = useCart();
  const buttonRef = useRef(null);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Focus ring for accessibility
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === btn) {
        e.preventDefault();
        setIsCartOpen(true);
      }
    };
    btn.addEventListener('keydown', handleKeyDown);
    return () => btn.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  return (
    <motion.button
      ref={buttonRef}
      className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg z-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open cart"
      aria-haspopup="dialog"
      aria-controls="cart-drawer"
      tabIndex={0}
      data-testid="floating-cart-button"
      type="button"
      onClick={() => setIsCartOpen(true)}
    >
      <div className="relative flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <motion.span
          className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold px-2 py-1 rounded-full border border-primary shadow"
          initial={{ scale: 0 }}
          animate={{ scale: cartCount > 0 ? 1 : 0 }}
          aria-live="polite"
          aria-atomic="true"
          data-testid="cart-count-badge"
        >
          {cartCount}
          <span className="sr-only">items in cart</span>
        </motion.span>
      </div>
    </motion.button>
  );
}