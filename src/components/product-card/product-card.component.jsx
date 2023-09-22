import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  FooterDiv,
  NameSpan,
  PriceSpan,
  ProductCardContainer,
} from "./product-card.style";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addCartItem } from "../../store/cart/cart.action";

export default function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const cartItems  = useSelector(selectCartItems);
  const dispatch = useDispatch()
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <FooterDiv>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>${price}</PriceSpan>
      </FooterDiv>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => dispatch(addCartItem(cartItems, product))}
      >
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
}
