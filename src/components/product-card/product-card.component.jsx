import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../context/cart.context";
import { FooterDiv, NameSpan, PriceSpan, ProductCardContainer } from "./product-card.style";

export default function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const { addCartItem } = useContext(CartContext);
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <FooterDiv>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>${price}</PriceSpan>
      </FooterDiv>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => addCartItem(product)}>
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
}
