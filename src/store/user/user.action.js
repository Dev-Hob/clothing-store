import { createAction } from "../../utils/createAction";
import { USER_ACTION_TYPES } from "./user.types";

export const setUser = (userArg) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, userArg);
