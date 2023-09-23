import { useDispatch } from "react-redux";
import CategoryList from "../../Category-List/CategoryList.component";
import { useEffect } from "react";
import { fetchCategoryMapAsync } from "../../../store/category/category.action";

function Home() {  
    const dispatch  = useDispatch();

    useEffect(() => {
      (async() => {
          dispatch(fetchCategoryMapAsync())
      })()
 }, [dispatch])

    return (
      <div className="App">
        <CategoryList />
      </div>
    );
  }
  
  export default Home;