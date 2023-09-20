import { Fragment } from "react";
import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../../store/category/category.selector";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoryMap)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products} />;
      })}
    </Fragment>
  );
}

export default CategoriesPreview;
