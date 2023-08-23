import SignUpForm from "../../sign-up-form/SignUpForm.component";
import "./authentication.style.scss"
import SignIn from "../../sign-in-form/sign-in-form.component";



export default function Authentication() {

  return (
    <div className="authentication-container">
    
      <SignIn />    
      <SignUpForm />
    </div>
  );
}
