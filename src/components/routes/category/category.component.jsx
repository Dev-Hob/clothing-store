import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../product-card/product-card.component";
import { CategoryContainer, Title } from "./category.style.jsx";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../../store/category/category.selector";

export default function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoryMap)
  const [products, setProduct] = useState(categoriesMap[category]);

  useEffect(() => {
    setProduct(categoriesMap[category]);
  }, [categoriesMap, category]);
  return (
    <>
      <Title >{category?.toUpperCase()}</Title>
      <CategoryContainer>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </>
  );
}
