/**
 * CartContext - React context for shopping cart state and actions.
 * Provides: cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, cartTotal, itemCount, isCartOpen, setIsCartOpen.
 * @module context/CartContext
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

/**
 * CartProvider - Provides cart state and actions to children.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add an item to the cart. If item exists, increase quantity.
   */
  const addItemToCart = useCallback((item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  /**
   * Remove an item from the cart by id.
   */
  const removeItemFromCart = useCallback((id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  /**
   * Update the quantity of an item in the cart.
   */
  const updateItemQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeItemFromCart]);

  /**
   * Clear all items from the cart.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Calculate total price and item count
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        cartTotal,
        itemCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}