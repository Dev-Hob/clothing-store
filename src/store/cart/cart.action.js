import { createAction } from "../../utils/createAction";
import { CART_REDUCER_TYPES } from "./cart.types";

export const setCartItems = (cartPayload) => {
  return createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, cartPayload);
};

export const setCartToggle = () => {
  return createAction(CART_REDUCER_TYPES.CART_TOGGLE);
};

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

const addToItems = (cartItems, product) => {
  let newCartItems;
  const isExist =
    (cartItems.filter((p) => p.id === product.id).length) !== 0;
  if (!isExist) {
    product["quantity"] = 1;
    newCartItems = [...cartItems, product];
  } else {
    newCartItems = cartItems.map((prevItem) => {
      const isEqual = prevItem.id === product.id;
      if (!isEqual) return prevItem;
      return { ...prevItem, quantity: prevItem.quantity + 1 };
    });
  }
  return newCartItems;
};


export const deleteCartItem = (cartItems, id) => {
  const newCartItems = cartItems.filter((p) => p.id !== id);
  const cartItemsCount = cartItemCount(newCartItems);
  const priceCount = cartTotalPrice(newCartItems);
  return setCartItems({
    cartItems: newCartItems,
    cartTotal: priceCount,
    quantityTotal: cartItemsCount,
  });
};

export const decreaseQuantityItem = (cartItems, id) => {
  let newCartItems;
  newCartItems = decreaseItemQuantity(cartItems, id);
  const cartItemsCount = cartItemCount(newCartItems);
  const priceCount = cartTotalPrice(newCartItems);
  return setCartItems({
    cartItems: newCartItems,
    cartTotal: priceCount,
    quantityTotal: cartItemsCount,
  });
};

export const addCartItem = (cartItems, product) => {
  const newCartItems = addToItems(cartItems, product);
  const cartItemsCount = cartItemCount(newCartItems);
  const priceCount = cartTotalPrice(newCartItems);
  return setCartItems({
    cartItems: newCartItems,
    cartTotal: priceCount,
    quantityTotal: cartItemsCount,
  });
};