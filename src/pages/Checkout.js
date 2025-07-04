
/**
 * Checkout - Accessible, animated checkout page with order summary and form.
 * @component
 */
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (process.env.NODE_ENV === 'development') {
      // Order submitted: { formData, cartItems }
    }
    clearCart();
    setCheckoutComplete(true);
  };

  if (checkoutComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900/50 p-8 rounded-xl border border-gray-700"
        >
          <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
            A confirmation email has been sent to {formData.email}.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full font-medium"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-300 mb-6">
            There's nothing in your cart. Start shopping to add items.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full font-medium"
          >
            <FiArrowLeft /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6"
      >
        <FiArrowLeft /> Back to Shop
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-6">Payment Details</h2>
            <div>
              <label className="block text-gray-400 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="4242 4242 4242 4242"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1">Expiry Date</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">CVC</label>
                <input
                  type="text"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium"
            >
              Complete Order (${cartTotal.toFixed(2)})
            </button>
          </form>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-800/30 rounded-lg">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    {item.customization?.size} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between border-t border-gray-700 pt-4">
              <span className="text-gray-400">Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-4">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}