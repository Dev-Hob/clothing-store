import { signInWithGooglePopup, create_user_document_from_auth } from "../../../utils/firebase/firebase.utils"
import SignUpForm from "../../sign-up-form/SignUpForm.component";

export default function SignIn() {

  const logInWithGoogle = async() => {
    const {user} = await signInWithGooglePopup()
    console.log(user)
    create_user_document_from_auth(user);
  } 
 
  // const logInWithGoogleRedirect = async() => {
  //   await signInWithGoogleRedirect()
  // } 

  return (
    <div>
    <h1>Sign In Page</h1>
    <button onClick={logInWithGoogle}>Sign In with Google</button>
    <SignUpForm />
    </div>
  )
}
