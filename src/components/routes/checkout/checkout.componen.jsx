import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CheckoutItem from "../../checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeaderDiv, HeaderBlockDiv, TotalSpan } from "./checkout.style.jsx";

export default function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);
  console.log(cartItems)
  return (
    <CheckoutContainer >
        <CheckoutHeaderDiv >
          <HeaderBlockDiv >
          <span>Product</span>
          </HeaderBlockDiv>
          <HeaderBlockDiv c>
          <span>Description</span>
          </HeaderBlockDiv>
          <HeaderBlockDiv >
          <span>Quantity</span>
          </HeaderBlockDiv>
          <HeaderBlockDiv >
          <span>Price</span>
          </HeaderBlockDiv>
          <HeaderBlockDiv >
          <span>Remove</span>
          </HeaderBlockDiv>
         </CheckoutHeaderDiv>
        {cartItems?.map(item => <CheckoutItem item = {item} key={item.id}/>)}
        <TotalSpan className="total">Total: ${cartTotal}</TotalSpan>
    </CheckoutContainer>
  );
}
