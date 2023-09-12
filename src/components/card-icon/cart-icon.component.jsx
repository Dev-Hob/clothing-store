import { useContext } from "react"
import { CartContext } from "../context/cart.context"
import { CartIconContainer, ItemCountSpan, ShoppingIcon } from "./card-icon.style.jsx"

export default function CartIcon() {
    const {setCartToggle, quantityTotal} = useContext(CartContext)

    const toggleCart = () => setCartToggle(toggle => !toggle)

  return (
    <CartIconContainer onClick={toggleCart}>
        <ShoppingIcon  />
        <ItemCountSpan >{quantityTotal || 0}</ItemCountSpan>
    </CartIconContainer>
  )
}
