import { useContext } from "react";
import { CartContext } from "../context/cart.context";
import { CheckoutItemContainer, ImageContainer, ItemSpan, QuantitySpan, RemoveButtonDiv } from "./checkout-item.style.jsx";

export default function CheckoutItem({ item }) {
  const { imageUrl, name, quantity, price, id } = item;
  const { deleteCartItem, decreaseQuantityItem, addCartItem } =
    useContext(CartContext);
  return (
    <CheckoutItemContainer >
      
        <ImageContainer >
          <img src={`${imageUrl}`} alt={name} />
        </ImageContainer>
      
      
        <ItemSpan >{name}</ItemSpan>
      
      
        <QuantitySpan>
          <div className="arrow" onClick={() => decreaseQuantityItem(id)}>&#10094;</div>
          <div className="value">{quantity}</div>
          <div className="arrow" onClick={() => addCartItem(item)}>&#10095;</div>
        </QuantitySpan>
      
      
        <ItemSpan className="price">{price}</ItemSpan>
      
      
        <span>
          <RemoveButtonDiv onClick={() => deleteCartItem(id)}>&#10005;</RemoveButtonDiv>
        </span>
      
    </CheckoutItemContainer>
  );
}
