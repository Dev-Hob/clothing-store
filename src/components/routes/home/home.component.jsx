import { useDispatch } from "react-redux";
import CategoryList from "../../Category-List/CategoryList.component";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { setCategory } from "../../../store/category/category.action";

function Home() {  
    const dispatch  = useDispatch();

    useEffect(() => {
      (async() => {
          const categories = await getCategoriesAndDocuments();
          dispatch(setCategory(categories))
      })()
 }, [dispatch])

    return (
      <div className="App">
        <CategoryList />
      </div>
    );
  }
  
  export default Home;