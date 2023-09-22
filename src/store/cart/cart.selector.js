import { createSelector } from "reselect";

const selectorCart = (state) => state.cart;

export const selectCartToggle = createSelector(
  [selectorCart],
  (cart) => cart.cartToggle
);

export const selectCartItems = createSelector(
  [selectorCart],
  (cart) => cart.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems?.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems?.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0)
);
