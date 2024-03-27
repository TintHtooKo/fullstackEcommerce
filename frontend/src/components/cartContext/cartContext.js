import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
  const [cartCount, setCartCount] = useState(initialCartCount);

  const updateCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem('cartCount', count.toString());
  };

  useEffect(() => {
    // Update local storage whenever cartCount changes
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
