import { CATEGORY_MAP_REDUCERS_TYPES } from "./category.types";

const CATEGORIES_MAP_INTIAL_STATE = {
  category: [],
  loading: false,
  error: null,
};

export const categoryMapReducer = (
  state = CATEGORIES_MAP_INTIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_START:
      return { ...state, loading: true };
    case CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_SUCCESS:
      return { ...state, category: payload, loading: false };
    case CATEGORY_MAP_REDUCERS_TYPES.SET_CATEGORY_MAP_FAILED:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
