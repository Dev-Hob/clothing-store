import { createContext, useEffect } from "react";
import {
  create_user_document_from_auth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import { useReducer } from "react";
import { createAction } from "../../utils/createAction";

export const UserContext = createContext({ user: ""});

const USER_REDUCER_INITIAL = {
    user: null
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log("Action", action)
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      throw new Error(`${type} is unhandled type.`)
  }
};

export const UserContextProvider = ({ children }) => {
    const [ {user}, dispatch ] = useReducer(userReducer, USER_REDUCER_INITIAL)

    const setUser = (userArg) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, userArg))
    }

  const value = { user, setUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("auth ", user)
      if (user) create_user_document_from_auth(user);
      setUser(user);
    });

    return unsubscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
