import { USER_ACTION_TYPES } from "./user.types";

const USER_REDUCER_INITIAL = {
    user: null
}

export const userReducer = (state = USER_REDUCER_INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};