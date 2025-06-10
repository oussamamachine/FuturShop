import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart();

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-xl z-50 border-l border-gray-800"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FiShoppingBag className="text-xl" />
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <span className="bg-cyan-500 text-xs px-2 py-1 rounded-full">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-800"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <FiShoppingBag className="text-4xl text-gray-600 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                      <p className="text-gray-400 mb-6">
                        Start shopping to add items to your cart
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-full"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          onRemove={() => removeItemFromCart(item.id)}
                          onQuantityChange={(quantity) =>
                            updateItemQuantity(item.id, quantity)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full text-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}