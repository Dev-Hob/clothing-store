import {createSelector} from "reselect"

export const selectCategoryReducer = (state) => state.category

export const selectCategories = createSelector([selectCategoryReducer], (categories) => categories.category)

export const selectCategoryMap = createSelector([selectCategories] , (category) =>
  category.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {}));
  
  export const selectCategoryIsLoading = createSelector([selectCategories], (cart) => cart.loading)