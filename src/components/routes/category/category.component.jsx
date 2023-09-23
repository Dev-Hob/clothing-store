import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../product-card/product-card.component";
import { CategoryContainer, Title } from "./category.style.jsx";
import { useSelector } from "react-redux";
import {
  selectCategoryIsLoading,
  selectCategoryMap,
} from "../../../store/category/category.selector";
import Spinner from "../../spinner/spinner.component";

export default function Category() {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoryMap);
  const [products, setProduct] = useState(categoriesMap[category]);
  const isLoading = useSelector(selectCategoryIsLoading)

  useEffect(() => {
    setProduct(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <Title>{category?.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : 
      (<CategoryContainer> 
      
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>)}
    </>
  );
}
