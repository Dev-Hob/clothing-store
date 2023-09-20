import { useState } from "react";
import {
  signInWithEmail,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/formInput.component";
import { setUser } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

const formInitialState = {
  email: "",
  password: "",
};

const errorInitialState = {
  status: "",
  message: "",
};

export default function SignIn() {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(errorInitialState);
  const { email, password } = formFields;
  const [error, setError] = useState(errorInitialState);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    // write post request to a database.
    if (password.length < 6)
      return setError({
        status: true,
        message: "Password shouldn't be less then 6 characters!",
      });
    try {
      const { user } = await signInWithEmail(email, password);
      dispatch(setUser(user));
      resetFormFields();
    } catch (err) {
      console.log("error signing up", err);
      switch (err.code) {
        case "auth/wrong-password":
          setError({ status: true, message: "Wrong email or password" });
          break;
        case "auth/user-not-found":
          setError({ status: true, message: "User not found!" });
          break;
        case "auth/invalid-email":
          setError({ status: true, message: "Invalid email entry!" });
          break;
        default:
          console.log("err : ", err);
          setError({ status: true, message: err.code });
          break;
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(formInitialState);
    resetErrorState();
  };

  const resetErrorState = () => {
    setError(errorInitialState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (error.status) resetErrorState();

    setFormFields({ ...formFields, [name]: value });
  };

  const logInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account!</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitHandle}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          minLength={6}
          onChange={handleChange}
          value={password}
        />
        <div className="sign-in-btn-container">
          <Button onClick={onSubmitHandle} type="submit">
            Sign In
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logInWithGoogle}
          >
            Google Sign in
          </Button>
        </div>
      </form>
      {error.message && <p className="error">{error.message}</p>}
    </div>
  );
}
