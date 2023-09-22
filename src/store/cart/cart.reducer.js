import { CART_REDUCER_TYPES } from "./cart.types";

const CART_REDUCER_INITIAL = {
  cartToggle: false,
  cartItems: [],
  quantityTotal: 0,
  cartTotal: 0,
};

export const cartReducer = (state = CART_REDUCER_INITIAL, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_REDUCER_TYPES.CART_TOGGLE:
      return { ...state, cartToggle: !state.cartToggle };
    case CART_REDUCER_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
