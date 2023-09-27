import { all, takeLatest, put, call } from "redux-saga/effects";
import {
  create_user_document_from_auth,
  getCurrentUser,
  signInWithEmail,
  signInWithGooglePopup,
  signOutUser,
  signUpWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { setUser, signInFailed, signInSuccess } from "./user.action";

// User Sign In check functionalities
export function* validateAndSignInUser(userAuth, additionalData) {
  try {
    const userSnapshot = yield call(
      create_user_document_from_auth,
      userAuth,
      additionalData
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(validateAndSignInUser, userAuth);
  } catch (error) {
    yield put(signInFailed);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// form sign in functionalities
export function* signInUser(user) {
  try {
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignInUser({ payload }) {
  try {
    const { email, password } = payload;
    const { user } = yield call(signInWithEmail, email, password);
    yield call(signInUser, user);
  } catch (err) {
    console.log("error signing up", err);
    let error;
    switch (err.code) {
      case "auth/wrong-password":
        error = { status: true, message: "Wrong email or password" };
        break;
      case "auth/user-not-found":
        error = { status: true, message: "User not found!" };
        break;
      case "auth/invalid-email":
        error = { status: true, message: "Invalid email entry!" };
        break;
      default:
        error = { status: true, message: err.code };
        break;
    }
    yield put(signInFailed(error));
  }
}

export function* onFormSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, onSignInUser);
}

// User Sign Out Functionalities
export function* signUserOut() {
  try {
    yield call(signOutUser);
    yield put(setUser(null));
  } catch (error) {
    console.log("ERROR_SIGN_OUT : ", error);
  }
}

export function* onUserSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_USER, signUserOut);
}

//User Sign Up with form
export function* userSignUp({ payload }) {
  try {
    if (!payload) throw new Error("Payload empty!");
    const { email, password, displayName } = payload;
    const { user } = yield signUpWithEmailAndPassword(email, password);
    user.displayName = displayName;
    yield call(validateAndSignInUser, user);
  } catch (error) {
    console.log(error);
  }
}

export function* onFormSignUp() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, userSignUp);
}

// User Google Sign In.
export function* signInWithGoogle() {
  try {
    const {user} = yield call(signInWithGooglePopup);
    yield call(validateAndSignInUser, user)
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* onGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// User Sagas composer
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onFormSignIn),
    call(onUserSignOut),
    call(onFormSignUp),
    call(onGoogleSignIn)
  ]);
}
