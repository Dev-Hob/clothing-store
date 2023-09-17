import { useReducer } from "react";
import { createContext } from "react";
import { createAction } from "../../utils/createAction";

const cartItemCount = (cartItems) =>
  cartItems.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

const cartTotalPrice = (cartItems) =>
  cartItems.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

const decreaseItemQuantity = (cartItems, id) => {
  const newCartItems = cartItems.map((products) => {
    if (products.id !== id || products.quantity === 1) return products;
    if (products.quantity > 1)
      return { ...products, quantity: products.quantity - 1 };
    return products;
  });
  return newCartItems;
};

const addToItems = async (cartItems, product) => {
  let newCartItems;
  const isExist =
    (await cartItems.filter((p) => p.id === product.id).length) !== 0;
  if (!isExist) {
    product["quantity"] = 1;
    newCartItems = [...cartItems, product];
  } else {
    newCartItems = await cartItems.map((prevItem) => {
      const isEqual = prevItem.id === product.id;
      if (!isEqual) return prevItem;
      return { ...prevItem, quantity: prevItem.quantity + 1 };
    });
  }
  return newCartItems;
};

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

const CART_REDUCER_INITIAL = {
  cartToggle: false,
  cartItems: [],
  quantityTotal: 0,
  cartTotal: 0,
};

export const CART_REDUCER_TYPES = {
  CART_TOGGLE: "CART_TOGGLE",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

export const CartContext = createContext(INITIAL_CART_VALUE);

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_REDUCER_TYPES.CART_TOGGLE:
      return {
        ...state,
        cartToggle: !state.cartToggle,
      };
    case CART_REDUCER_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled ${type} in cartReducer!`);
  }
};

export const CartContextProvider = ({ children }) => {
  const [{ cartItems, cartToggle, quantityTotal, cartTotal }, dispatch] =
    useReducer(cartReducer, CART_REDUCER_INITIAL);

  const setCartItems = (cartPayload) => {
    dispatch(createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, cartPayload));
  };
  const setCartToggle = () => {
    dispatch(createAction(CART_REDUCER_TYPES.CART_TOGGLE));
  };

  const deleteCartItem = async (id) => {
    const newCartItems = await cartItems.filter((p) => p.id !== id);
    const cartItemsCount = cartItemCount(newCartItems);
    const priceCount = cartTotalPrice(newCartItems);
    setCartItems({
      cartItems: newCartItems,
      cartTotal: priceCount,
      quantityTotal: cartItemsCount,
    });
  };

  const decreaseQuantityItem = (id) => {
    const quantity = cartItems.find((item) => item.id === id).quantity;
    if (quantity === 1) return;
    const newCartItems = decreaseItemQuantity(cartItems, id);
    const cartItemsCount = cartItemCount(newCartItems);
    const priceCount = cartTotalPrice(newCartItems);
    setCartItems({
      cartItems: newCartItems,
      cartTotal: priceCount,
      quantityTotal: cartItemsCount,
    });
  };

  const addCartItem = async (product) => {
    const newCartItems = await addToItems(cartItems, product);
    const cartItemsCount = cartItemCount(newCartItems);
    const priceCount = cartTotalPrice(newCartItems);
    setCartItems({
      cartItems: newCartItems,
      cartTotal: priceCount,
      quantityTotal: cartItemsCount,
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
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
