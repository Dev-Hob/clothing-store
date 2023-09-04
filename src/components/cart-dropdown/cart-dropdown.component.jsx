import { useContext } from "react";
import Button from "../button/button.component";
import "./cart-dropdown.style.scss";
import { CartContext } from "../context/cart.context";

export default function CartDropdown() {
    const {products} = useContext(CartContext)

  return (
    <div className="cart-dropdown-container">
        {products.map(product =>  <div className="cart-items" />
            )}
      <Button >Go To Checkout</Button>
    </div>
  );
}
