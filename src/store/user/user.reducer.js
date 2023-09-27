import { USER_ACTION_TYPES } from "./user.types";

const USER_REDUCER_INITIAL = {
    user: null,
    loading: false,
    error: null
}

export const userReducer = (state = USER_REDUCER_INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: 
    return {
      ...state,
        user: payload,
    }
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: null,
      };
    case USER_ACTION_TYPES.SIGN_IN_START:
      return {
        ...state,
        loading: true
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false
      };
      
    default:
      return state;
  }
};