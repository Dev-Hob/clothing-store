import { useContext } from "react";
import { CartContext } from "../context/cart.context";
import "./cart-item.style.scss"

export default function CartItem({product}) {
    const {imageUrl, name, quantity, price, id} = product;
    const {removeCartItem} = useContext(CartContext)
    
  return (
    <div className="cart-item-container">
        <img src={imageUrl} alt={name}/>
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price}</span>
        </div>
        <button onClick={ () => removeCartItem(id)}>X</button>
    </div>
  )
}
