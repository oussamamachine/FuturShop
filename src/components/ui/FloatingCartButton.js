import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext' 

export default function FloatingCartButton() {
  const [isHovered, setIsHovered] = useState(false)
  const { setIsCartOpen, cartItems } = useCart(); 

  return (
    <motion.button
      className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsCartOpen(true)} 
    >
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {isHovered && (
          <motion.span 
            className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </motion.span>
        )}
      </div>
    </motion.button>
  )
}