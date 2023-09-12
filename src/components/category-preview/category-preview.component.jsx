import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, PreviewDiv, TitleLink } from "./category-preview.style";

export default function CategoryPreview({title, products}) {
  return (
    <CategoryPreviewContainer className="category-preview-container">
        <h2><TitleLink to={`/shop/${title}`} className="title">{title}</TitleLink></h2>
        <PreviewDiv className="preview">
        {products?.filter( (product, index) => index <= 3).map( product => <ProductCard key={product.id} product={product} />)}
        </PreviewDiv>
    </CategoryPreviewContainer>
  )
}
 