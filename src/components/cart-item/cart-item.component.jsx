import { useContext } from "react";
import { CartContext } from "../context/cart.context";

export default function CartItem({product}) {
    const {imageUrl, name, quantity, price, id} = product;
    const {removeCartItem} = useContext(CartContext)
    
  return (
    <div>
        <img src={imageUrl} style={{width: '5rem'}} alt={id}/>
        <div>
            <h3>{name}</h3>
            <p>{quantity} x ${price}</p>
        </div>
        <button onClick={ () => removeCartItem(id)}>X</button>
    </div>
  )
}
