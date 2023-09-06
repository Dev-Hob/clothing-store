import "./product-card.style.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../context/cart.context";

export default function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const { addCartItem } = useContext(CartContext);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={() => addCartItem(product)}>
        Add to Cart
      </Button>
    </div>
  );
}