import { useState } from "react";
import { create_user_document_from_auth, signUpWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/formInput.component";
import "./signUpForm.style.scss"
import Button from "../button/button.component";

const formInitialState = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword:"",
}
const errorInitialState = {status: false, message: ""}

export default function SignUpForm() {

  const [formFields, setFormFields] = useState(formInitialState);
  const {displayName, email, password, confirmPassword} = formFields;
  const [error, setError] = useState(errorInitialState)


  const onSubmitHandle = async (event) => {
    event.preventDefault();
    // write post request to a database.
    try {
        if (password.length < 6) throw new Error("Password shouldn't be less then 6 characters!");
        if (password !== confirmPassword) throw new Error("Passwords does not match!");
        const response = await signUpWithEmailAndPassword(email, password);
        const { user } = response;
        user.displayName = displayName;
        await create_user_document_from_auth(user);
        resetFormFields();
    } catch (err) {
        console.log("error signing up", err)
        setError({status: true, message: err.code || err.message})
    }
  }

  const resetFormFields = () => {
    setFormFields(formInitialState);
    resetErrorState();
  }

  const resetErrorState = () => {
    setError(errorInitialState)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })
  }
  return (
    <div className="sign-up-container">
    <h2>Don't have an account?</h2>
    <span>Sign in with your email and password</span>
    <form onSubmit={onSubmitHandle}>
      <FormInput label={'Display Name'} type="text" name="displayName" minLength={3} value={displayName} onChange={handleChange} required/>
      <FormInput label={'Email'} type="email" name="email" value={email} onChange={handleChange} required/>
      <FormInput label={'Password'} type="password" minLength={6} name="password" value={password} onChange={handleChange} required/>
      <FormInput label={'Confirm Password'} type="password" name="confirmPassword" minLength={6} value={confirmPassword} onChange={handleChange} required/>
      <Button type="submit">Submit</Button>
    </form>
    {error.status && <p className="error">{error.message}</p>}
    </div>
  )
}
