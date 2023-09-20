import { createAction } from "../../utils/createAction";
import { CATEGORY_MAP_REDUCERS_TYPES } from "./category.types";

export const setCategoryMap = (categoryMap) =>
  createAction(CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP, categoryMap);
