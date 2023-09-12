import SignUpForm from "../../sign-up-form/SignUpForm.component";
import SignIn from "../../sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.style";



export default function Authentication() {

  return (
    <AuthenticationContainer>
    
      <SignIn />    
      <SignUpForm />
    </AuthenticationContainer>
  );
}
