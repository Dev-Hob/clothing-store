import { createSelector } from "reselect"

export const selectUserReducer = (state) => state.user
export const selectUserIsLoading = createSelector([selectUserReducer], (user) => user.loading)
export const selectUserError = createSelector([selectUserReducer], (user) => user.error)
export const selectUserState = createSelector([selectUserReducer], (user) => user.user)