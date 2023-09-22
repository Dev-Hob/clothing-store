import { CheckoutItemContainer, ImageContainer, ItemSpan, QuantitySpan, RemoveButtonDiv } from "./checkout-item.style.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addCartItem, decreaseQuantityItem, deleteCartItem } from "../../store/cart/cart.action";

export default function CheckoutItem({ item }) {
  const { imageUrl, name, quantity, price, id } = item;
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()
  return (
    <CheckoutItemContainer >
      
        <ImageContainer >
          <img src={`${imageUrl}`} alt={name} />
        </ImageContainer>
      
      
        <ItemSpan >{name}</ItemSpan>
      
      
        <QuantitySpan>
          <div className="arrow" onClick={() => (quantity > 1 ) && dispatch(decreaseQuantityItem(cartItems, id))}>&#10094;</div>
          <div className="value">{quantity}</div>
          <div className="arrow" onClick={() => dispatch(addCartItem(cartItems, item))}>&#10095;</div>
        </QuantitySpan>
      
      
        <ItemSpan className="price">{price}</ItemSpan>
      
      
        <span>
          <RemoveButtonDiv onClick={() => dispatch(deleteCartItem(cartItems, id))}>&#10005;</RemoveButtonDiv>
        </span>
      
    </CheckoutItemContainer>
  );
}
