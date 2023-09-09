import { createContext, useEffect, useState } from "react";

const INITIAL_CART_VALUE = {
  cartItems: [],
  cartToggle: false,
  setCartItems: () => {},
  setCartToggle: () => {},
  addCartItem: () => {},
  deleteCartItem: () => {},
  decreaseQuantityItem: () => {},
  quantityTotal: 0,
  cartTotal: 0,
};



export const CartContext = createContext(INITIAL_CART_VALUE);

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartToggle, setCartToggle] = useState(false);
  const [quantityTotal, setQuantityTotal] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce( (acc, product) => {
      return acc + product.quantity;
    }, 0)
    setQuantityTotal(newCartCount)

  }, [cartItems])
  
  useEffect(() => {
    const newCartTotal = cartItems.reduce( (acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0)
    setCartTotal(newCartTotal)

  }, [cartItems])

  const deleteCartItem = (id) => {
    setCartItems( products => products.filter( p => p.id !== id))
  }
  
  const decreaseQuantityItem = (id) => {
    const quantity = cartItems.find( item => item.id === id).quantity;
    if (quantity === 1) return;
    setCartItems((products) => {
      const newList = products.map((p) => {
        if (p.id !== id || p.quantity === 1) return p;
        if(p.quantity > 1) return { ...p, quantity: p.quantity - 1 };
        return p;
      })
      return newList;
    });
  };

  const addCartItem = (product) => {
    console.log(typeof cartItems)
    setCartItems((prevItems) => {
      const isExist = prevItems.find((p) => p.id === product.id);
      if (!isExist) return [...prevItems, { ...product, quantity: 1 }];
      const newList = prevItems.map((p) => {
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
    deleteCartItem,
    decreaseQuantityItem,
    addCartItem,
    quantityTotal,
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
