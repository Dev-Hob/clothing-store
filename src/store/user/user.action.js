import { createAction } from "../../utils/createAction";
import { USER_ACTION_TYPES } from "./user.types";

export const setUser = (userArg) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, userArg);

export const userSignOut = () => createAction(USER_ACTION_TYPES.SIGN_OUT_USER);

export const checkUser = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInUserStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const emailSignUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
