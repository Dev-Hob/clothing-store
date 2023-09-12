import "./cart-item.style.jsx"
import { CartItemContainer, ItemDetailsContainer, NameSpan } from "./cart-item.style.jsx";

export default function CartItem({product}) {
    const {imageUrl, name, quantity, price} = product;
    
  return (
    <CartItemContainer>
        <img src={imageUrl} alt={name}/>
        <ItemDetailsContainer>
            <NameSpan>{name}</NameSpan>
            <span className="price">{quantity} x ${price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
  )
}
