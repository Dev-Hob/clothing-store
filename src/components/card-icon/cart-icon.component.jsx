import { CartIconContainer, ItemCountSpan, ShoppingIcon } from "./card-icon.style.jsx"
import { useDispatch, useSelector } from "react-redux"
import { selectCartItemCount} from "../../store/cart/cart.selector"
import { setCartToggle } from "../../store/cart/cart.action"

export default function CartIcon() {
    const quantityTotal = useSelector(selectCartItemCount)
    const dispatch = useDispatch()
    const toggleCart = () => dispatch(setCartToggle(toggle => !toggle))

  return (
    <CartIconContainer onClick={toggleCart}>
        <ShoppingIcon  />
        <ItemCountSpan >{quantityTotal || 0}</ItemCountSpan>
    </CartIconContainer>
  )
}
