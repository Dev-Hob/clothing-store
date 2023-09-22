import CheckoutItem from "../../checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeaderDiv, HeaderBlockDiv, TotalSpan } from "./checkout.style.jsx";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice } from "../../../store/cart/cart.selector";

export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotalPrice)
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
