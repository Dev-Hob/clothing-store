import Button from "../button/button.component";
import "./cart-dropdown.style.jsx";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { CartDropdownContainer, CartItemsDiv, EmptyMessageSpan } from "./cart-dropdown.style.jsx";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

export default function CartDropdown() {
  const cartItems = useSelector(selectCartItems);
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
