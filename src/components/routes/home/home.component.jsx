import { useDispatch } from "react-redux";
import CategoryList from "../../Category-List/CategoryList.component";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { setCategoryMap } from "../../../store/category/category.action";

function Home() {  
    const dispatch  = useDispatch();

    useEffect(() => {
      (async() => {
          const categoriesMap = await getCategoriesAndDocuments();
          dispatch(setCategoryMap(categoriesMap))
      })()
 }, [dispatch])

    return (
      <div className="App">
        <CategoryList />
      </div>
    );
  }
  
  export default Home;