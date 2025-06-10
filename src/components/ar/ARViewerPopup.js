import { motion, AnimatePresence } from 'framer-motion'

export default function ARViewerPopup({ product, onClose }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-bold">AR View: {product.name}</h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4 h-[70vh] flex flex-col items-center justify-center bg-gray-100">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">AR Viewer Would Appear Here</p>
              </div>
              <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Try On in AR
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}