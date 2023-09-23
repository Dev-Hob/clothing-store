import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCategoryStart } from "../../../store/category/category.action";

function Shop() {
  const dispatch  = useDispatch();

  useEffect(() => {
        dispatch(setCategoryStart())
}, [dispatch])
  return (
    <Routes>
        <Route index element= {<CategoriesPreview />} />
        <Route path=':category' element= {<Category />} />
    </Routes>
  );
}

export default Shop;
