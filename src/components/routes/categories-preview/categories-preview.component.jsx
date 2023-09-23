import { Fragment } from "react";
import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoryIsLoading, selectCategoryMap } from "../../../store/category/category.selector";
import Spinner from "../../spinner/spinner.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoryMap)
  const isLoading = useSelector(selectCategoryIsLoading)
  return (
    <Fragment>
    {isLoading ? (
        <Spinner />
      ) : (
      Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products} />;
      }))}
    </Fragment>
  );
}

export default CategoriesPreview;
