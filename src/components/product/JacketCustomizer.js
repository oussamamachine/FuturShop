import { useState, useRef, useCallback, useEffect } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { FiX, FiDownload, FiShare2, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import React from 'react';
import Button from '../ui/Button';
import { JACKET_TYPES } from '../../constants/jacket';
import { calculatePrice } from '../../utils/jacket';
import { TextureLoader } from 'three';
import CustomizerTabs from './customizer/CustomizerTabs';
import StylePanel from './customizer/StylePanel';
import MaterialPanel from './customizer/MaterialPanel';
import ColorPanel from './customizer/ColorPanel';
import SizePanel from './customizer/SizePanel';
import OrderSummary from './customizer/OrderSummary';
import Jacket3DPreview from './customizer/Jacket3DPreview';
import DesignPanel from './customizer/DesignPanel';

// Toast system (global notification)
function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-lg pointer-events-auto transition-colors
        ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-gray-800'}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
}

function JacketModel({ design }) {

  const { scene } = useGLTF('/models/realistic_jacket_model.glb'); 
  const [meshes, setMeshes] = useState({});

  // Map mesh names to objects for easy access
  useEffect(() => {
    const found = {};
    scene.traverse(child => {
      if (child.isMesh) {
        found[child.name.toLowerCase()] = child;
      }
    });
    setMeshes(found);

    // Warn if expected meshes are missing
    const required = ['body', 'back'];
    required.forEach(name => {
      if (!found[name]) {
        // eslint-disable-next-line no-console
        console.warn(`3D Model warning: Mesh '${name}' not found. Customization for this part will not be visible until your model includes it.`);
      }
    });
  }, [scene]);

  useEffect(() => {
    // Color & material for body
    if (meshes.body) {
      try {
        meshes.body.material.color.set(design.color);
        const mat = JACKET_TYPES[design.style]?.materials?.[design.material];
        if (mat) {
          meshes.body.material.roughness = mat.roughness;
          meshes.body.material.metalness = mat.metalness;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Could not apply color/material to body mesh:', e);
      }
    }
    // Custom back design
    if (meshes.back) {
      try {
        if (design.backDesign) {
          new TextureLoader().load(design.backDesign, (texture) => {
            meshes.back.material.map = texture;
            meshes.back.material.needsUpdate = true;
          });
        } else {
          meshes.back.material.map = null;
          meshes.back.material.needsUpdate = true;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Could not apply custom design to back mesh:', e);
      }
    }
  }, [meshes, design]);

  return (
    <group>
      <primitive object={scene} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </group>
  );
}

export default function JacketCustomizer({ onExit }) {
  const { addItemToCart, setIsCartOpen } = useCart();
  const [design, setDesign] = useState(() => ({
    style: 'bomber',
    color: '#3B82F6',
    size: 'M',
    material: 'leather',
    texture: null,
    backText: '',
    backDesign: null,
    textColor: '#000000',
    serial: Math.random().toString(36).substring(2, 8).toUpperCase()
  }));

  const [activeTab, setActiveTab] = useState('style');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  // Accessibility: focus management for tabs
  const tabRefs = useRef([]);



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new window.FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setDesign((prev) => ({
          ...prev,
          backDesign: event.target.result,
          backText: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setDesign((prev) => ({ ...prev, backDesign: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveDesign = () => {
    setStatus('saved');
    setToast({ message: 'Design saved!', type: 'success' });
    setTimeout(() => setStatus(null), 2000);
  };


  const addToCart = useCallback(() => {
    try {
      const cartItem = {
        id: `${design.style}-${performance.now()}`,
        name: JACKET_TYPES[design.style].label,
        price: calculatePrice(design),
        image: JACKET_TYPES[design.style].image,
        customization: design, 
        quantity: 1
      };
      addItemToCart(cartItem);
      setIsCartOpen(true);
      setStatus('added');
      setToast({ message: 'Added to cart!', type: 'success' });
      setTimeout(() => setStatus(null), 2000);
    } catch (error) {
      setStatus('error');
      setToast({ message: 'Error adding item', type: 'error' });
      setTimeout(() => setStatus(null), 2000);
    }
  }, [design, addItemToCart, setIsCartOpen]);


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 text-white z-50 overflow-y-auto backdrop-blur-md"
    >
      {/* Toast notification */}
      <AnimatePresence>
        {toast.message && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          >
            JACKET CUSTOMIZER
          </motion.h1>
          <Button 
            onClick={onExit}
            variant="secondary"
            aria-label="Close customizer"
            className="p-3 rounded-full hover:bg-white/10 transition-colors group"
          >
            <FiX className="text-xl group-hover:rotate-90 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <CustomizerTabs activeTab={activeTab} setActiveTab={setActiveTab} tabRefs={tabRefs} />

            <AnimatePresence mode="wait">
              {activeTab === 'style' && (
                <StylePanel design={design} setDesign={setDesign} />
              )}
              {activeTab === 'material' && (
                <MaterialPanel design={design} setDesign={setDesign} />
              )}
              {activeTab === 'color' && (
                <ColorPanel design={design} setDesign={setDesign} />
              )}
              {activeTab === 'design' && (
                <DesignPanel
                  design={design}
                  setDesign={setDesign}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  fileInputRef={fileInputRef}
                  handleImageUpload={handleImageUpload}
                  removeImage={removeImage}
                />
              )}
              {activeTab === 'size' && (
                <SizePanel design={design} setDesign={setDesign} />
              )}
            </AnimatePresence>
          </div>
        <div className="lg:col-span-2 flex flex-col gap-8 relative">
          {/* Animated holographic background for 3D preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="h-full w-full holographic-effect animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-black/60 backdrop-blur-lg"
          >
            <Jacket3DPreview design={design} JacketModel={JacketModel} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeInOut' }}
          >
            <OrderSummary design={design} />
          </motion.div>
          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Back to top"
          >
            <span className="material-symbols-outlined text-2xl">arrow_upward</span>
          </button>
        </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8" role="group" aria-label="Customizer actions">
          {/* Save Design */}
          <Button
            onClick={saveDesign}
            variant={status === 'saved' ? 'primary' : 'secondary'}
            className={`flex items-center gap-2 px-6 py-3 ${
              status === 'saved' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
            } rounded-full font-medium`}
            aria-label={status === 'saved' ? 'Design saved' : 'Save design'}
            data-testid="customizer-save-btn"
          >
            <FiDownload aria-hidden="true" />
            <span>{status === 'saved' ? 'Design Saved!' : 'Save Design'}</span>
          </Button>
          {/* Reset Design */}
          <Button
            onClick={() => {
              setDesign({
                style: 'bomber',
                color: '#3B82F6',
                size: 'M',
                material: 'leather',
                texture: null,
                backText: '',
                backDesign: null,
                textColor: '#000000',
                serial: Math.random().toString(36).substring(2, 8).toUpperCase(),
              });
              setImagePreview(null);
              setToast({ message: 'Customizer reset!', type: 'success' });
            }}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium"
            aria-label="Reset customizer"
            data-testid="customizer-reset-btn"
          >
            <span className="material-symbols-outlined" aria-hidden="true">restart_alt</span>
            <span>Reset</span>
          </Button>
          {/* Download 3D Preview */}
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium"
            onClick={() => {
              // Download 3D preview snapshot
              const canvas = document.querySelector('canvas');
              if (canvas) {
                const link = document.createElement('a');
                link.download = `jacket-design-${design.serial}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                setToast({ message: '3D preview downloaded!', type: 'success' });
              }
            }}
            aria-label="Download 3D preview"
            data-testid="customizer-download-btn"
          >
            <FiDownload aria-hidden="true" />
            <span>Download 3D Preview</span>
          </Button>
          {/* Share (future) */}
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium"
            onClick={() => setToast({ message: 'Share feature coming soon!', type: 'info' })}
            aria-label="Share design"
            data-testid="customizer-share-btn"
          >
            <FiShare2 aria-hidden="true" />
            <span>Share</span>
          </Button>
          {/* Add to Cart */}
          <Button
            onClick={addToCart}
            variant="primary"
            className={`flex items-center gap-2 px-6 py-3 ${
              status === 'added' ? 'bg-green-600' :
              status === 'error' ? 'bg-red-600' :
              'bg-purple-600 hover:bg-purple-700'
            } rounded-full font-medium`}
            aria-label={
              status === 'added' ? 'Added to cart' :
              status === 'error' ? 'Error adding item' :
              `Add to cart for $${calculatePrice(design)}`
            }
            data-testid="customizer-add-to-cart-btn"
          >
            <FiCheck aria-hidden="true" />
            <span>
              {status === 'added' ? 'Added to Cart!' :
                status === 'error' ? 'Error Adding Item' :
                `Add to Cart ($${calculatePrice(design)})`}
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}