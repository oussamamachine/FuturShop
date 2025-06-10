import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { FiShoppingCart, FiEye, FiX, FiLoader, FiCheck, FiArrowRight } from 'react-icons/fi';
import HeroSection from '../components/sections/Hero';
import FeaturesSection from '../components/sections/Features';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import FloatingCartButton from '../components/ui/FloatingCartButton';
import BackgroundParticles from '../components/effects/BackgroundParticles';
import ARViewerPopup from '../components/ar/ARViewerPopup';
import JacketCustomizer from '../components/product/JacketCustomizer'; 
import ProductHologram from '../components/product/ProductHologram' 
import ProductCard from '../components/product/ProductCard'
const DynamicStyleWizard = lazy(() => import('../components/ai/StyleWizard'));
const DynamicVirtualTryOn = lazy(() => import('../components/ai/VirtualTryOn'));

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedARProduct, setSelectedARProduct] = useState(null);
  const [selectedTryOnProduct, setSelectedTryOnProduct] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [customizingJacket, setCustomizingJacket] = useState(false);
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Designer Jacket',
        price: 249.99,
        image: '/images/jacket.jpg',
        model3D: '/3d-models/jacket.glb',
        arModel: '/ar-assets/jacket.usdz',
        customizable: true,
        configurations: {
          colors: ['#3B82F6', '#EF4444', '#10B981', '#000000', '#FFFFFF'],
          materials: ['Leather', 'Denim', 'Nylon', 'Polyester'],
          styles: ['Bomber', 'Racer', 'Oversized', 'Cropped'],
          patches: ['None', 'Logo', 'Graphic', 'Text']
        }
      },
       {
        id: 2,
        name: 'Designer Jacket',
        price: 230.99,
        image: '/images/jacket1.jpg',
        model3D: '/3d-models/jacket.glb',
        arModel: '/ar-assets/jacket.usdz',
        customizable: true,
        configurations: {
          colors: ['#3B82F6', '#EF4444', '#10B981', '#000000', '#FFFFFF'],
          materials: ['Leather', 'Denim', 'Nylon', 'Polyester'],
          styles: ['Bomber', 'Racer', 'Oversized', 'Cropped'],
          patches: ['None', 'Logo', 'Graphic', 'Text']
        }
      },
      {
        id: 3,
        name: 'Designer Jacket',
        price: 220.99,
        image: '/images/jacket2.jpg',
        model3D: '/3d-models/jacket.glb',
        arModel: '/ar-assets/jacket.usdz',
        customizable: true,
        configurations: {
          colors: ['#3B82F6', '#EF4444', '#10B981', '#000000', '#FFFFFF'],
          materials: ['Leather', 'Denim', 'Nylon', 'Polyester'],
          styles: ['Bomber', 'Racer', 'Oversized', 'Cropped'],
          patches: ['None', 'Logo', 'Graphic', 'Text']
        }
      },
    ];

    const fetchProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative">
      <BackgroundParticles />
      <FloatingCartButton />

      {customizingJacket ? (
        <JacketCustomizer 
          product={products.find(p => p.customizable)} 
          onExit={() => setCustomizingJacket(false)}
        />
      ) : (
        <>
          <HeroSection onCustomizeClick={() => setCustomizingJacket(true)} />
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Create Your Signature Style</h2>
              <button 
                onClick={() => setCustomizingJacket(true)}
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
              >
                Design Your Jacket Now
              </button>
            </div>

            {loading ? (
              <LoadingSkeleton count={3} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onViewAR={setSelectedARProduct}
                    onTryOn={setSelectedTryOnProduct}
                  />
                ))}
              </div>
            )}
          </section>
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl font-bold mb-4">Your Design, Your Rules</h3>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center"><FiCheck className="mr-2 text-green-500" /> 50+ Color Options</li>
                      <li className="flex items-center"><FiCheck className="mr-2 text-green-500" /> Premium Materials</li>
                      <li className="flex items-center"><FiCheck className="mr-2 text-green-500" /> Real-time 3D Preview</li>
                    </ul>
                    <button 
                      onClick={() => setCustomizingJacket(true)}
                      className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
                    >
                      Start Designing
                    </button>
                  </div>
                  <div className="h-96 bg-gray-100">
                    <ProductHologram product={products[0]} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FeaturesSection />
        </>
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

function VirtualTryOnModal({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative w-full max-w-4xl h-[80vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-2 transition-colors"
        >
          <FiX className="text-white text-xl" />
        </button>
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