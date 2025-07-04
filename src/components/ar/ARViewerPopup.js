
/**
 * ARViewerPopup displays a modal for AR viewing of a product.
 * @param {Object} props
 * @param {Object} props.product - Product object.
 * @param {Function} props.onClose - Close handler.
 */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

export default function ARViewerPopup({ product, onClose }) {
  const closeBtnRef = useRef(null);
  // Trap focus and close on Escape for accessibility
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        // Trap focus to close button only (since only one focusable)
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // Focus the close button when modal opens
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-black/90 via-cyan-900/80 to-purple-900/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`AR Viewer for ${product.name}`}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-cyan-400/30 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="p-4 flex justify-between items-center border-b border-cyan-100/40 bg-gradient-to-r from-cyan-50/60 to-purple-50/40">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce-slow" role="img" aria-label="AR">🕶️</span>
                <h3 className="text-xl font-bold" id="ar-viewer-title">Try {product.name} in AR</h3>
              </div>
              <Button
                ref={closeBtnRef}
                onClick={onClose}
                className="text-gray-500 hover:text-black transition-colors px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400/80"
                aria-label="Close AR Viewer"
                type="button"
              >
                <motion.span whileHover={{ rotate: 90 }} transition={{ type: 'spring', stiffness: 300 }} aria-hidden="true">✕</motion.span>
              </Button>
            </div>
            <div className="p-6 h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50/60 to-purple-50/40">
              <div className="w-full h-full bg-gray-200/60 rounded-xl flex items-center justify-center border border-dashed border-cyan-300/40">
                <p className="text-gray-500 text-lg font-medium">AR Preview Coming Soon</p>
              </div>
              <Button
                className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:from-cyan-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400/80 text-lg font-semibold"
                aria-label="Try this product in AR"
                type="button"
                onClick={() => alert('Launching AR experience...')}
              >
                <span role="img" aria-label="AR">🕶️</span> Try On in AR
              </Button>
              <p className="mt-4 text-sm text-gray-400">No AR device? <span className="underline cursor-pointer hover:text-cyan-600 transition-colors">See 3D preview instead</span></p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ARViewerPopup.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

ARViewerPopup.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};