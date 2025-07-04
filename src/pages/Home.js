import PropTypes from 'prop-types';

import React, { useState, lazy, Suspense } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLoader, FiCheck } from 'react-icons/fi';
import HeroSection from '../components/sections/Hero';
import FeaturesSection from '../components/sections/Features';
import FloatingCartButton from '../components/ui/FloatingCartButton';
import BackgroundParticles from '../components/effects/BackgroundParticles';
import ARViewerPopup from '../components/ar/ARViewerPopup';
import JacketCustomizer from '../components/product/JacketCustomizer';
import ProductHologram from '../components/product/ProductHologram';
import Button from '../components/ui/Button';
import VirtualTryOn from '../components/ai/VirtualTryOn';

const DynamicVirtualTryOn = React.lazy(() => import('../components/ai/VirtualTryOn'));

export default function HomePage() {
  const { addItemToCart } = useCart();
  const [products] = useState([
    // --- Women's Jackets (public/images/womenjacket1.png ... womenjacket4.png) ---
    {
      id: 1,
      name: 'Patagonia Down With It Parka',
      gender: 'Women',
      price: 349.0,
      image: '/images/womenjacket1.png',
      url: 'https://www.patagonia.com/product/womens-down-with-it-parka/28442.html',
      description: 'Warm, eco-friendly down parka with flattering fit—best overall women’s winter parka.',
    },
    {
      id: 2,
      name: 'REI Stormhenge Parka',
      gender: 'Women',
      price: 259.0,
      image: '/images/womenjacket2.png',
      url: 'https://www.rei.com/product/170799/rei-co-op-stormhenge-down-hybrid-parka-womens',
      description: 'Affordable, waterproof yet warm with synthetic insulation—perfect for wet, cold days.',
    },
    {
      id: 3,
      name: 'Fjällräven Nuuk Parka',
      gender: 'Women',
      price: 399.0,
      image: '/images/womenjacket3.png',
      url: 'https://www.fjallraven.com/us/en-us/women/jackets/winter-jackets/nuuk-parka-w',
      description: 'Premium, cold-resistant—it topped seasonal tests in extreme conditions.',
    },
    {
      id: 4,
      name: 'The North Face Arctic Parka',
      gender: 'Women',
      price: 329.0,
      image: '/images/womenjacket4.png',
      url: 'https://www.thenorthface.com/shop/womens-arctic-parka-nf0a4r2v',
      description: 'High-performance waterproof parka with DryVent™ technology for severe winter climates.',
    },
    // --- Men's Jackets (public/images/menjacket1.png ... menjacket4.png) ---
    {
      id: 5,
      name: 'Patagonia Down With It Parka',
      gender: 'Men',
      price: 349.0,
      image: '/images/menjacket1.png',
      url: 'https://www.patagonia.com/product/mens-down-with-it-parka/28442.html',
      description: 'Cozy, stylish, and optimized for everyday cold—8.5 oz of recycled down, long length, removable hood. A great balance of comfort and style.',
    },
    {
      id: 6,
      name: "Arc'teryx Atom SL Hoody",
      gender: 'Men',
      price: 259.0,
      image: '/images/menjacket2.png',
      url: 'https://arcteryx.com/us/en/shop/mens/atom-sl-hoody',
      description: 'Lightweight, breathable, great for shoulder seasons. Outdoor-tested, with fleece stretch panels and hood for versatility.',
    },
    {
      id: 7,
      name: 'The North Face McMurdo Parka',
      gender: 'Men',
      price: 399.0,
      image: '/images/menjacket3.png',
      url: 'https://www.thenorthface.com/shop/mens-mcmurdo-parka-nf0a5gjg',
      description: 'Insulated, city-ready heavy-hitter. Our top men’s winter pick offering excellent warmth and style.',
    },
    {
      id: 8,
      name: 'Rains Jacket',
      gender: 'Men',
      price: 129.0,
      image: '/images/menjacket4.png',
      url: 'https://www.rains.com/collections/men-rain-jackets/products/jacket-black',
      description: 'Sleek urban rainwear with clean lines and reliable water resistance. Stylish and functional.',
    },
  ]);
  const [selectedARProduct, setSelectedARProduct] = useState(null);
  const [selectedTryOnProduct, setSelectedTryOnProduct] = useState(null);
  const [customizingJacket, setCustomizingJacket] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
      <BackgroundParticles />
      <FloatingCartButton />

      {/* --- Hero Section --- */}
      <HeroSection onCustomizeClick={() => setCustomizingJacket(true)} />

      {/* --- Modern Jackets Section --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Explore Our Jackets</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover the best in modern outerwear. Each jacket is handpicked for quality, style, and innovation—shop by gender below.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          {/* --- Men's Jackets --- */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-8 text-cyan-700 dark:text-cyan-300 text-center md:text-left">Men’s Jackets</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.filter(p => p.gender === 'Men').map(product => (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-gradient-to-br from-white via-gray-50 to-cyan-50 dark:from-gray-900 dark:via-black dark:to-cyan-950 rounded-3xl shadow-xl hover:scale-[1.03] hover:shadow-cyan-400/30 transition-transform duration-300 overflow-hidden border border-cyan-100 dark:border-cyan-900"
                  tabIndex={0}
                  aria-label={product.name}
                >
                  <div className="relative h-56 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-cyan-100/40 to-purple-100/30 dark:from-cyan-900/30 dark:to-purple-900/30">
                    <img
                      src={product.image}
                      alt={`Preview of ${product.name} - ${product.gender}'s jacket`}
                      className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-transform duration-500 drop-shadow-xl border-2 border-white dark:border-gray-900"
                      loading="eager"
                      draggable="false"
                      style={{ background: '#e0e7ef', minHeight: 160, maxHeight: 220, objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-5">
                    <h4 className="text-lg font-bold mb-1 group-hover:text-cyan-500 transition-colors drop-shadow">{product.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-sm">{product.gender}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto gap-2">
                      <span className="text-base font-semibold text-cyan-700 dark:text-cyan-300">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => {
                          addItemToCart(product);
                          if (window?.showToast) {
                            window.showToast(`Added ${product.name} to cart!`);
                          }
                        }}
                        className="px-4 py-2 rounded-full bg-cyan-600 text-white font-bold text-xs shadow hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        aria-label={`Add ${product.name} (${product.gender}) to cart for $${product.price.toFixed(2)}`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* --- Women's Jackets --- */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-8 text-pink-700 dark:text-pink-300 text-center md:text-left">Women’s Jackets</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.filter(p => p.gender === 'Women').map(product => (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-gradient-to-br from-white via-gray-50 to-pink-50 dark:from-gray-900 dark:via-black dark:to-pink-950 rounded-3xl shadow-xl hover:scale-[1.03] hover:shadow-pink-400/30 transition-transform duration-300 overflow-hidden border border-pink-100 dark:border-pink-900"
                  tabIndex={0}
                  aria-label={product.name}
                >
                  <div className="relative h-56 w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-100/40 to-purple-100/30 dark:from-pink-900/30 dark:to-purple-900/30">
                    <img
                      src={product.image}
                      alt={`Preview of ${product.name} - ${product.gender}'s jacket`}
                      className="object-cover w-full h-full rounded-2xl group-hover:scale-105 transition-transform duration-500 drop-shadow-xl border-2 border-white dark:border-gray-900"
                      loading="eager"
                      draggable="false"
                      style={{ background: '#fbeff2', minHeight: 160, maxHeight: 220, objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-5">
                    <h4 className="text-lg font-bold mb-1 group-hover:text-pink-500 transition-colors drop-shadow">{product.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-sm">{product.gender}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto gap-2">
                      <span className="text-base font-semibold text-pink-700 dark:text-pink-300">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => {
                          addItemToCart(product);
                          if (window?.showToast) {
                            window.showToast(`Added ${product.name} to cart!`);
                          }
                        }}
                        className="px-4 py-2 rounded-full bg-pink-600 text-white font-bold text-xs shadow hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
                        aria-label={`Add ${product.name} (${product.gender}) to cart for $${product.price.toFixed(2)}`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Customization & Features Section --- */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">Your Design, Your Rules</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center"><FiCheck className="mr-2 text-green-500" /> 50+ Color Options</li>
                  <li className="flex items-center"><FiCheck className="mr-2 text-green-500" /> Premium Materials</li>
                  <li className="flex items-center"><FiCheck className="mr-2 text-green-500" /> Real-time 3D Preview</li>
                </ul>
                <Button 
                  onClick={() => setCustomizingJacket(true)}
                  variant="secondary"
                  className="px-6 py-2 bg-black dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Start Designing
                </Button>
              </div>
              <div className="h-96 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
                <ProductHologram product={products[0]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* --- Virtual Try-On Section --- */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Try On Outfits Virtually</h2>
        <div className="flex justify-center">
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <FiLoader className="animate-spin text-3xl text-cyan-400" />
              <span className="ml-4 text-cyan-300">Loading Virtual Try-On…</span>
            </div>
          }>
            <VirtualTryOn />
          </Suspense>
        </div>
      </section>

      {/* --- Jacket Customizer Modal --- */}
      {customizingJacket && (
        <JacketCustomizer 
          product={products[0]} 
          onExit={() => setCustomizingJacket(false)}
        />
      )}
      <ARViewerPopup 
        product={selectedARProduct}
        onClose={() => setSelectedARProduct(null)}
      />

      <AnimatePresence>
        {selectedTryOnProduct && (
          <VirtualTryOnModal 
            product={selectedTryOnProduct}
            onClose={() => setSelectedTryOnProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


/**
 * VirtualTryOnModal - Accessible, modular modal for virtual try-on.
 * @component
 */
function VirtualTryOnModal({ product, onClose }) {
  // Trap focus inside modal for accessibility
  const modalRef = React.useRef(null);
  React.useEffect(() => {
    const focusable = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable && focusable.length) {
      focusable[0].focus();
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && focusable && focusable.length > 1) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Virtual Try-On Modal"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full max-w-4xl h-[80vh]"
      >
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-2 transition-colors"
          aria-label="Close Virtual Try-On"
          type="button"
          autoFocus
        >
          <FiX className="text-white text-xl" />
        </Button>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-xl">
            <FiLoader className="animate-spin text-white text-2xl" />
          </div>
        }>
          <DynamicVirtualTryOn product={product} />
        </Suspense>
      </motion.div>
    </motion.div>
  );
}

VirtualTryOnModal.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
