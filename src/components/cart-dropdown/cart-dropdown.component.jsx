import { useContext } from "react";
import Button from "../button/button.component";
import "./cart-dropdown.style.jsx";
import { CartContext } from "../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { CartDropdownContainer, CartItemsDiv, EmptyMessageSpan } from "./cart-dropdown.style.jsx";

export default function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate()

  const checkoutHandler = () => {
    navigate("/checkout")
  }

  return (
    <CartDropdownContainer>
      <CartItemsDiv>
        {cartItems.length ? (cartItems?.map((product) => (
          <CartItem key= {product.id} product={product} />
        ))) :
          <EmptyMessageSpan>Your Cart is Empty</EmptyMessageSpan>
        }
      </CartItemsDiv>
      <Button onClick={checkoutHandler}>Go To Checkout</Button>
    </CartDropdownContainer>
  );
}
