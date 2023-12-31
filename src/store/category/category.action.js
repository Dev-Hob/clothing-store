import { createAction } from "../../utils/createAction";
import { CATEGORY_MAP_REDUCERS_TYPES } from "./category.types";


export const setCategoryStart = () =>
createAction(CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_START);

export const setCategorySuccess = (categoryMap) =>
  createAction(CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_SUCCESS, categoryMap);

export const setCategoryFailed = (error) =>
  createAction(CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_FAILED, error);
  
//we use Redux Saga instead of thunk so below function is commented.
  // export const fetchCategoryMapAsync = () => async (dispatch) => {
  //   dispatch(setCategoryStart())
  //   try {
  //     const categories = await getCategoriesAndDocuments();
  //     dispatch(setCategorySuccess(categories))
  //   } catch (error) {
  //     dispatch(setCategoryFailed(error))
  //   }
  // } 
