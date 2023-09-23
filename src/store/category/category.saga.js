import { takeLatest, call, put, all } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoryFailed, setCategorySuccess } from "./category.action";
import { CATEGORY_MAP_REDUCERS_TYPES } from "./category.types";

export function* fetchCategoryAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments, "categories");
    yield put(setCategorySuccess(categories));
  } catch (error) {
    yield put(setCategoryFailed(error));
  }
}

export function* onFetchCategory() {
  yield takeLatest(CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_START, fetchCategoryAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategory)]);
}
