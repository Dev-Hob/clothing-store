import { useContext } from "react";
import { CartContext } from "../context/cart.context";
import "./checkout-item.style.scss"

export default function CheckoutItem({ item }) {
  const { imageUrl, name, quantity, price, id } = item;
  const { deleteCartItem, decreaseQuantityItem, addCartItem } =
    useContext(CartContext);
  return (
    <div className="checkout-item-container">
      
        <div className="image-container">
          <img src={`${imageUrl}`} alt={name} />
        </div>
      
      
        <span className="name">{name}</span>
      
      
        <span className="quantity">
          <div className="arrow" onClick={() => decreaseQuantityItem(id)}>&#10094;</div>
          <div className="value">{quantity}</div>
          <div className="arrow" onClick={() => addCartItem(item)}>&#10095;</div>
        </span>
      
      
        <span className="price">{price}</span>
      
      
        <span>
          <div className="remove-button" onClick={() => deleteCartItem(id)}>&#10005;</div>
        </span>
      
    </div>
  );
}
