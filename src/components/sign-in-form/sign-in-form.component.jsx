import { useState } from "react";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/formInput.component";
import { emailSignInStart, googleSignInUserStart } from "../../store/user/user.action";
import { useDispatch, useSelector } from "react-redux";
import { selectUserError } from "../../store/user/user.selector";

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
  const [formFields, setFormFields] = useState(formInitialState);
  const { email, password } = formFields;
  const userError = useSelector(selectUserError)
  const [error, setError] = useState(errorInitialState);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    if (password.length < 6)
      return setError({
        status: true,
        message: "Password shouldn't be less then 6 characters!",
      });
    dispatch(emailSignInStart(email, password));
    resetFormFields();
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
      dispatch(googleSignInUserStart())
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
      {(error.message || userError) && <p className="error">{error.message || userError.message}</p>}
    </div>
  );
}
