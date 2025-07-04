
import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

/**
 * CartDrawer - Accessible, animated cart drawer with focus trap, ARIA, and modern design.
 * @component
 */


export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart();

  // Ref for focus trap
  const drawerRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Focus trap and ESC close
  useEffect(() => {
    if (!isCartOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    // Find all focusable elements
    const focusable = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) {
      // Focus the first focusable element
      setTimeout(() => focusable[0].focus(), 0);
      firstFocusableRef.current = focusable[0];
      lastFocusableRef.current = focusable[focusable.length - 1];
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
      if (e.key === 'Tab' && focusable.length) {
        // Focus trap
        if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen, cartItems.length]);

  // Close on background click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) setIsCartOpen(false);
  }, [setIsCartOpen]);

  // ARIA label for cart count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ---
  // CartDrawer Render
  // ---
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            aria-hidden="true"
            onClick={handleBackdropClick}
            data-testid="cart-backdrop"
          />
          {/* Drawer */}
          <motion.aside
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 border-l border-gray-800 focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart drawer"
            tabIndex={-1}
            data-testid="cart-drawer"
          >
            {/* Visually hidden heading for screen readers */}
            <h1 className="sr-only" id="cart-drawer-heading">Shopping Cart</h1>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiShoppingBag className="text-xl" aria-hidden="true" />
                  <h2 className="text-xl font-bold" id="cart-drawer-title">Your Cart</h2>
                  <span
                    className="bg-cyan-500 text-xs px-2 py-1 rounded-full ml-2"
                    aria-label={`Cart contains ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                  >
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Close cart drawer"
                  ref={firstFocusableRef}
                  data-testid="close-cart-btn"
                >
                  <FiX className="text-xl" aria-hidden="true" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-4" tabIndex={0} aria-labelledby="cart-drawer-title">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <FiShoppingBag className="text-4xl text-gray-600 mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 mb-6">
                      Start shopping to add items to your cart
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      aria-label="Continue shopping"
                      ref={lastFocusableRef}
                      data-testid="continue-shopping-btn"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={() => removeItemFromCart(item.id)}
                        onQuantityChange={(quantity) => updateItemQuantity(item.id, quantity)}
                        tabIndex={0}
                        aria-label={`Cart item: ${item.name}`}
                        // Set lastFocusableRef on last item if no checkout
                        ref={
                          idx === cartItems.length - 1 && cartItems.length === 1
                            ? lastFocusableRef
                            : undefined
                        }
                        data-testid={`cart-item-${item.id}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer / Checkout */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-800">
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                    aria-label="Proceed to checkout"
                    ref={lastFocusableRef}
                    data-testid="checkout-btn"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}