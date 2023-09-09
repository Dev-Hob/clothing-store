import { useContext } from "react";
import Button from "../button/button.component";
import "./cart-dropdown.style.scss";
import { CartContext } from "../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate()

  const checkoutHandler = () => {
    navigate("/checkout")
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems?.map((product) => (
          <CartItem className="cart-items" key= {product.id} product={product} />
        ))}
      </div>
      <Button onClick={checkoutHandler}>Go To Checkout</Button>
    </div>
  );
}
