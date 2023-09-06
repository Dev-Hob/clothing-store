import { createContext, useState } from "react";

const INITIAL_CART_VALUE = {
  cartItems: [],
  cartToggle: false,
  setCartItems: () => {},
  setCartToggle: () => {},
};

export const CartContext = createContext(INITIAL_CART_VALUE);

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);

  const removeCartItem = (id) => {
    setCartItems((products) => {
      const newList = products.map((p) => {
        if (p.id !== id) return p;
        if(p.quantity > 1) return { ...p, quantity: p.quantity - 1 };
        return undefined;
      }).filter( p => p);
      return newList;
    });
  };

  const addCartItem = (product) => {
    setCartItems((cartItems) => {
      const isExist = cartItems.find((p) => p.id === product.id);
      if (!isExist) return [...cartItems, { ...product, quantity: 1 }];
      const newList = cartItems.map((p) => {
        if(p.id !== product.id) return p;
        return { ...p, quantity: p.quantity + 1 };
      });
      return newList;
    });
  };

  const value = {
    cartItems,
    setCartItems,
    cartToggle,
    setCartToggle,
    removeCartItem,
    addCartItem,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
