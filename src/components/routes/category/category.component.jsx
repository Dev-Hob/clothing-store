import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CategoriesMapContext } from "../../context/categories.context";
import ProductCard from "../../product-card/product-card.component";
import { CategoryContainer, Title } from "./category.style.jsx";

export default function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesMapContext);
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
