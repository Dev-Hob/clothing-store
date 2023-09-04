import { useContext } from "react"
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg"
import './card-icon.style.scss'
import { CartContext } from "../context/cart.context"

export default function CartIcon() {
    const {setCartToggle, count} = useContext(CartContext)

    const toggleCart = () => setCartToggle(toggle => !toggle)

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
        <ShoppingIcon  className="shopping-icon"/>
        <span className="item-count">{count}</span>
    </div>
  )
}
