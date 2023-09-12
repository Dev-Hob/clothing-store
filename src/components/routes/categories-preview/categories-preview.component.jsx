import { Fragment, useContext } from "react";
import { CategoriesMapContext } from "../../context/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";

function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesMapContext);

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
